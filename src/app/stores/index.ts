import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const resultAtom = atomWithStorage("result", "")

export const urlAtom = atom("")
