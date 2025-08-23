import { NextRequest, NextResponse } from 'next/server';
import { createGitHubIssue, formatBugReportIssue } from '../../../utils/github';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const bugData = {
      reportType: formData.get('report_type'),
      severity: formData.get('severity'),
      bugTitle: formData.get('bug_title'),
      description: formData.get('description'),
      stepsToReproduce: formData.get('steps_to_reproduce'),
      serverId: formData.get('server_id'),
      discordTag: formData.get('discord_tag'),
      additionalInfo: formData.get('additional_info'),
      timestamp: new Date().toISOString(),
    };

    const issueBody = formatBugReportIssue(bugData);
    const labels = ['bug', `severity-${bugData.severity}`, `type-${bugData.reportType}`];

    await createGitHubIssue(
      `[Bug] ${bugData.bugTitle}`,
      issueBody,
      labels
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing bug report:', error);
    return NextResponse.json({ error: 'Failed to submit bug report' }, { status: 500 });
  }
}