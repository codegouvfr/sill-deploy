import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable("softwares")
        .addColumn("isLibreSoftware", "boolean")
        .addColumn("url", "text")
        .addColumn("codeRepositoryUrl", "text")
        .addColumn("softwareHelp", "text")
        .addColumn("latestVersion", "jsonb")
        .addColumn("programmingLanguages", "jsonb")
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable("softwares")
        .dropColumn("isLibreSoftware")
        .dropColumn("url")
        .dropColumn("codeRepositoryUrl")
        .dropColumn("softwareHelp")
        .dropColumn("latestVersion")
        .dropColumn("programmingLanguages")
        .execute();
}
