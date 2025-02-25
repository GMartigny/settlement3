export const variables = {
    black: "#1c2127",
    primary: "#1a9a7b",
    grey: "#86898a",
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
        animation: "loading linear",
        "animation-duration": "var(--time)",
    },
    "@keyframes loading": {
        "0%": {
            opacity: 0,
            // "box-shadow": "0 0 0 .5lh inset rgba(255, 255, 255, .5)",
        },
        "100%": {
            opacity: 1,
            // "box-shadow": "0 0 0 inset rgba(255, 255, 255, .5)",
        },
    },
};
