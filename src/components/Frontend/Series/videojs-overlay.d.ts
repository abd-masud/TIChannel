declare module "videojs-overlay" {
    import videojs from "video.js";

    const overlay: (options?: string) => videojs.Plugin;
    export default overlay;
}