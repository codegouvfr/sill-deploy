// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import type { Os } from "api";

export const osLabels: Record<Os, string> = {
    windows: "Windows",
    linux: "GNU/Linux",
    mac: "MacOS",
    android: "Android",
    ios: "iOS"
};
