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
