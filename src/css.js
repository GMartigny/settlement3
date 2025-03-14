export const variables = {
    black: "#1c2127",
    primary: "#1a9a7b",
    grey: "#86898a",
};

export const animations = {
    "@keyframes loading": {
        "0%": {
            "box-shadow": "0 0 0 1lh inset var(--loading-color)",
        },
        "100%": {
            "box-shadow": "0 0 0 inset var(--loading-color)",
        },
    },
};

export const flow = {
    flex: (gap = "1em") => ({
        display: "flex",
        gap,
    }),
    flexCol: gap => ({
        ...flow.flex(gap),
        "flex-direction": "column",
    }),
};

export const clickable = {
    border: `1px solid ${variables.primary}`,
    padding: ".5em 1em",
    background: "none",
    cursor: "pointer",

    "&:hover": {
        background: variables.primary,
        color: variables.black,
    },
};

export const loading = {
    "&.loading": {
        "--loading-color": variables.primary,
        animation: "loading linear",
        "animation-duration": "var(--time)",
    },
};
