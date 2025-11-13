// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import * as Sentry from "@sentry/react";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { assert } from "tsafe/assert";
import { projectVersion } from "./tools/projectVersion";
import "./ui/i18n/i18next";

if (import.meta.env.SENTRY_DSN_WEB) {
    Sentry.init({
        dsn: import.meta.env.SENTRY_DSN_WEB,
        environment: import.meta.env.ENVIRONMENT,
        release: projectVersion,
        sendDefaultPii: true,
        tracesSampleRate: 1.0,
        integrations: [
            Sentry.browserTracingIntegration({ nam }),
            Sentry.replayIntegration()
        ],
        replaysSessionSampleRate: 0.01,
        replaysOnErrorSampleRate: 1.0
    });
    console.info(
        `Sentry initialized (environment: ${import.meta.env.ENVIRONMENT}, release: ${projectVersion})`
    );
} else {
    console.info(
        `Sentry not initialized - no DSN configured (environment: ${import.meta.env.ENVIRONMENT})`
    );
}

startReactDsfr({ defaultColorScheme: "system" });

const App = lazy(() => import("ui/App"));

createRoot(
    (() => {
        const rootElement = document.getElementById("root");

        assert(rootElement !== null);

        return rootElement;
    })()
).render(
    <Suspense>
        <MuiDsfrThemeProvider>
            <App />
        </MuiDsfrThemeProvider>
    </Suspense>
);
