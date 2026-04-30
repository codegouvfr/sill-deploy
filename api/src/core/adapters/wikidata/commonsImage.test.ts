// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import { describe, expect, it } from "vitest";
import { toCommonsSpecialFilePathUrl } from "./commonsImage";

describe("toCommonsSpecialFilePathUrl", () => {
    it("builds a Commons Special:FilePath URL from a Wikidata commons media filename", () => {
        expect(toCommonsSpecialFilePathUrl("Gnu-octave-logo.svg")).toBe(
            "https://commons.wikimedia.org/wiki/Special:FilePath/Gnu-octave-logo.svg?width=250"
        );
    });

    it("keeps the normalized Commons Special:FilePath format for filenames with spaces", () => {
        expect(toCommonsSpecialFilePathUrl("Apache HTTP server logo (2019-present).svg")).toBe(
            "https://commons.wikimedia.org/wiki/Special:FilePath/Apache_HTTP_server_logo_(2019-present).svg?width=250"
        );
    });

    it("normalizes legacy protocol-relative upload thumbnail URLs", () => {
        expect(
            toCommonsSpecialFilePathUrl(
                "//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gnu-octave-logo.svg/250px-Gnu-octave-logo.svg.png"
            )
        ).toBe("https://commons.wikimedia.org/wiki/Special:FilePath/Gnu-octave-logo.svg?width=250");
    });

    it("normalizes direct upload URLs", () => {
        expect(
            toCommonsSpecialFilePathUrl("https://upload.wikimedia.org/wikipedia/commons/6/69/Gnu-octave-logo.svg")
        ).toBe("https://commons.wikimedia.org/wiki/Special:FilePath/Gnu-octave-logo.svg?width=250");
    });

    it("normalizes existing Commons Special:FilePath URLs", () => {
        expect(
            toCommonsSpecialFilePathUrl(
                "https://commons.wikimedia.org/wiki/Special:FilePath/Gnu-octave-logo.svg?width=1200"
            )
        ).toBe("https://commons.wikimedia.org/wiki/Special:FilePath/Gnu-octave-logo.svg?width=250");
    });
});
