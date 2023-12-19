import typography from '@tailwindcss/typography';
declare const _default: {
    mode: string;
    content: string[];
    theme: {
        screens: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            '2xl': string;
        };
        colors: ({ theme }: import("tailwindcss/types/config").PluginUtils) => any;
        foundationColors: {
            primary: {
                DEFAULT: string;
                dark: string;
            };
            secondary: {
                DEFAULT: string;
                dark: string;
            };
            tertiary: {
                DEFAULT: string;
                dark: string;
            };
            subtle: string;
            text: {
                primary: string;
                highlight: string;
                secondary: string;
                tertiary: string;
                deEmphasized: string;
            };
        };
        alertColors: {
            'alert-green': {
                DEFAULT: string;
                dark: string;
            };
            'alert-orange': {
                DEFAULT: string;
                dark: string;
            };
            'alert-red': {
                DEFAULT: string;
                dark: string;
            };
            'alert-blue': {
                DEFAULT: string;
                dark: string;
            };
        };
        specialColors: {
            meadow: {
                DEFAULT: string;
                dark: string;
            };
            pink: {
                DEFAULT: string;
                dark: string;
            };
            purple: {
                DEFAULT: string;
                dark: string;
            };
            'blue-gray': {
                DEFAULT: string;
                dark: string;
            };
            'rost-dust': {
                DEFAULT: string;
                dark: string;
            };
            'golden-rod': {
                DEFAULT: string;
                dark: string;
            };
        };
        textColor: ({ theme }: import("tailwindcss/types/config").PluginUtils) => any;
        minWidth: {
            '1/2': string;
            '1/3': string;
            '2/3': string;
        };
        fontFamily: {
            inter: string;
            lato: string;
            roboto: string;
        };
        extend: {
            screens: {
                print: {
                    raw: string;
                };
            };
            opacity: {
                light: string;
            };
            width: {
                fit: string;
            };
            height: {
                fit: string;
            };
            typography: (theme: any) => {
                important: boolean;
                light: {
                    css: {
                        color: any;
                        '[class~="lead"]': {
                            color: any;
                        };
                        a: {
                            color: any;
                        };
                        strong: {
                            color: any;
                        };
                        'ol > li::before': {
                            color: any;
                        };
                        'ul > li::before': {
                            backgroundColor: any;
                        };
                        hr: {
                            borderColor: any;
                        };
                        blockquote: {
                            color: any;
                            borderLeftColor: any;
                        };
                        h1: {
                            color: any;
                        };
                        h2: {
                            color: any;
                        };
                        h3: {
                            color: any;
                        };
                        h4: {
                            color: any;
                        };
                        'figure figcaption': {
                            color: any;
                        };
                        code: {
                            color: any;
                        };
                        'a code': {
                            color: any;
                        };
                        pre: {
                            color: any;
                            backgroundColor: any;
                        };
                        thead: {
                            color: any;
                            borderBottomColor: any;
                        };
                        'tbody tr': {
                            borderBottomColor: any;
                        };
                    }[];
                };
            };
        };
    };
    variants: {
        extend: {
            backgroundOpacity: string[];
            backgroundColor: string[];
            boxShadow: string[];
            borderRadius: string[];
        };
    };
    plugins: ({
        (options: unknown): {
            handler: import("tailwindcss/types/config").PluginCreator;
            config?: Partial<import("tailwindcss/types/config").Config> | undefined;
        };
        __isOptionsFunction: true;
    } | typeof typography)[];
};
export default _default;
//# sourceMappingURL=tailwind.config.d.ts.map