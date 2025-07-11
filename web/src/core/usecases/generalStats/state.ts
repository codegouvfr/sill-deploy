// SPDX-FileCopyrightText: 2021-2025 DINUM <floss@numerique.gouv.fr>
// SPDX-FileCopyrightText: 2024-2025 Université Grenoble Alpes
// SPDX-License-Identifier: MIT

import {
    createUsecaseActions,
    createObjectThatThrowsIfAccessed
} from "redux-clean-architecture";

export type State = {
    softwareCount: number;
    registeredUserCount: number;
    agentReferentCount: number;
    organizationCount: number;
};

export const name = "generalStats";

export const { reducer, actions } = createUsecaseActions({
    name,
    initialState: createObjectThatThrowsIfAccessed<State>({
        debugMessage: "Not yet initialized"
    }),
    reducers: {
        update: (_state, { payload }: { payload: { state: State } }) => {
            const { state } = payload;
            return state;
        }
    }
});
