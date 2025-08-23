import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'thestrugglingblack';
const REPO_NAME = 'tagbot';

export const createGitHubIssue = async (title: string, body: string, labels: string[]) => {
  try {
    const response = await octokit.rest.issues.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title,
      body,
      labels,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    throw error;
  }
};

export const formatBugReportIssue = (bugData: any) => {
  const reportTypeChecked = {
    bug: bugData.reportType === 'bug' ? '[x]' : '[ ]',
    crash: bugData.reportType === 'crash' ? '[x]' : '[ ]',
    performance: bugData.reportType === 'performance' ? '[x]' : '[ ]',
    command: bugData.reportType === 'command' ? '[x]' : '[ ]',
    data: bugData.reportType === 'data' ? '[x]' : '[ ]',
  };

  const severityChecked = {
    low: bugData.severity === 'low' ? '[x]' : '[ ]',
    medium: bugData.severity === 'medium' ? '[x]' : '[ ]',
    high: bugData.severity === 'high' ? '[x]' : '[ ]',
    critical: bugData.severity === 'critical' ? '[x]' : '[ ]',
  };

  return `\`\`\`
      _=====_                               _=====_
     / _____ \\                             / _____ \\
   +.-'_____'-.---------------------------.-'_____'-.+
  /   |     |  '.        S O N Y        .'  |  _  |   \\
 / ___| /|\\ |___ \\                     / ___| /_\\ |___ \\
/ |      |      | ;  __           _   ; | _         _ | ;
| | <---   ---> | | |__|         |_:> | ||_|       (_)| |
| |___   |   ___| ;SELECT       START ; |___       ___| ;
|\\    | \\|/ |    /  _     ___      _   \\    | (X) |    /|
| \\   |_____|  .','" "', |___|  ,'" "', '.  |_____|  .' |
|  '-.______.-' /       \\ANALOG/       \\  '-._____.-'   |
|               |       |------|       |                |
|              /\\       /      \\       /\\               |
|             /  '.___.'        '.___.'  \\              |
|            /                            \\             |
 \\          /                              \\           /
  \\________/                                \\_________/
\`\`\`

# Bug Report

Please fill out the following information when reporting bugs for TagBot.

## Report Type 
Select the type of issue you're experiencing:
- ${reportTypeChecked.bug} Bug Report
- ${reportTypeChecked.crash} Bot Crash
- ${reportTypeChecked.performance} Performance Issue
- ${reportTypeChecked.command} Command Not Working
- ${reportTypeChecked.data} Data Loss/Corruption

## Severity Level 
Choose the severity of this issue:
- ${severityChecked.low} Low - Minor inconvenience
- ${severityChecked.medium} Medium - Affects functionality
- ${severityChecked.high} High - Major feature broken
- ${severityChecked.critical} Critical - Bot unusable

## Bug Title 
**Brief description of the bug:**
${bugData.bugTitle}

## Detailed Description 
**Describe what happened, what you expected to happen, and any error messages you received:**
_(Maximum 500 characters)_

${bugData.description}

## Steps to Reproduce
**How can we reproduce this issue:**
${bugData.stepsToReproduce || 'Not provided'}

## Discord Server ID
**Your Discord server ID (optional):**
${bugData.serverId || 'Not provided'}

## Your Discord Tag
**Your Discord username (optional):**
${bugData.discordTag || 'Not provided'}

## Additional Information
**Any other relevant information, screenshots descriptions, or context:**
_(Maximum 500 characters)_

${bugData.additionalInfo || 'Not provided'}

---

**Reported on:** ${bugData.timestamp}

## Before Reporting
- [x] Check if the issue is already reported
- [x] Verify bot permissions in your server

## Response Time Expectations
- **Critical Issues:** 24 hours
- **High Priority:** 2-3 days
- **Medium Priority:** 1 week
- **Low Priority:** 2 weeks

## Need Immediate Help?
For urgent issues, contact us on Twitter: [@ZuriHunter](https://www.x.com/ZuriHunter)`;
};