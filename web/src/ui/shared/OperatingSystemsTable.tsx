// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react";
import { useTranslation } from "react-i18next";
import { osValues } from "api";
import { osLabels } from "./osLabels";

type Props = {
    title?: string;
    operatingSystems: Partial<Record<string, boolean>>;
};

export function OperatingSystemsTable(props: Props) {
    const { classes, cx } = useStyles();

    const { t } = useTranslation();

    const { operatingSystems } = props;

    return (
        <div className="fr-table--sm fr-table fr-table" id="table-sm-component">
            <div className="fr-table__wrapper">
                <div className="fr-table__container">
                    <div className="fr-table__content">
                        <table id="table-sm">
                            <caption>
                                <p className={cx(fr.cx("fr-text--bold"), classes.item)}>
                                    {t("previewTab.supportedOS")}
                                </p>
                            </caption>
                            <thead>
                                <tr>
                                    {osValues.map(os => (
                                        <th
                                            key={os}
                                            scope="col"
                                            style={{ textAlign: "center" }}
                                        >
                                            {osLabels[os]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="table-sm-row-key-1" data-row-key="1">
                                    {osValues.map(os => (
                                        <td key={os} style={{ textAlign: "center" }}>
                                            {operatingSystems[os] ? "✅" : "❌"}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const useStyles = tss.withName({ OperatingSystemsTable }).create({
    item: {
        "&:not(:last-of-type)": {
            marginBottom: fr.spacing("4v")
        }
    }
});
