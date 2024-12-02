import { names } from "../data/names";

export const getNames = (id) => {
    const member = names.find((m) => m.member_id === id);
    return member ? member.name : "unknown";
};


export const getMemberId = (name) => {
    const member = names.find((n) => n.english_name === name);
    return member ? member.member_id : "unknown";
};