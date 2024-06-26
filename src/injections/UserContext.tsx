import { PluginInjectorUtils, SettingValues, USRDB } from "../index";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  const { ApplicationStreamPreviewStore, ApplicationStreamingStore, GuildMemberStore, IconUtils } =
    Modules;

  const ContextMenuEntry = (
    { user, guildId }: Record<string, unknown> & { user: Types.User; guildId: string },
    menu: Types.MenuProps,
  ): void => {
    if (!SettingValues.get("user", defaultSettings.user)) return;
    menu.children = (menu?.children as React.ReactElement[]).filter(
      (c) =>
        !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
        !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
    );
    const member = GuildMemberStore.getMember(guildId, user.id) as Types.GuildMember;
    const usrbg = SettingValues.get("userbg", defaultSettings.userbg) && USRDB.get(user.id);
    const stream =
      SettingValues.get("stream", defaultSettings.stream) &&
      (ApplicationStreamingStore.getAnyStreamForUser(user.id) as {
        guildId: string;
        channelId: string;
        ownerId: string;
      });
    const streamPreviewUrl = ApplicationStreamPreviewStore.getPreviewURL(
      stream?.guildId,
      stream?.channelId,
      stream?.ownerId,
    ) as string;
    const index = (menu?.children as React.ReactElement[]).findIndex(
      (c) => c?.props?.id === "replugged",
    );
    (menu?.children as React.ReactElement[])?.splice?.(
      index,
      0,
      <ContextMenu.MenuGroup label="Image Utils">
        {user?.avatar ? (
          <ContextMenu.MenuItem
            id="imageUtils-userAvatar"
            label="View Avatar"
            {...Utils.mapMenuItem(
              IconUtils.getUserAvatarURL(
                {
                  id: user?.id,
                  avatar: user?.avatar,
                  canAnimate: true,
                },
                true,
              ) as string,
            )}
          />
        ) : null}
        {user?.banner ? (
          <ContextMenu.MenuItem
            id="imageUtils-userBanner"
            label="View Banner"
            {...Utils.mapMenuItem(IconUtils.getUserBannerURL(user, true) as string)}
          />
        ) : null}
        {member?.avatar ? (
          <ContextMenu.MenuItem
            id="imageUtils-memberAvatar"
            label="View Guild Member Avatar"
            {...Utils.mapMenuItem(IconUtils.getGuildMemberAvatarURL(member, true) as string)}
          />
        ) : null}
        {member?.banner ? (
          <ContextMenu.MenuItem
            id="imageUtils-memberBanner"
            label="View Guild Member Banner"
            {...Utils.mapMenuItem(IconUtils.getGuildMemberBannerURL(member, true) as string)}
          />
        ) : null}
        {usrbg ? (
          <ContextMenu.MenuItem
            id="imageUtils-usrBg"
            label="View USRBG Banner"
            {...Utils.mapMenuItem(usrbg)}
          />
        ) : null}
        {streamPreviewUrl ? (
          <ContextMenu.MenuItem
            id="imageUtils-stream"
            label="View Stream Preview"
            {...Utils.mapMenuItem(streamPreviewUrl)}
          />
        ) : null}
      </ContextMenu.MenuGroup>,
    );
  };
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.UserContext,
    ContextMenuEntry,
  );
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.UserProfileActions,
    ContextMenuEntry,
  );
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.UserProfileOverflowMenu,
    ContextMenuEntry,
  );
};
