import { webpack } from "replugged";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import ImageDetails from "../Components/ImageDetails";

export default (): void => {
  const { ImageModalModule } = Modules;
  const ImageModal = webpack.getFunctionKeyBySource(
    Modules.ImageModalModule,
    ".MEDIA_MODAL_CLOSE,",
  );
  PluginInjector.before(ImageModalModule, ImageModal, (args) => {
    const [
      { renderLinkComponent: OriginalCompoennt, ...props } = { renderLinkComponent: () => null },
    ] = args ?? [{}];

    if (!OriginalCompoennt || OriginalCompoennt?.toString?.()?.includes?.("childProps"))
      return args;
    args[0].renderLinkComponent = (childProps) => (
      <ImageDetails {...props} childProps={childProps} children={OriginalCompoennt} />
    );
    return args;
  });
};
