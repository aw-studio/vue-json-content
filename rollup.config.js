import ts from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace';

const name = 'vue-json-content';

const outputConfigs = {
    cjs: {
        file: `dist/${name}.cjs.js`,
        format: 'cjs',
    },
    'esm-bundle': {
        file: `dist/${name}.esm-bundler.js`,
        format: 'es',
    },
};

const packageFormats = Object.keys(outputConfigs);

const packageConfigs = packageFormats.map(format =>
    createConfig(format, outputConfigs[format])
);

packageFormats.forEach(format => {
    if (format === 'cjs') {
        packageConfigs.push(createProductionConfig(format));
    }
});

export default packageConfigs;

function createConfig(format, output, plugins = []) {
    let entryFile = `src/index.ts`;
    const isProductionBuild = /\.prod\.js$/.test(output.file);
    const isVuePackage = name == 'admin-vue3';

    const shouldEmitDeclarations = false;

    output.sourcemap = !!process.env.SOURCE_MAP;
    output.externalLiveBindings = false;

    const tsPlugin = ts({
        tsconfig: 'tsconfig.json',
        check: process.env.NODE_ENV === 'production',
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: output.sourcemap,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations,
            },
            exclude: ['**/__tests__', 'test-dts'],
        },
    });

    plugins.push(
        vue({
            css: null,
        })
    );
    plugins.push(styles());

    return {
        input: 'src/index.ts',
        plugins: [tsPlugin, createReplacePlugin(isProductionBuild), ...plugins],
        output,
        external: ['vue', 'vuedraggable', 'uuid'],
    };
}

function createReplacePlugin(isProduction) {
    const replacements = {
        __DEV__: !isProduction,
    };

    Object.keys(replacements).forEach(key => {
        if (key in process.env) {
            replacements[key] = process.env[key];
        }
    });

    return replace({
        // @ts-ignore
        values: replacements,
        preventAssignment: true,
    });
}

function createProductionConfig(format) {
    return createConfig(format, {
        file: `dist/${name}.${format}.prod.js`,
        format: outputConfigs[format].format,
    });
}
