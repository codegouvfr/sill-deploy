// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

const COMMONS_FILE_PATH_BASE = "https://commons.wikimedia.org/wiki/Special:FilePath";

const decodePathSegment = (segment: string): string => {
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
};

const extractFilenameFromUploadUrl = (url: URL): string | undefined => {
    const pathSegments = url.pathname.split("/").filter(Boolean).map(decodePathSegment);
    const commonsIndex = pathSegments.indexOf("commons");
    if (commonsIndex === -1) return undefined;

    const thumbIndex = pathSegments.indexOf("thumb");
    if (thumbIndex !== -1) {
        return pathSegments[thumbIndex + 3];
    }

    return pathSegments[commonsIndex + 3];
};

const extractFilenameFromSpecialFilePathUrl = (url: URL): string | undefined => {
    const prefix = "/wiki/Special:FilePath/";
    if (!url.pathname.startsWith(prefix)) return undefined;

    return decodePathSegment(url.pathname.slice(prefix.length));
};

const extractCommonsFilename = (value: string): string | undefined => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") return undefined;

    const urlValue = trimmedValue.startsWith("//") ? `https:${trimmedValue}` : trimmedValue;

    try {
        const url = new URL(urlValue);

        if (url.hostname === "upload.wikimedia.org") {
            return extractFilenameFromUploadUrl(url);
        }

        if (url.hostname === "commons.wikimedia.org") {
            return extractFilenameFromSpecialFilePathUrl(url);
        }
    } catch {
        return trimmedValue.replace(/^File:/, "");
    }

    return trimmedValue.replace(/^File:/, "");
};

export const toCommonsSpecialFilePathUrl = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;

    const filename = extractCommonsFilename(value)?.replace(/ /g, "_");
    if (filename === undefined || filename === "") return undefined;

    return `${COMMONS_FILE_PATH_BASE}/${encodeURIComponent(filename)}?width=250`;
};
