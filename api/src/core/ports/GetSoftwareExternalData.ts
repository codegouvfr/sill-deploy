// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import { z } from "zod";
import type { LocalizedString as LocalizedString_generic } from "i18nifty/LocalizedString/reactless";
import type { PartialNoOptional } from "../../tools/PartialNoOptional";
import { assert, type Equals } from "tsafe/assert";
import { Catalogi } from "../../types/Catalogi";
import { Source } from "../usecases/readWriteSillData";

type ExternalId = string;

export type ExternalDataOrigin = "wikidata" | "HAL";

export type GetSoftwareExternalData = {
    (params: { externalId: ExternalId; source: Source }): Promise<SoftwareExternalData | undefined>;
    clear: (externalId: ExternalId) => void;
};

export type SoftwareExternalData = {
    externalId: ExternalId;
    sourceSlug: string;
    developers: Array<Catalogi.Person | Catalogi.Organization>;
    label: LocalizedString;
    description: LocalizedString;
    isLibreSoftware: boolean;
} & PartialNoOptional<{
    logoUrl: string;
    websiteUrl: string;
    sourceUrl: string;
    documentationUrl: string;
    license: string;
    softwareVersion: string;
    keywords: string[];
    programmingLanguages: string[];
    applicationCategories: string[];
    publicationTime: Date;
    referencePublications: Catalogi.ScholarlyArticle[];
    identifiers: Catalogi.Identification[];
}>;

export type SimilarSoftwareExternalData = Pick<
    SoftwareExternalData,
    "externalId" | "label" | "description" | "isLibreSoftware" | "sourceSlug"
>;

export const languages = ["fr", "en"] as const;

export type Language = (typeof languages)[number];

export type LocalizedString = LocalizedString_generic<Language>;

const zLanguage = z.union([z.literal("en"), z.literal("fr")]);

{
    type Got = ReturnType<(typeof zLanguage)["parse"]>;
    type Expected = Language;

    assert<Equals<Got, Expected>>();
}
