// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import { GetScholarlyArticle } from "../../ports/GetScholarlyArticle";
import { halAPIGateway } from "./HalAPI";

export const getScholarlyArticle: GetScholarlyArticle = async halDocId => {
    const articleData = await halAPIGateway.article.getById(halDocId).catch(error => {
        if (error.message == "404") return undefined;
        throw error;
    });

    if (!articleData) {
        return undefined;
    }

    return {
        "@id": halDocId,
        "@type": "ScholarlyArticle",
        identifier: {
            "@type": "PropertyValue",
            "propertyID": "HAL",
            "url": new URL(`https://hal.science/${halDocId}`),
            "value": halDocId
        },
        headline: articleData.en_title_s?.[0] ?? articleData.fr_title_s?.[0] ?? articleData.title_s[0]
    };
};
