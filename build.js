import * as esbuild from "esbuild";

const isWatch = process.argv.includes("--watch");

const cssConfig = {
  entryPoints: ["src/frontend/css/index.css"],
  bundle: true,
  minify: !isWatch,
  sourcemap: true,
  outfile: "dist/bundle.css",
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(cssConfig);
      await ctx.watch();
      console.log("Watching for CSS changes...");
    } else {
      await esbuild.build(cssConfig);
      console.log("Build complete");
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
