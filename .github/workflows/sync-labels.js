const { Octokit } = require("@octokit/rest");
const github = require("@actions/github");

(async () => {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });

    const { context } = github;
    const prNumber = context.payload.pull_request.number;
    const repoOwner = context.repo.owner;
    const repoName = context.repo.repo;

    const prBody = context.payload.pull_request.body || "";
    const issueNumbers = [...prBody.matchAll(/#(\d+)/g)].map(match => match[1]);

    if (issueNumbers.length === 0) {
      console.log("No linked issues found in the PR body.");
      return;
    }

    let issueLabels = [];
    for (const issueNumber of issueNumbers) {
      try {
        const issue = await octokit.issues.get({
          owner: repoOwner,
          repo: repoName,
          issue_number: issueNumber,
        });
        issueLabels = issueLabels.concat(issue.data.labels.map(label => label.name));
      } catch (error) {
        console.error(`Error fetching issue #${issueNumber}:`, error.message);
      }
    }

    issueLabels = [...new Set(issueLabels)]; // Remove duplicates

    if (issueLabels.length === 0) {
      console.log("No labels to sync.");
      return;
    }

    await octokit.issues.addLabels({
      owner: repoOwner,
      repo: repoName,
      issue_number: prNumber,
      labels: issueLabels,
    });
    console.log(`Labels synced to PR #${prNumber}:`, issueLabels);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
