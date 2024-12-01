import { names } from "../data/names";

export const getNames = (id) => {
    const member = names.find((m) => m.member_id === id);
    return member ? member.name : "unknown";
};
