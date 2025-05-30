import { Oidc } from "core/ports/Oidc";
import { createOidc as createOidcSpa } from "oidc-spa";
import { addParamToUrl } from "powerhooks/tools/urlSearchParams";

export async function createOidc(params: {
    issuerUri: string;
    clientId: string;
    appUrl: string;
    transformUrlBeforeRedirect: (url: string) => string;
    getUiLocales: () => string;
}): Promise<Oidc> {
    const { issuerUri, clientId, appUrl, transformUrlBeforeRedirect, getUiLocales } =
        params;

    return createOidcSpa({
        issuerUri,
        clientId,
        transformUrlBeforeRedirect: url =>
            // prettier-ignore
            [url]
                .map(transformUrlBeforeRedirect)
                .map(
                    url =>
                        addParamToUrl({
                            url,
                            "name": "ui_locales",
                            "value": getUiLocales()
                        }).newUrl
                )
            [0],
        homeUrl: appUrl
    });
}
