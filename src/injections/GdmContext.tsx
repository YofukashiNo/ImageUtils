import { PluginInjectorUtils, SettingValues } from "../index";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  const { IconUtils } = Modules;
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.GdmContext,
    ({ channel }: { channel: Types.Channel }, menu) => {
      if (!SettingValues.get("gdm", defaultSettings.gdm)) return;

      menu.children = (menu?.children as React.ReactElement[]).filter(
        (c) =>
          !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
          !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
      );

      const index = (menu?.children as React.ReactElement[]).findIndex(
        (c) => c.props.id === "replugged",
      );
      (menu?.children as React.ReactElement[])?.splice?.(
        index,
        0,
        <ContextMenu.MenuGroup label="Image Utils">
          {channel?.icon ? (
            <ContextMenu.MenuItem
              id="imageUtils-gdmIcon"
              label="View Icon"
              {...Utils.mapMenuItem(
                IconUtils.getChannelIconURL(
                  {
                    id: channel?.id,
                    icon: channel?.icon,
                    canAnimate: true,
                  },
                  true,
                ) as string,
              )}
            />
          ) : null}
        </ContextMenu.MenuGroup>,
      );
    },
  );
};
