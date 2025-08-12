import { OpenAPIToolset } from '@mastra/core/integration';
import type { ToolAction } from '@mastra/core/tools';
import * as integrationClient from './client/services.gen.js';
import * as zodSchema from './client/zodSchema.js';
import type { GithubConfig } from './types.js';
export declare class GithubToolset extends OpenAPIToolset {
    readonly name = "GITHUB";
    readonly logoUrl = "";
    config: GithubConfig;
    readonly tools: Record<Exclude<keyof typeof integrationClient, 'client'>, ToolAction<any, any, any>>;
    categories: string[];
    description: string;
    constructor({ config }: {
        config: GithubConfig;
    });
    protected get toolSchemas(): typeof zodSchema;
    protected get toolDocumentations(): {
        metaRoot: {
            comment: string;
            doc: string;
        };
        appsGetAuthenticated: {
            comment: string;
            doc: string;
        };
        appsCreateFromManifest: {
            comment: string;
            doc: string;
        };
        appsGetWebhookConfigForApp: {
            comment: string;
            doc: string;
        };
        appsUpdateWebhookConfigForApp: {
            comment: string;
            doc: string;
        };
        appsListWebhookDeliveries: {
            comment: string;
            doc: string;
        };
        appsGetWebhookDelivery: {
            comment: string;
            doc: string;
        };
        appsRedeliverWebhookDelivery: {
            comment: string;
            doc: string;
        };
        appsListInstallations: {
            comment: string;
            doc: string;
        };
        appsDeleteInstallation: {
            comment: string;
            doc: string;
        };
        appsGetInstallation: {
            comment: string;
            doc: string;
        };
        appsCreateInstallationAccessToken: {
            comment: string;
            doc: string;
        };
        appsUnsuspendInstallation: {
            comment: string;
            doc: string;
        };
        appsSuspendInstallation: {
            comment: string;
            doc: string;
        };
        appsDeleteAuthorization: {
            comment: string;
            doc: string;
        };
        appsDeleteToken: {
            comment: string;
            doc: string;
        };
        appsResetToken: {
            comment: string;
            doc: string;
        };
        appsCheckToken: {
            comment: string;
            doc: string;
        };
        appsScopeToken: {
            comment: string;
            doc: string;
        };
        appsGetBySlug: {
            comment: string;
            doc: string;
        };
        codesOfConductGetAllCodesOfConduct: {
            comment: string;
            doc: string;
        };
        codesOfConductGetConductCode: {
            comment: string;
            doc: string;
        };
        emojisGet: {
            comment: string;
            doc: string;
        };
        dependabotListAlertsForEnterprise: {
            comment: string;
            doc: string;
        };
        secretScanningListAlertsForEnterprise: {
            comment: string;
            doc: string;
        };
        activityListPublicEvents: {
            comment: string;
            doc: string;
        };
        activityGetFeeds: {
            comment: string;
            doc: string;
        };
        gistsList: {
            comment: string;
            doc: string;
        };
        gistsCreate: {
            comment: string;
            doc: string;
        };
        gistsListPublic: {
            comment: string;
            doc: string;
        };
        gistsListStarred: {
            comment: string;
            doc: string;
        };
        gistsDelete: {
            comment: string;
            doc: string;
        };
        gistsGet: {
            comment: string;
            doc: string;
        };
        gistsUpdate: {
            comment: string;
            doc: string;
        };
        gistsListComments: {
            comment: string;
            doc: string;
        };
        gistsCreateComment: {
            comment: string;
            doc: string;
        };
        gistsDeleteComment: {
            comment: string;
            doc: string;
        };
        gistsGetComment: {
            comment: string;
            doc: string;
        };
        gistsUpdateComment: {
            comment: string;
            doc: string;
        };
        gistsListCommits: {
            comment: string;
            doc: string;
        };
        gistsListForks: {
            comment: string;
            doc: string;
        };
        gistsFork: {
            comment: string;
            doc: string;
        };
        gistsUnstar: {
            comment: string;
            doc: string;
        };
        gistsCheckIsStarred: {
            comment: string;
            doc: string;
        };
        gistsStar: {
            comment: string;
            doc: string;
        };
        gistsGetRevision: {
            comment: string;
            doc: string;
        };
        gitignoreGetAllTemplates: {
            comment: string;
            doc: string;
        };
        gitignoreGetTemplate: {
            comment: string;
            doc: string;
        };
        appsListReposAccessibleToInstallation: {
            comment: string;
            doc: string;
        };
        appsRevokeInstallationAccessToken: {
            comment: string;
            doc: string;
        };
        issuesList: {
            comment: string;
            doc: string;
        };
        licensesGetAllCommonlyUsed: {
            comment: string;
            doc: string;
        };
        licensesGet: {
            comment: string;
            doc: string;
        };
        markdownRender: {
            comment: string;
            doc: string;
        };
        markdownRenderRaw: {
            comment: string;
            doc: string;
        };
        appsGetSubscriptionPlanForAccount: {
            comment: string;
            doc: string;
        };
        appsListPlans: {
            comment: string;
            doc: string;
        };
        appsListAccountsForPlan: {
            comment: string;
            doc: string;
        };
        appsGetSubscriptionPlanForAccountStubbed: {
            comment: string;
            doc: string;
        };
        appsListPlansStubbed: {
            comment: string;
            doc: string;
        };
        appsListAccountsForPlanStubbed: {
            comment: string;
            doc: string;
        };
        metaGet: {
            comment: string;
            doc: string;
        };
        activityListPublicEventsForRepoNetwork: {
            comment: string;
            doc: string;
        };
        activityListNotificationsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityMarkNotificationsAsRead: {
            comment: string;
            doc: string;
        };
        activityGetThread: {
            comment: string;
            doc: string;
        };
        activityMarkThreadAsRead: {
            comment: string;
            doc: string;
        };
        activityDeleteThreadSubscription: {
            comment: string;
            doc: string;
        };
        activityGetThreadSubscriptionForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activitySetThreadSubscription: {
            comment: string;
            doc: string;
        };
        metaGetOctocat: {
            comment: string;
            doc: string;
        };
        orgsList: {
            comment: string;
            doc: string;
        };
        orgsGet: {
            comment: string;
            doc: string;
        };
        orgsUpdate: {
            comment: string;
            doc: string;
        };
        actionsGetActionsCacheUsageForOrg: {
            comment: string;
            doc: string;
        };
        actionsGetActionsCacheUsageByRepoForOrg: {
            comment: string;
            doc: string;
        };
        oidcGetOidcCustomSubTemplateForOrg: {
            comment: string;
            doc: string;
        };
        oidcUpdateOidcCustomSubTemplateForOrg: {
            comment: string;
            doc: string;
        };
        actionsGetGithubActionsPermissionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsSetGithubActionsPermissionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsListSelectedRepositoriesEnabledGithubActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsSetSelectedRepositoriesEnabledGithubActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsDisableSelectedRepositoryGithubActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsEnableSelectedRepositoryGithubActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsGetAllowedActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsSetAllowedActionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsGetGithubActionsDefaultWorkflowPermissionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsSetGithubActionsDefaultWorkflowPermissionsOrganization: {
            comment: string;
            doc: string;
        };
        actionsListRequiredWorkflows: {
            comment: string;
            doc: string;
        };
        actionsCreateRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsDeleteRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsGetRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsUpdateRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsListSelectedRepositoriesRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsSetSelectedReposToRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsRemoveSelectedRepoFromRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsAddSelectedRepoToRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsListSelfHostedRunnersForOrg: {
            comment: string;
            doc: string;
        };
        actionsListRunnerApplicationsForOrg: {
            comment: string;
            doc: string;
        };
        actionsCreateRegistrationTokenForOrg: {
            comment: string;
            doc: string;
        };
        actionsCreateRemoveTokenForOrg: {
            comment: string;
            doc: string;
        };
        actionsDeleteSelfHostedRunnerFromOrg: {
            comment: string;
            doc: string;
        };
        actionsGetSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsListLabelsForSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsAddCustomLabelsToSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsSetCustomLabelsForSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsRemoveCustomLabelFromSelfHostedRunnerForOrg: {
            comment: string;
            doc: string;
        };
        actionsListOrgSecrets: {
            comment: string;
            doc: string;
        };
        actionsGetOrgPublicKey: {
            comment: string;
            doc: string;
        };
        actionsDeleteOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsGetOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsCreateOrUpdateOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsListSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsSetSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsRemoveSelectedRepoFromOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsAddSelectedRepoToOrgSecret: {
            comment: string;
            doc: string;
        };
        actionsListOrgVariables: {
            comment: string;
            doc: string;
        };
        actionsCreateOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsDeleteOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsGetOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsUpdateOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsListSelectedReposForOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsSetSelectedReposForOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsRemoveSelectedRepoFromOrgVariable: {
            comment: string;
            doc: string;
        };
        actionsAddSelectedRepoToOrgVariable: {
            comment: string;
            doc: string;
        };
        orgsListBlockedUsers: {
            comment: string;
            doc: string;
        };
        orgsUnblockUser: {
            comment: string;
            doc: string;
        };
        orgsCheckBlockedUser: {
            comment: string;
            doc: string;
        };
        orgsBlockUser: {
            comment: string;
            doc: string;
        };
        codeScanningListAlertsForOrg: {
            comment: string;
            doc: string;
        };
        codespacesListInOrganization: {
            comment: string;
            doc: string;
        };
        codespacesSetCodespacesBilling: {
            comment: string;
            doc: string;
        };
        codespacesDeleteCodespacesBillingUsers: {
            comment: string;
            doc: string;
        };
        codespacesSetCodespacesBillingUsers: {
            comment: string;
            doc: string;
        };
        codespacesListOrgSecrets: {
            comment: string;
            doc: string;
        };
        codespacesGetOrgPublicKey: {
            comment: string;
            doc: string;
        };
        codespacesDeleteOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesGetOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesCreateOrUpdateOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesListSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesSetSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesRemoveSelectedRepoFromOrgSecret: {
            comment: string;
            doc: string;
        };
        codespacesAddSelectedRepoToOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotListAlertsForOrg: {
            comment: string;
            doc: string;
        };
        dependabotListOrgSecrets: {
            comment: string;
            doc: string;
        };
        dependabotGetOrgPublicKey: {
            comment: string;
            doc: string;
        };
        dependabotDeleteOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotGetOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotCreateOrUpdateOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotListSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotSetSelectedReposForOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotRemoveSelectedRepoFromOrgSecret: {
            comment: string;
            doc: string;
        };
        dependabotAddSelectedRepoToOrgSecret: {
            comment: string;
            doc: string;
        };
        activityListPublicOrgEvents: {
            comment: string;
            doc: string;
        };
        orgsListFailedInvitations: {
            comment: string;
            doc: string;
        };
        orgsListWebhooks: {
            comment: string;
            doc: string;
        };
        orgsCreateWebhook: {
            comment: string;
            doc: string;
        };
        orgsDeleteWebhook: {
            comment: string;
            doc: string;
        };
        orgsGetWebhook: {
            comment: string;
            doc: string;
        };
        orgsUpdateWebhook: {
            comment: string;
            doc: string;
        };
        orgsGetWebhookConfigForOrg: {
            comment: string;
            doc: string;
        };
        orgsUpdateWebhookConfigForOrg: {
            comment: string;
            doc: string;
        };
        orgsListWebhookDeliveries: {
            comment: string;
            doc: string;
        };
        orgsGetWebhookDelivery: {
            comment: string;
            doc: string;
        };
        orgsRedeliverWebhookDelivery: {
            comment: string;
            doc: string;
        };
        orgsPingWebhook: {
            comment: string;
            doc: string;
        };
        appsGetOrgInstallation: {
            comment: string;
            doc: string;
        };
        orgsListAppInstallations: {
            comment: string;
            doc: string;
        };
        interactionsRemoveRestrictionsForOrg: {
            comment: string;
            doc: string;
        };
        interactionsGetRestrictionsForOrg: {
            comment: string;
            doc: string;
        };
        interactionsSetRestrictionsForOrg: {
            comment: string;
            doc: string;
        };
        orgsListPendingInvitations: {
            comment: string;
            doc: string;
        };
        orgsCreateInvitation: {
            comment: string;
            doc: string;
        };
        orgsCancelInvitation: {
            comment: string;
            doc: string;
        };
        orgsListInvitationTeams: {
            comment: string;
            doc: string;
        };
        issuesListForOrg: {
            comment: string;
            doc: string;
        };
        orgsListMembers: {
            comment: string;
            doc: string;
        };
        orgsRemoveMember: {
            comment: string;
            doc: string;
        };
        orgsCheckMembershipForUser: {
            comment: string;
            doc: string;
        };
        codespacesGetCodespacesForUserInOrg: {
            comment: string;
            doc: string;
        };
        codespacesDeleteFromOrganization: {
            comment: string;
            doc: string;
        };
        codespacesStopInOrganization: {
            comment: string;
            doc: string;
        };
        orgsRemoveMembershipForUser: {
            comment: string;
            doc: string;
        };
        orgsGetMembershipForUser: {
            comment: string;
            doc: string;
        };
        orgsSetMembershipForUser: {
            comment: string;
            doc: string;
        };
        migrationsListForOrg: {
            comment: string;
            doc: string;
        };
        migrationsStartForOrg: {
            comment: string;
            doc: string;
        };
        migrationsGetStatusForOrg: {
            comment: string;
            doc: string;
        };
        migrationsDeleteArchiveForOrg: {
            comment: string;
            doc: string;
        };
        migrationsDownloadArchiveForOrg: {
            comment: string;
            doc: string;
        };
        migrationsUnlockRepoForOrg: {
            comment: string;
            doc: string;
        };
        migrationsListReposForOrg: {
            comment: string;
            doc: string;
        };
        orgsListOutsideCollaborators: {
            comment: string;
            doc: string;
        };
        orgsRemoveOutsideCollaborator: {
            comment: string;
            doc: string;
        };
        orgsConvertMemberToOutsideCollaborator: {
            comment: string;
            doc: string;
        };
        packagesListPackagesForOrganization: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageForOrg: {
            comment: string;
            doc: string;
        };
        packagesGetPackageForOrganization: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageForOrg: {
            comment: string;
            doc: string;
        };
        packagesGetAllPackageVersionsForPackageOwnedByOrg: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageVersionForOrg: {
            comment: string;
            doc: string;
        };
        packagesGetPackageVersionForOrganization: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageVersionForOrg: {
            comment: string;
            doc: string;
        };
        projectsListForOrg: {
            comment: string;
            doc: string;
        };
        projectsCreateForOrg: {
            comment: string;
            doc: string;
        };
        orgsListPublicMembers: {
            comment: string;
            doc: string;
        };
        orgsRemovePublicMembershipForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        orgsCheckPublicMembershipForUser: {
            comment: string;
            doc: string;
        };
        orgsSetPublicMembershipForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposListForOrg: {
            comment: string;
            doc: string;
        };
        reposCreateInOrg: {
            comment: string;
            doc: string;
        };
        secretScanningListAlertsForOrg: {
            comment: string;
            doc: string;
        };
        orgsListSecurityManagerTeams: {
            comment: string;
            doc: string;
        };
        orgsRemoveSecurityManagerTeam: {
            comment: string;
            doc: string;
        };
        orgsAddSecurityManagerTeam: {
            comment: string;
            doc: string;
        };
        billingGetGithubActionsBillingOrg: {
            comment: string;
            doc: string;
        };
        billingGetGithubPackagesBillingOrg: {
            comment: string;
            doc: string;
        };
        billingGetSharedStorageBillingOrg: {
            comment: string;
            doc: string;
        };
        teamsList: {
            comment: string;
            doc: string;
        };
        teamsCreate: {
            comment: string;
            doc: string;
        };
        teamsDeleteInOrg: {
            comment: string;
            doc: string;
        };
        teamsGetByName: {
            comment: string;
            doc: string;
        };
        teamsUpdateInOrg: {
            comment: string;
            doc: string;
        };
        teamsListDiscussionsInOrg: {
            comment: string;
            doc: string;
        };
        teamsCreateDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        teamsDeleteDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        teamsGetDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        teamsUpdateDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        teamsListDiscussionCommentsInOrg: {
            comment: string;
            doc: string;
        };
        teamsCreateDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        teamsDeleteDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        teamsGetDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        teamsUpdateDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        reactionsListForTeamDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        reactionsCreateForTeamDiscussionCommentInOrg: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForTeamDiscussionComment: {
            comment: string;
            doc: string;
        };
        reactionsListForTeamDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        reactionsCreateForTeamDiscussionInOrg: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForTeamDiscussion: {
            comment: string;
            doc: string;
        };
        teamsListPendingInvitationsInOrg: {
            comment: string;
            doc: string;
        };
        teamsListMembersInOrg: {
            comment: string;
            doc: string;
        };
        teamsRemoveMembershipForUserInOrg: {
            comment: string;
            doc: string;
        };
        teamsGetMembershipForUserInOrg: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateMembershipForUserInOrg: {
            comment: string;
            doc: string;
        };
        teamsListProjectsInOrg: {
            comment: string;
            doc: string;
        };
        teamsRemoveProjectInOrg: {
            comment: string;
            doc: string;
        };
        teamsCheckPermissionsForProjectInOrg: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateProjectPermissionsInOrg: {
            comment: string;
            doc: string;
        };
        teamsListReposInOrg: {
            comment: string;
            doc: string;
        };
        teamsRemoveRepoInOrg: {
            comment: string;
            doc: string;
        };
        teamsCheckPermissionsForRepoInOrg: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateRepoPermissionsInOrg: {
            comment: string;
            doc: string;
        };
        teamsListChildInOrg: {
            comment: string;
            doc: string;
        };
        orgsEnableOrDisableSecurityProductOnAllOrgRepos: {
            comment: string;
            doc: string;
        };
        projectsDeleteCard: {
            comment: string;
            doc: string;
        };
        projectsGetCard: {
            comment: string;
            doc: string;
        };
        projectsUpdateCard: {
            comment: string;
            doc: string;
        };
        projectsMoveCard: {
            comment: string;
            doc: string;
        };
        projectsDeleteColumn: {
            comment: string;
            doc: string;
        };
        projectsGetColumn: {
            comment: string;
            doc: string;
        };
        projectsUpdateColumn: {
            comment: string;
            doc: string;
        };
        projectsListCards: {
            comment: string;
            doc: string;
        };
        projectsCreateCard: {
            comment: string;
            doc: string;
        };
        projectsMoveColumn: {
            comment: string;
            doc: string;
        };
        projectsDelete: {
            comment: string;
            doc: string;
        };
        projectsGet: {
            comment: string;
            doc: string;
        };
        projectsUpdate: {
            comment: string;
            doc: string;
        };
        projectsListCollaborators: {
            comment: string;
            doc: string;
        };
        projectsRemoveCollaborator: {
            comment: string;
            doc: string;
        };
        projectsAddCollaborator: {
            comment: string;
            doc: string;
        };
        projectsGetPermissionForUser: {
            comment: string;
            doc: string;
        };
        projectsListColumns: {
            comment: string;
            doc: string;
        };
        projectsCreateColumn: {
            comment: string;
            doc: string;
        };
        rateLimitGet: {
            comment: string;
            doc: string;
        };
        actionsListRepoRequiredWorkflows: {
            comment: string;
            doc: string;
        };
        actionsGetRepoRequiredWorkflow: {
            comment: string;
            doc: string;
        };
        actionsGetRepoRequiredWorkflowUsage: {
            comment: string;
            doc: string;
        };
        reposDelete: {
            comment: string;
            doc: string;
        };
        reposGet: {
            comment: string;
            doc: string;
        };
        reposUpdate: {
            comment: string;
            doc: string;
        };
        actionsListArtifactsForRepo: {
            comment: string;
            doc: string;
        };
        actionsDeleteArtifact: {
            comment: string;
            doc: string;
        };
        actionsGetArtifact: {
            comment: string;
            doc: string;
        };
        actionsDownloadArtifact: {
            comment: string;
            doc: string;
        };
        actionsGetActionsCacheUsage: {
            comment: string;
            doc: string;
        };
        actionsDeleteActionsCacheByKey: {
            comment: string;
            doc: string;
        };
        actionsGetActionsCacheList: {
            comment: string;
            doc: string;
        };
        actionsDeleteActionsCacheById: {
            comment: string;
            doc: string;
        };
        actionsGetJobForWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsDownloadJobLogsForWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsReRunJobForWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsGetCustomOidcSubClaimForRepo: {
            comment: string;
            doc: string;
        };
        actionsSetCustomOidcSubClaimForRepo: {
            comment: string;
            doc: string;
        };
        actionsGetGithubActionsPermissionsRepository: {
            comment: string;
            doc: string;
        };
        actionsSetGithubActionsPermissionsRepository: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflowAccessToRepository: {
            comment: string;
            doc: string;
        };
        actionsSetWorkflowAccessToRepository: {
            comment: string;
            doc: string;
        };
        actionsGetAllowedActionsRepository: {
            comment: string;
            doc: string;
        };
        actionsSetAllowedActionsRepository: {
            comment: string;
            doc: string;
        };
        actionsGetGithubActionsDefaultWorkflowPermissionsRepository: {
            comment: string;
            doc: string;
        };
        actionsSetGithubActionsDefaultWorkflowPermissionsRepository: {
            comment: string;
            doc: string;
        };
        actionsListRequiredWorkflowRuns: {
            comment: string;
            doc: string;
        };
        actionsListSelfHostedRunnersForRepo: {
            comment: string;
            doc: string;
        };
        actionsListRunnerApplicationsForRepo: {
            comment: string;
            doc: string;
        };
        actionsCreateRegistrationTokenForRepo: {
            comment: string;
            doc: string;
        };
        actionsCreateRemoveTokenForRepo: {
            comment: string;
            doc: string;
        };
        actionsDeleteSelfHostedRunnerFromRepo: {
            comment: string;
            doc: string;
        };
        actionsGetSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsListLabelsForSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsAddCustomLabelsToSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsSetCustomLabelsForSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsRemoveCustomLabelFromSelfHostedRunnerForRepo: {
            comment: string;
            doc: string;
        };
        actionsListWorkflowRunsForRepo: {
            comment: string;
            doc: string;
        };
        actionsDeleteWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsGetReviewsForRun: {
            comment: string;
            doc: string;
        };
        actionsApproveWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsListWorkflowRunArtifacts: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflowRunAttempt: {
            comment: string;
            doc: string;
        };
        actionsListJobsForWorkflowRunAttempt: {
            comment: string;
            doc: string;
        };
        actionsDownloadWorkflowRunAttemptLogs: {
            comment: string;
            doc: string;
        };
        actionsCancelWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsListJobsForWorkflowRun: {
            comment: string;
            doc: string;
        };
        actionsDeleteWorkflowRunLogs: {
            comment: string;
            doc: string;
        };
        actionsDownloadWorkflowRunLogs: {
            comment: string;
            doc: string;
        };
        actionsGetPendingDeploymentsForRun: {
            comment: string;
            doc: string;
        };
        actionsReviewPendingDeploymentsForRun: {
            comment: string;
            doc: string;
        };
        actionsReRunWorkflow: {
            comment: string;
            doc: string;
        };
        actionsReRunWorkflowFailedJobs: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflowRunUsage: {
            comment: string;
            doc: string;
        };
        actionsListRepoSecrets: {
            comment: string;
            doc: string;
        };
        actionsGetRepoPublicKey: {
            comment: string;
            doc: string;
        };
        actionsDeleteRepoSecret: {
            comment: string;
            doc: string;
        };
        actionsGetRepoSecret: {
            comment: string;
            doc: string;
        };
        actionsCreateOrUpdateRepoSecret: {
            comment: string;
            doc: string;
        };
        actionsListRepoVariables: {
            comment: string;
            doc: string;
        };
        actionsCreateRepoVariable: {
            comment: string;
            doc: string;
        };
        actionsDeleteRepoVariable: {
            comment: string;
            doc: string;
        };
        actionsGetRepoVariable: {
            comment: string;
            doc: string;
        };
        actionsUpdateRepoVariable: {
            comment: string;
            doc: string;
        };
        actionsListRepoWorkflows: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflow: {
            comment: string;
            doc: string;
        };
        actionsDisableWorkflow: {
            comment: string;
            doc: string;
        };
        actionsCreateWorkflowDispatch: {
            comment: string;
            doc: string;
        };
        actionsEnableWorkflow: {
            comment: string;
            doc: string;
        };
        actionsListWorkflowRuns: {
            comment: string;
            doc: string;
        };
        actionsGetWorkflowUsage: {
            comment: string;
            doc: string;
        };
        issuesListAssignees: {
            comment: string;
            doc: string;
        };
        issuesCheckUserCanBeAssigned: {
            comment: string;
            doc: string;
        };
        reposListAutolinks: {
            comment: string;
            doc: string;
        };
        reposCreateAutolink: {
            comment: string;
            doc: string;
        };
        reposDeleteAutolink: {
            comment: string;
            doc: string;
        };
        reposGetAutolink: {
            comment: string;
            doc: string;
        };
        reposDisableAutomatedSecurityFixes: {
            comment: string;
            doc: string;
        };
        reposEnableAutomatedSecurityFixes: {
            comment: string;
            doc: string;
        };
        reposListBranches: {
            comment: string;
            doc: string;
        };
        reposGetBranch: {
            comment: string;
            doc: string;
        };
        reposDeleteBranchProtection: {
            comment: string;
            doc: string;
        };
        reposGetBranchProtection: {
            comment: string;
            doc: string;
        };
        reposUpdateBranchProtection: {
            comment: string;
            doc: string;
        };
        reposDeleteAdminBranchProtection: {
            comment: string;
            doc: string;
        };
        reposGetAdminBranchProtection: {
            comment: string;
            doc: string;
        };
        reposSetAdminBranchProtection: {
            comment: string;
            doc: string;
        };
        reposDeletePullRequestReviewProtection: {
            comment: string;
            doc: string;
        };
        reposGetPullRequestReviewProtection: {
            comment: string;
            doc: string;
        };
        reposUpdatePullRequestReviewProtection: {
            comment: string;
            doc: string;
        };
        reposDeleteCommitSignatureProtection: {
            comment: string;
            doc: string;
        };
        reposGetCommitSignatureProtection: {
            comment: string;
            doc: string;
        };
        reposCreateCommitSignatureProtection: {
            comment: string;
            doc: string;
        };
        reposRemoveStatusCheckProtection: {
            comment: string;
            doc: string;
        };
        reposGetStatusChecksProtection: {
            comment: string;
            doc: string;
        };
        reposUpdateStatusCheckProtection: {
            comment: string;
            doc: string;
        };
        reposRemoveStatusCheckContexts: {
            comment: string;
            doc: string;
        };
        reposGetAllStatusCheckContexts: {
            comment: string;
            doc: string;
        };
        reposAddStatusCheckContexts: {
            comment: string;
            doc: string;
        };
        reposSetStatusCheckContexts: {
            comment: string;
            doc: string;
        };
        reposDeleteAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposGetAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposRemoveAppAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposGetAppsWithAccessToProtectedBranch: {
            comment: string;
            doc: string;
        };
        reposAddAppAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposSetAppAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposRemoveTeamAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposGetTeamsWithAccessToProtectedBranch: {
            comment: string;
            doc: string;
        };
        reposAddTeamAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposSetTeamAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposRemoveUserAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposGetUsersWithAccessToProtectedBranch: {
            comment: string;
            doc: string;
        };
        reposAddUserAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposSetUserAccessRestrictions: {
            comment: string;
            doc: string;
        };
        reposRenameBranch: {
            comment: string;
            doc: string;
        };
        checksCreate: {
            comment: string;
            doc: string;
        };
        checksGet: {
            comment: string;
            doc: string;
        };
        checksUpdate: {
            comment: string;
            doc: string;
        };
        checksListAnnotations: {
            comment: string;
            doc: string;
        };
        checksRerequestRun: {
            comment: string;
            doc: string;
        };
        checksCreateSuite: {
            comment: string;
            doc: string;
        };
        checksSetSuitesPreferences: {
            comment: string;
            doc: string;
        };
        checksGetSuite: {
            comment: string;
            doc: string;
        };
        checksListForSuite: {
            comment: string;
            doc: string;
        };
        checksRerequestSuite: {
            comment: string;
            doc: string;
        };
        codeScanningListAlertsForRepo: {
            comment: string;
            doc: string;
        };
        codeScanningGetAlert: {
            comment: string;
            doc: string;
        };
        codeScanningUpdateAlert: {
            comment: string;
            doc: string;
        };
        codeScanningListAlertInstances: {
            comment: string;
            doc: string;
        };
        codeScanningListRecentAnalyses: {
            comment: string;
            doc: string;
        };
        codeScanningDeleteAnalysis: {
            comment: string;
            doc: string;
        };
        codeScanningGetAnalysis: {
            comment: string;
            doc: string;
        };
        codeScanningListCodeqlDatabases: {
            comment: string;
            doc: string;
        };
        codeScanningGetCodeqlDatabase: {
            comment: string;
            doc: string;
        };
        codeScanningUploadSarif: {
            comment: string;
            doc: string;
        };
        codeScanningGetSarif: {
            comment: string;
            doc: string;
        };
        reposCodeownersErrors: {
            comment: string;
            doc: string;
        };
        codespacesListInRepositoryForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesCreateWithRepoForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesListDevcontainersInRepositoryForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesRepoMachinesForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesPreFlightWithRepoForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesListRepoSecrets: {
            comment: string;
            doc: string;
        };
        codespacesGetRepoPublicKey: {
            comment: string;
            doc: string;
        };
        codespacesDeleteRepoSecret: {
            comment: string;
            doc: string;
        };
        codespacesGetRepoSecret: {
            comment: string;
            doc: string;
        };
        codespacesCreateOrUpdateRepoSecret: {
            comment: string;
            doc: string;
        };
        reposListCollaborators: {
            comment: string;
            doc: string;
        };
        reposRemoveCollaborator: {
            comment: string;
            doc: string;
        };
        reposCheckCollaborator: {
            comment: string;
            doc: string;
        };
        reposAddCollaborator: {
            comment: string;
            doc: string;
        };
        reposGetCollaboratorPermissionLevel: {
            comment: string;
            doc: string;
        };
        reposListCommitCommentsForRepo: {
            comment: string;
            doc: string;
        };
        reposDeleteCommitComment: {
            comment: string;
            doc: string;
        };
        reposGetCommitComment: {
            comment: string;
            doc: string;
        };
        reposUpdateCommitComment: {
            comment: string;
            doc: string;
        };
        reactionsListForCommitComment: {
            comment: string;
            doc: string;
        };
        reactionsCreateForCommitComment: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForCommitComment: {
            comment: string;
            doc: string;
        };
        reposListCommits: {
            comment: string;
            doc: string;
        };
        reposListBranchesForHeadCommit: {
            comment: string;
            doc: string;
        };
        reposListCommentsForCommit: {
            comment: string;
            doc: string;
        };
        reposCreateCommitComment: {
            comment: string;
            doc: string;
        };
        reposListPullRequestsAssociatedWithCommit: {
            comment: string;
            doc: string;
        };
        reposGetCommit: {
            comment: string;
            doc: string;
        };
        checksListForRef: {
            comment: string;
            doc: string;
        };
        checksListSuitesForRef: {
            comment: string;
            doc: string;
        };
        reposGetCombinedStatusForRef: {
            comment: string;
            doc: string;
        };
        reposListCommitStatusesForRef: {
            comment: string;
            doc: string;
        };
        reposGetCommunityProfileMetrics: {
            comment: string;
            doc: string;
        };
        reposCompareCommits: {
            comment: string;
            doc: string;
        };
        reposDeleteFile: {
            comment: string;
            doc: string;
        };
        reposGetContent: {
            comment: string;
            doc: string;
        };
        reposCreateOrUpdateFileContents: {
            comment: string;
            doc: string;
        };
        reposListContributors: {
            comment: string;
            doc: string;
        };
        dependabotListAlertsForRepo: {
            comment: string;
            doc: string;
        };
        dependabotGetAlert: {
            comment: string;
            doc: string;
        };
        dependabotUpdateAlert: {
            comment: string;
            doc: string;
        };
        dependabotListRepoSecrets: {
            comment: string;
            doc: string;
        };
        dependabotGetRepoPublicKey: {
            comment: string;
            doc: string;
        };
        dependabotDeleteRepoSecret: {
            comment: string;
            doc: string;
        };
        dependabotGetRepoSecret: {
            comment: string;
            doc: string;
        };
        dependabotCreateOrUpdateRepoSecret: {
            comment: string;
            doc: string;
        };
        dependencyGraphDiffRange: {
            comment: string;
            doc: string;
        };
        dependencyGraphCreateRepositorySnapshot: {
            comment: string;
            doc: string;
        };
        reposListDeployments: {
            comment: string;
            doc: string;
        };
        reposCreateDeployment: {
            comment: string;
            doc: string;
        };
        reposDeleteDeployment: {
            comment: string;
            doc: string;
        };
        reposGetDeployment: {
            comment: string;
            doc: string;
        };
        reposListDeploymentStatuses: {
            comment: string;
            doc: string;
        };
        reposCreateDeploymentStatus: {
            comment: string;
            doc: string;
        };
        reposGetDeploymentStatus: {
            comment: string;
            doc: string;
        };
        reposCreateDispatchEvent: {
            comment: string;
            doc: string;
        };
        reposGetAllEnvironments: {
            comment: string;
            doc: string;
        };
        reposDeleteAnEnvironment: {
            comment: string;
            doc: string;
        };
        reposGetEnvironment: {
            comment: string;
            doc: string;
        };
        reposCreateOrUpdateEnvironment: {
            comment: string;
            doc: string;
        };
        reposListDeploymentBranchPolicies: {
            comment: string;
            doc: string;
        };
        reposCreateDeploymentBranchPolicy: {
            comment: string;
            doc: string;
        };
        reposDeleteDeploymentBranchPolicy: {
            comment: string;
            doc: string;
        };
        reposGetDeploymentBranchPolicy: {
            comment: string;
            doc: string;
        };
        reposUpdateDeploymentBranchPolicy: {
            comment: string;
            doc: string;
        };
        activityListRepoEvents: {
            comment: string;
            doc: string;
        };
        reposListForks: {
            comment: string;
            doc: string;
        };
        reposCreateFork: {
            comment: string;
            doc: string;
        };
        gitCreateBlob: {
            comment: string;
            doc: string;
        };
        gitGetBlob: {
            comment: string;
            doc: string;
        };
        gitCreateCommit: {
            comment: string;
            doc: string;
        };
        gitGetCommit: {
            comment: string;
            doc: string;
        };
        gitListMatchingRefs: {
            comment: string;
            doc: string;
        };
        gitGetRef: {
            comment: string;
            doc: string;
        };
        gitCreateRef: {
            comment: string;
            doc: string;
        };
        gitDeleteRef: {
            comment: string;
            doc: string;
        };
        gitUpdateRef: {
            comment: string;
            doc: string;
        };
        gitCreateTag: {
            comment: string;
            doc: string;
        };
        gitGetTag: {
            comment: string;
            doc: string;
        };
        gitCreateTree: {
            comment: string;
            doc: string;
        };
        gitGetTree: {
            comment: string;
            doc: string;
        };
        reposListWebhooks: {
            comment: string;
            doc: string;
        };
        reposCreateWebhook: {
            comment: string;
            doc: string;
        };
        reposDeleteWebhook: {
            comment: string;
            doc: string;
        };
        reposGetWebhook: {
            comment: string;
            doc: string;
        };
        reposUpdateWebhook: {
            comment: string;
            doc: string;
        };
        reposGetWebhookConfigForRepo: {
            comment: string;
            doc: string;
        };
        reposUpdateWebhookConfigForRepo: {
            comment: string;
            doc: string;
        };
        reposListWebhookDeliveries: {
            comment: string;
            doc: string;
        };
        reposGetWebhookDelivery: {
            comment: string;
            doc: string;
        };
        reposRedeliverWebhookDelivery: {
            comment: string;
            doc: string;
        };
        reposPingWebhook: {
            comment: string;
            doc: string;
        };
        reposTestPushWebhook: {
            comment: string;
            doc: string;
        };
        migrationsCancelImport: {
            comment: string;
            doc: string;
        };
        migrationsGetImportStatus: {
            comment: string;
            doc: string;
        };
        migrationsUpdateImport: {
            comment: string;
            doc: string;
        };
        migrationsStartImport: {
            comment: string;
            doc: string;
        };
        migrationsGetCommitAuthors: {
            comment: string;
            doc: string;
        };
        migrationsMapCommitAuthor: {
            comment: string;
            doc: string;
        };
        migrationsGetLargeFiles: {
            comment: string;
            doc: string;
        };
        migrationsSetLfsPreference: {
            comment: string;
            doc: string;
        };
        appsGetRepoInstallation: {
            comment: string;
            doc: string;
        };
        interactionsRemoveRestrictionsForRepo: {
            comment: string;
            doc: string;
        };
        interactionsGetRestrictionsForRepo: {
            comment: string;
            doc: string;
        };
        interactionsSetRestrictionsForRepo: {
            comment: string;
            doc: string;
        };
        reposListInvitations: {
            comment: string;
            doc: string;
        };
        reposDeleteInvitation: {
            comment: string;
            doc: string;
        };
        reposUpdateInvitation: {
            comment: string;
            doc: string;
        };
        issuesListForRepo: {
            comment: string;
            doc: string;
        };
        issuesCreate: {
            comment: string;
            doc: string;
        };
        issuesListCommentsForRepo: {
            comment: string;
            doc: string;
        };
        issuesDeleteComment: {
            comment: string;
            doc: string;
        };
        issuesGetComment: {
            comment: string;
            doc: string;
        };
        issuesUpdateComment: {
            comment: string;
            doc: string;
        };
        reactionsListForIssueComment: {
            comment: string;
            doc: string;
        };
        reactionsCreateForIssueComment: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForIssueComment: {
            comment: string;
            doc: string;
        };
        issuesListEventsForRepo: {
            comment: string;
            doc: string;
        };
        issuesGetEvent: {
            comment: string;
            doc: string;
        };
        issuesGet: {
            comment: string;
            doc: string;
        };
        issuesUpdate: {
            comment: string;
            doc: string;
        };
        issuesRemoveAssignees: {
            comment: string;
            doc: string;
        };
        issuesAddAssignees: {
            comment: string;
            doc: string;
        };
        issuesCheckUserCanBeAssignedToIssue: {
            comment: string;
            doc: string;
        };
        issuesListComments: {
            comment: string;
            doc: string;
        };
        issuesCreateComment: {
            comment: string;
            doc: string;
        };
        issuesListEvents: {
            comment: string;
            doc: string;
        };
        issuesRemoveAllLabels: {
            comment: string;
            doc: string;
        };
        issuesListLabelsOnIssue: {
            comment: string;
            doc: string;
        };
        issuesAddLabels: {
            comment: string;
            doc: string;
        };
        issuesSetLabels: {
            comment: string;
            doc: string;
        };
        issuesRemoveLabel: {
            comment: string;
            doc: string;
        };
        issuesUnlock: {
            comment: string;
            doc: string;
        };
        issuesLock: {
            comment: string;
            doc: string;
        };
        reactionsListForIssue: {
            comment: string;
            doc: string;
        };
        reactionsCreateForIssue: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForIssue: {
            comment: string;
            doc: string;
        };
        issuesListEventsForTimeline: {
            comment: string;
            doc: string;
        };
        reposListDeployKeys: {
            comment: string;
            doc: string;
        };
        reposCreateDeployKey: {
            comment: string;
            doc: string;
        };
        reposDeleteDeployKey: {
            comment: string;
            doc: string;
        };
        reposGetDeployKey: {
            comment: string;
            doc: string;
        };
        issuesListLabelsForRepo: {
            comment: string;
            doc: string;
        };
        issuesCreateLabel: {
            comment: string;
            doc: string;
        };
        issuesDeleteLabel: {
            comment: string;
            doc: string;
        };
        issuesGetLabel: {
            comment: string;
            doc: string;
        };
        issuesUpdateLabel: {
            comment: string;
            doc: string;
        };
        reposListLanguages: {
            comment: string;
            doc: string;
        };
        reposDisableLfsForRepo: {
            comment: string;
            doc: string;
        };
        reposEnableLfsForRepo: {
            comment: string;
            doc: string;
        };
        licensesGetForRepo: {
            comment: string;
            doc: string;
        };
        reposMergeUpstream: {
            comment: string;
            doc: string;
        };
        reposMerge: {
            comment: string;
            doc: string;
        };
        issuesListMilestones: {
            comment: string;
            doc: string;
        };
        issuesCreateMilestone: {
            comment: string;
            doc: string;
        };
        issuesDeleteMilestone: {
            comment: string;
            doc: string;
        };
        issuesGetMilestone: {
            comment: string;
            doc: string;
        };
        issuesUpdateMilestone: {
            comment: string;
            doc: string;
        };
        issuesListLabelsForMilestone: {
            comment: string;
            doc: string;
        };
        activityListRepoNotificationsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityMarkRepoNotificationsAsRead: {
            comment: string;
            doc: string;
        };
        reposDeletePagesSite: {
            comment: string;
            doc: string;
        };
        reposGetPages: {
            comment: string;
            doc: string;
        };
        reposCreatePagesSite: {
            comment: string;
            doc: string;
        };
        reposUpdateInformationAboutPagesSite: {
            comment: string;
            doc: string;
        };
        reposListPagesBuilds: {
            comment: string;
            doc: string;
        };
        reposRequestPagesBuild: {
            comment: string;
            doc: string;
        };
        reposGetLatestPagesBuild: {
            comment: string;
            doc: string;
        };
        reposGetPagesBuild: {
            comment: string;
            doc: string;
        };
        reposCreatePagesDeployment: {
            comment: string;
            doc: string;
        };
        reposGetPagesHealthCheck: {
            comment: string;
            doc: string;
        };
        projectsListForRepo: {
            comment: string;
            doc: string;
        };
        projectsCreateForRepo: {
            comment: string;
            doc: string;
        };
        pullsList: {
            comment: string;
            doc: string;
        };
        pullsCreate: {
            comment: string;
            doc: string;
        };
        pullsListReviewCommentsForRepo: {
            comment: string;
            doc: string;
        };
        pullsDeleteReviewComment: {
            comment: string;
            doc: string;
        };
        pullsGetReviewComment: {
            comment: string;
            doc: string;
        };
        pullsUpdateReviewComment: {
            comment: string;
            doc: string;
        };
        reactionsListForPullRequestReviewComment: {
            comment: string;
            doc: string;
        };
        reactionsCreateForPullRequestReviewComment: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForPullRequestComment: {
            comment: string;
            doc: string;
        };
        pullsGet: {
            comment: string;
            doc: string;
        };
        pullsUpdate: {
            comment: string;
            doc: string;
        };
        codespacesCreateWithPrForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        pullsListReviewComments: {
            comment: string;
            doc: string;
        };
        pullsCreateReviewComment: {
            comment: string;
            doc: string;
        };
        pullsCreateReplyForReviewComment: {
            comment: string;
            doc: string;
        };
        pullsListCommits: {
            comment: string;
            doc: string;
        };
        pullsListFiles: {
            comment: string;
            doc: string;
        };
        pullsCheckIfMerged: {
            comment: string;
            doc: string;
        };
        pullsMerge: {
            comment: string;
            doc: string;
        };
        pullsRemoveRequestedReviewers: {
            comment: string;
            doc: string;
        };
        pullsListRequestedReviewers: {
            comment: string;
            doc: string;
        };
        pullsRequestReviewers: {
            comment: string;
            doc: string;
        };
        pullsListReviews: {
            comment: string;
            doc: string;
        };
        pullsCreateReview: {
            comment: string;
            doc: string;
        };
        pullsDeletePendingReview: {
            comment: string;
            doc: string;
        };
        pullsGetReview: {
            comment: string;
            doc: string;
        };
        pullsUpdateReview: {
            comment: string;
            doc: string;
        };
        pullsListCommentsForReview: {
            comment: string;
            doc: string;
        };
        pullsDismissReview: {
            comment: string;
            doc: string;
        };
        pullsSubmitReview: {
            comment: string;
            doc: string;
        };
        pullsUpdateBranch: {
            comment: string;
            doc: string;
        };
        reposGetReadme: {
            comment: string;
            doc: string;
        };
        reposGetReadmeInDirectory: {
            comment: string;
            doc: string;
        };
        reposListReleases: {
            comment: string;
            doc: string;
        };
        reposCreateRelease: {
            comment: string;
            doc: string;
        };
        reposDeleteReleaseAsset: {
            comment: string;
            doc: string;
        };
        reposGetReleaseAsset: {
            comment: string;
            doc: string;
        };
        reposUpdateReleaseAsset: {
            comment: string;
            doc: string;
        };
        reposGenerateReleaseNotes: {
            comment: string;
            doc: string;
        };
        reposGetLatestRelease: {
            comment: string;
            doc: string;
        };
        reposGetReleaseByTag: {
            comment: string;
            doc: string;
        };
        reposDeleteRelease: {
            comment: string;
            doc: string;
        };
        reposGetRelease: {
            comment: string;
            doc: string;
        };
        reposUpdateRelease: {
            comment: string;
            doc: string;
        };
        reposListReleaseAssets: {
            comment: string;
            doc: string;
        };
        reposUploadReleaseAsset: {
            comment: string;
            doc: string;
        };
        reactionsListForRelease: {
            comment: string;
            doc: string;
        };
        reactionsCreateForRelease: {
            comment: string;
            doc: string;
        };
        reactionsDeleteForRelease: {
            comment: string;
            doc: string;
        };
        secretScanningListAlertsForRepo: {
            comment: string;
            doc: string;
        };
        secretScanningGetAlert: {
            comment: string;
            doc: string;
        };
        secretScanningUpdateAlert: {
            comment: string;
            doc: string;
        };
        secretScanningListLocationsForAlert: {
            comment: string;
            doc: string;
        };
        activityListStargazersForRepo: {
            comment: string;
            doc: string;
        };
        reposGetCodeFrequencyStats: {
            comment: string;
            doc: string;
        };
        reposGetCommitActivityStats: {
            comment: string;
            doc: string;
        };
        reposGetContributorsStats: {
            comment: string;
            doc: string;
        };
        reposGetParticipationStats: {
            comment: string;
            doc: string;
        };
        reposGetPunchCardStats: {
            comment: string;
            doc: string;
        };
        reposCreateCommitStatus: {
            comment: string;
            doc: string;
        };
        activityListWatchersForRepo: {
            comment: string;
            doc: string;
        };
        activityDeleteRepoSubscription: {
            comment: string;
            doc: string;
        };
        activityGetRepoSubscription: {
            comment: string;
            doc: string;
        };
        activitySetRepoSubscription: {
            comment: string;
            doc: string;
        };
        reposListTags: {
            comment: string;
            doc: string;
        };
        reposListTagProtection: {
            comment: string;
            doc: string;
        };
        reposCreateTagProtection: {
            comment: string;
            doc: string;
        };
        reposDeleteTagProtection: {
            comment: string;
            doc: string;
        };
        reposDownloadTarballArchive: {
            comment: string;
            doc: string;
        };
        reposListTeams: {
            comment: string;
            doc: string;
        };
        reposGetAllTopics: {
            comment: string;
            doc: string;
        };
        reposReplaceAllTopics: {
            comment: string;
            doc: string;
        };
        reposGetClones: {
            comment: string;
            doc: string;
        };
        reposGetTopPaths: {
            comment: string;
            doc: string;
        };
        reposGetTopReferrers: {
            comment: string;
            doc: string;
        };
        reposGetViews: {
            comment: string;
            doc: string;
        };
        reposTransfer: {
            comment: string;
            doc: string;
        };
        reposDisableVulnerabilityAlerts: {
            comment: string;
            doc: string;
        };
        reposCheckVulnerabilityAlerts: {
            comment: string;
            doc: string;
        };
        reposEnableVulnerabilityAlerts: {
            comment: string;
            doc: string;
        };
        reposDownloadZipballArchive: {
            comment: string;
            doc: string;
        };
        reposCreateUsingTemplate: {
            comment: string;
            doc: string;
        };
        reposListPublic: {
            comment: string;
            doc: string;
        };
        actionsListEnvironmentSecrets: {
            comment: string;
            doc: string;
        };
        actionsGetEnvironmentPublicKey: {
            comment: string;
            doc: string;
        };
        actionsDeleteEnvironmentSecret: {
            comment: string;
            doc: string;
        };
        actionsGetEnvironmentSecret: {
            comment: string;
            doc: string;
        };
        actionsCreateOrUpdateEnvironmentSecret: {
            comment: string;
            doc: string;
        };
        actionsListEnvironmentVariables: {
            comment: string;
            doc: string;
        };
        actionsCreateEnvironmentVariable: {
            comment: string;
            doc: string;
        };
        actionsDeleteEnvironmentVariable: {
            comment: string;
            doc: string;
        };
        actionsGetEnvironmentVariable: {
            comment: string;
            doc: string;
        };
        actionsUpdateEnvironmentVariable: {
            comment: string;
            doc: string;
        };
        searchCode: {
            comment: string;
            doc: string;
        };
        searchCommits: {
            comment: string;
            doc: string;
        };
        searchIssuesAndPullRequests: {
            comment: string;
            doc: string;
        };
        searchLabels: {
            comment: string;
            doc: string;
        };
        searchRepos: {
            comment: string;
            doc: string;
        };
        searchTopics: {
            comment: string;
            doc: string;
        };
        searchUsers: {
            comment: string;
            doc: string;
        };
        teamsDeleteLegacy: {
            comment: string;
            doc: string;
        };
        teamsGetLegacy: {
            comment: string;
            doc: string;
        };
        teamsUpdateLegacy: {
            comment: string;
            doc: string;
        };
        teamsListDiscussionsLegacy: {
            comment: string;
            doc: string;
        };
        teamsCreateDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        teamsDeleteDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        teamsGetDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        teamsUpdateDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        teamsListDiscussionCommentsLegacy: {
            comment: string;
            doc: string;
        };
        teamsCreateDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        teamsDeleteDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        teamsGetDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        teamsUpdateDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        reactionsListForTeamDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        reactionsCreateForTeamDiscussionCommentLegacy: {
            comment: string;
            doc: string;
        };
        reactionsListForTeamDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        reactionsCreateForTeamDiscussionLegacy: {
            comment: string;
            doc: string;
        };
        teamsListPendingInvitationsLegacy: {
            comment: string;
            doc: string;
        };
        teamsListMembersLegacy: {
            comment: string;
            doc: string;
        };
        teamsRemoveMemberLegacy: {
            comment: string;
            doc: string;
        };
        teamsGetMemberLegacy: {
            comment: string;
            doc: string;
        };
        teamsAddMemberLegacy: {
            comment: string;
            doc: string;
        };
        teamsRemoveMembershipForUserLegacy: {
            comment: string;
            doc: string;
        };
        teamsGetMembershipForUserLegacy: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateMembershipForUserLegacy: {
            comment: string;
            doc: string;
        };
        teamsListProjectsLegacy: {
            comment: string;
            doc: string;
        };
        teamsRemoveProjectLegacy: {
            comment: string;
            doc: string;
        };
        teamsCheckPermissionsForProjectLegacy: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateProjectPermissionsLegacy: {
            comment: string;
            doc: string;
        };
        teamsListReposLegacy: {
            comment: string;
            doc: string;
        };
        teamsRemoveRepoLegacy: {
            comment: string;
            doc: string;
        };
        teamsCheckPermissionsForRepoLegacy: {
            comment: string;
            doc: string;
        };
        teamsAddOrUpdateRepoPermissionsLegacy: {
            comment: string;
            doc: string;
        };
        teamsListChildLegacy: {
            comment: string;
            doc: string;
        };
        usersGetAuthenticated: {
            comment: string;
            doc: string;
        };
        usersUpdateAuthenticated: {
            comment: string;
            doc: string;
        };
        usersListBlockedByAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersUnblock: {
            comment: string;
            doc: string;
        };
        usersCheckBlocked: {
            comment: string;
            doc: string;
        };
        usersBlock: {
            comment: string;
            doc: string;
        };
        codespacesListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesCreateForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesListSecretsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesGetPublicKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesDeleteSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesGetSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesCreateOrUpdateSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesListRepositoriesForSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesSetRepositoriesForSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesRemoveRepositoryForSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesAddRepositoryForSecretForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesDeleteForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesGetForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesUpdateForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesExportForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesGetExportDetailsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesCodespaceMachinesForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesPublishForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesStartForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        codespacesStopForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersSetPrimaryEmailVisibilityForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersDeleteEmailForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListEmailsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersAddEmailForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListFollowersForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListFollowedByAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersUnfollow: {
            comment: string;
            doc: string;
        };
        usersCheckPersonIsFollowedByAuthenticated: {
            comment: string;
            doc: string;
        };
        usersFollow: {
            comment: string;
            doc: string;
        };
        usersListGpgKeysForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersCreateGpgKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersDeleteGpgKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersGetGpgKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsListInstallationsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsListInstallationReposForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsRemoveRepoFromInstallationForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsAddRepoToInstallationForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        interactionsRemoveRestrictionsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        interactionsGetRestrictionsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        interactionsSetRestrictionsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        issuesListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListPublicSshKeysForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersCreatePublicSshKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersDeletePublicSshKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersGetPublicSshKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsListSubscriptionsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        appsListSubscriptionsForAuthenticatedUserStubbed: {
            comment: string;
            doc: string;
        };
        orgsListMembershipsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        orgsGetMembershipForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        orgsUpdateMembershipForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsStartForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsGetStatusForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsDeleteArchiveForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsGetArchiveForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsUnlockRepoForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        migrationsListReposForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        orgsListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesListPackagesForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesGetPackageForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageVersionForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesGetPackageVersionForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageVersionForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        projectsCreateForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListPublicEmailsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposCreateForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposListInvitationsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposDeclineInvitationForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        reposAcceptInvitationForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersListSshSigningKeysForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersCreateSshSigningKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersDeleteSshSigningKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersGetSshSigningKeyForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityListReposStarredByAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityUnstarRepoForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityCheckRepoIsStarredByAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityStarRepoForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityListWatchedReposForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        teamsListForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        usersList: {
            comment: string;
            doc: string;
        };
        usersGetByUsername: {
            comment: string;
            doc: string;
        };
        activityListEventsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityListOrgEventsForAuthenticatedUser: {
            comment: string;
            doc: string;
        };
        activityListPublicEventsForUser: {
            comment: string;
            doc: string;
        };
        usersListFollowersForUser: {
            comment: string;
            doc: string;
        };
        usersListFollowingForUser: {
            comment: string;
            doc: string;
        };
        usersCheckFollowingForUser: {
            comment: string;
            doc: string;
        };
        gistsListForUser: {
            comment: string;
            doc: string;
        };
        usersListGpgKeysForUser: {
            comment: string;
            doc: string;
        };
        usersGetContextForUser: {
            comment: string;
            doc: string;
        };
        appsGetUserInstallation: {
            comment: string;
            doc: string;
        };
        usersListPublicKeysForUser: {
            comment: string;
            doc: string;
        };
        orgsListForUser: {
            comment: string;
            doc: string;
        };
        packagesListPackagesForUser: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageForUser: {
            comment: string;
            doc: string;
        };
        packagesGetPackageForUser: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageForUser: {
            comment: string;
            doc: string;
        };
        packagesGetAllPackageVersionsForPackageOwnedByUser: {
            comment: string;
            doc: string;
        };
        packagesDeletePackageVersionForUser: {
            comment: string;
            doc: string;
        };
        packagesGetPackageVersionForUser: {
            comment: string;
            doc: string;
        };
        packagesRestorePackageVersionForUser: {
            comment: string;
            doc: string;
        };
        projectsListForUser: {
            comment: string;
            doc: string;
        };
        activityListReceivedEventsForUser: {
            comment: string;
            doc: string;
        };
        activityListReceivedPublicEventsForUser: {
            comment: string;
            doc: string;
        };
        reposListForUser: {
            comment: string;
            doc: string;
        };
        billingGetGithubActionsBillingUser: {
            comment: string;
            doc: string;
        };
        billingGetGithubPackagesBillingUser: {
            comment: string;
            doc: string;
        };
        billingGetSharedStorageBillingUser: {
            comment: string;
            doc: string;
        };
        usersListSshSigningKeysForUser: {
            comment: string;
            doc: string;
        };
        activityListReposStarredByUser: {
            comment: string;
            doc: string;
        };
        activityListReposWatchedByUser: {
            comment: string;
            doc: string;
        };
        metaGetAllVersions: {
            comment: string;
            doc: string;
        };
        metaGetZen: {
            comment: string;
            doc: string;
        };
    };
    protected get baseClient(): typeof integrationClient;
    getApiClient: () => Promise<typeof integrationClient>;
}
//# sourceMappingURL=toolset.d.ts.map