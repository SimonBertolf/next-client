const TypeDoc = require("typedoc");

class TypeDocMain {
    async main() {
        const app = new TypeDoc.Application();
        // If you want TypeDoc to load tsconfig.json / typedoc.json files
        app.options.addReader(new TypeDoc.TSConfigReader());
        app.options.addReader(new TypeDoc.TypeDocReader());

        app.bootstrap({
            // typedoc options here
            entryPoints: [
                "src/services/index.ts",
                "src/inversify/index.ts",
                "src/types/index.ts",
                "src/models/index.ts",
                "src/store/modules/index.ts"
            ],
        });

        const project = app.convert();

        if (project) {
            // Project may not have converted correctly
            const outputDir = "docs";

            // Rendered docs
            await app.generateDocs(project, outputDir);
        }
    }
}

module.exports = TypeDocMain;
