// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import { z } from "zod";
import { Source } from "../usecases/readWriteSillData";
import { LocalizedString, type Language } from "./GetSoftwareExternalData";

export type SoftwareExternalDataOption = {
    externalId: string;
    name: LocalizedString;
    description: LocalizedString;
    // null = license verification unavailable (e.g. wikidata entity has no P275
    // claim, or the upstream call failed). Distinct from `false` ("verified
    // non-libre"). Using null (not undefined) so it survives JSON serialization
    // and forces every construction site to handle the unknown case.
    isLibreSoftware: boolean | null;
    sourceSlug: string;
};

const localizedStringSchema = z.string().or(
    z
        .object({
            fr: z.string().optional(),
            en: z.string().optional()
        })
        .partial()
);

export const softwareExternalDataOptionSchema = z.object({
    externalId: z.string(),
    name: localizedStringSchema,
    description: localizedStringSchema,
    isLibreSoftware: z.boolean().nullable(),
    sourceSlug: z.string()
});

export type GetSoftwareExternalDataOptions = (params: {
    queryString: string;
    language: Language;
    source: Source;
}) => Promise<SoftwareExternalDataOption[]>;
