# Git rules

## Repository layout

 * Main development branch is `develop`.

## Branches naming

 * Feature branches MUST have a name `feature/exmark-<issue ID>`.
 * Bugfix branches MUST have a name `bug/exmark-<issue ID>`.
 * Release branches MUST have a name `release/R<release No>`.

## Commit messages

 * *Every commit message* MUST have a prefix, of Kaiten issue ID, delimiter `[*] -`, application section,, delimiter ` : `, commit description  (`exmark-<issue ID>[*] - <application section> : <commit description>`), if applicable. For example: `exmark_5108952[*] - Список пользователей : Добавлены раздел и пункт меню, настроен роутинг`

## Commit rules

 * NO DIRECT PUSHES TO BRANCHES YOU DID NOT CREATE!
 * Merge requests from feature branches MUST be against development branch.
 * Merge requests from bugfix branches SHOULD be against respective release branch.
 * Merge requests into main release branch MUST be from release branches only.
