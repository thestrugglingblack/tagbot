export const formatFeatureRequestIssue = (featureData: any) => {
  const categoryChecked = {
    enhancement: featureData.category === 'enhancement' ? '[x]' : '[ ]',
    tournament: featureData.category === 'tournament' ? '[x]' : '[ ]',
    automation: featureData.category === 'automation' ? '[x]' : '[ ]',
    integration: featureData.category === 'integration' ? '[x]' : '[ ]',
    analytics: featureData.category === 'analytics' ? '[x]' : '[ ]',
    social: featureData.category === 'social' ? '[x]' : '[ ]',
    performance: featureData.category === 'performance' ? '[x]' : '[ ]',
  };

  const priorityChecked = {
    low: featureData.priority === 'low' ? '[x]' : '[ ]',
    medium: featureData.priority === 'medium' ? '[x]' : '[ ]',
    high: featureData.priority === 'high' ? '[x]' : '[ ]',
    critical: featureData.priority === 'critical' ? '[x]' : '[ ]',
  };

  const serverSizeChecked = {
    small: featureData.serverSize === 'small' ? '[x]' : '[ ]',
    medium: featureData.serverSize === 'medium' ? '[x]' : '[ ]',
    large: featureData.serverSize === 'large' ? '[x]' : '[ ]',
    huge: featureData.serverSize === 'huge' ? '[x]' : '[ ]',
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
# Feature Request 

Please fill out the following information when requesting new features for TagBot.

## Feature Category 
Select the category that best fits your request:
- ${categoryChecked.enhancement} UI/UX Enhancement
- ${categoryChecked.tournament} Tournament Management
- ${categoryChecked.automation} Automation Features
- ${categoryChecked.integration} Third-party Integration
- ${categoryChecked.analytics} Analytics & Reporting
- ${categoryChecked.social} Social Features
- ${categoryChecked.performance} Performance Improvement

## Priority Level 
Choose how important this feature is:
- ${priorityChecked.low} Low - Nice to have
- ${priorityChecked.medium} Medium - Would be helpful
- ${priorityChecked.high} High - Important feature
- ${priorityChecked.critical} Critical - Essential need

## Feature Title 
**Brief, descriptive title for your feature request:**
${featureData.featureTitle}

## Feature Description 
**Describe the feature you'd like to see. What should it do? How would it work?**
_(Maximum 500 characters)_

${featureData.description}

## Problem This Solves
**What problem or pain point would this feature address?**
_(Maximum 500 characters)_

${featureData.problemSolved || 'Not provided'}

## Expected Behavior
**Describe how you envision this feature working step by step:**
_(Maximum 500 characters)_

${featureData.expectedBehavior || 'Not provided'}

## Your Discord Tag
**Your Discord username (optional):**
${featureData.discordTag || 'Not provided'}

## Server Size
Select your server size:
- ${serverSizeChecked.small} Small (1-50 members)
- ${serverSizeChecked.medium} Medium (51-250 members)
- ${serverSizeChecked.large} Large (251-1000 members)
- ${serverSizeChecked.huge} Huge (1000+ members)

## Additional Context
**Any additional information, examples, or references that might help:**
_(Maximum 500 characters)_

${featureData.additionalContext || 'Not provided'}

---

**Submitted on:** ${featureData.timestamp}

## Development Process
Our feature development follows these steps:
1. **Review and analysis** - We evaluate feasibility and impact
2. **Community feedback** - Gather input from other users
3. **Development planning** - Create implementation roadmap
4. **Implementation** - Build and code the feature
5. **Testing and release** - Quality assurance and deployment

## Are You A Developer?
Check out the project on GitHub and contribute: [TagBot Repository](https://github.com/thestrugglingblack/tagbot)`;
};