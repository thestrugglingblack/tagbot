```                                                                                                                                                              
    ,o888888o.        ,o888888o.     b.             8 8888888 8888888888 8 888888888o.    8 8888 8 888888888o   8 8888      88 8888888 8888888888 8 8888888888   
   8888     `88.   . 8888     `88.   888o.          8       8 8888       8 8888    `88.   8 8888 8 8888    `88. 8 8888      88       8 8888       8 8888         
,8 8888       `8. ,8 8888       `8b  Y88888o.       8       8 8888       8 8888     `88   8 8888 8 8888     `88 8 8888      88       8 8888       8 8888         
88 8888           88 8888        `8b .`Y888888o.    8       8 8888       8 8888     ,88   8 8888 8 8888     ,88 8 8888      88       8 8888       8 8888         
88 8888           88 8888         88 8o. `Y888888o. 8       8 8888       8 8888.   ,88'   8 8888 8 8888.   ,88' 8 8888      88       8 8888       8 888888888888 
88 8888           88 8888         88 8`Y8o. `Y88888o8       8 8888       8 888888888P'    8 8888 8 8888888888   8 8888      88       8 8888       8 8888         
88 8888           88 8888        ,8P 8   `Y8o. `Y8888       8 8888       8 8888`8b        8 8888 8 8888    `88. 8 8888      88       8 8888       8 8888         
`8 8888       .8' `8 8888       ,8P  8      `Y8o. `Y8       8 8888       8 8888 `8b.      8 8888 8 8888      88 ` 8888     ,8P       8 8888       8 8888         
   8888     ,88'   ` 8888     ,88'   8         `Y8o.`       8 8888       8 8888   `8b.    8 8888 8 8888    ,88'   8888   ,d8P        8 8888       8 8888         
    `8888888P'        `8888888P'     8            `Yo       8 8888       8 8888     `88.  8 8888 8 888888888P      `Y88888P'         8 8888       8 888888888888 
```

# Table of Contents
* [Project Overview](#project-overview)
* [Team Members](#team-members)
* [Learn & Listen](#learn-&-listen)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Contribution Workflow](#contribution-workflow)
* [Community](#community)

Welcome to our contribution guidelines for TagBot. In this document you will find all the information needed to help contribute to TagBot.

## Project Overview
TagBot is Discord Bot that help store player's gamer tag information for tournaments. This project uses the following technologies:

* Website: React.js + Next.js
* Bot: Python
* Database: Redis and Couchbase
* Version Control Management: Git
* CI/CD: GitHub Actions
* Cloud: Azure
* Other Tools: Docker

## Team Members
* Zuri Hunter

## Learn & Listen

* Mailing list: 
* IRC channel:  
* Blog:         
* Anything else:  

## Getting Started

To get started with TagBot for local development:
### Prerequisites
* **Python 3.9**
* **Docker**
* **Redis**
* **Couchbase**

### Setup Bot
1. Setup virtual environment.
```bash
python -m venv .venv
```
2. Activate virtual environment.
```bash
source .venv/bin/activate

# On Windows:
source .venv/Scripts/activate
```
3. Install bot dependencies
```bash
pip install -r requirements.txt
```
4. Copy environment template and configure.
```bash
DISCORD_TOKEN=your_discord_bot_token_here
REDIS_HOST=localhost
REDIS_PORT=6379
COUCHBASE_HOST=localhost
COUCHBASE_USERNAME=Administrator
COUCHBASE_PASSWORD=password
```
5. Run databases via Docker
```bash
docker compose up -d
```
6. Start bot.
```
python run.py
```


## Project Structure
* **`/bot`**: Contains the core Discord bot functionality and command implementations
* **`/db`**: Database layer with Redis and Couchbase interaction modules
* **`/site`**: TagBot website source code and assets (hosted at tagbot.gg)
* **`/terraform`**: Infrastructure as Code for deploying TagBot's cloud architecture
* **`/test`**: Comprehensive test suites for database, utilities, and bot components
* **`/utils`**: Shared utility functions and helper scripts for bot operations

## Contribution Workflow

### 1. Select a Bug Report or Task
Take a bug report that is already documented in the project or if you came across a bug, fill out a [bug report](.github/ISSUE_TEMPLATE/BUG_REPORT.md) before working on it.

Keep in mind when filling out a bug report run through these series of questions:
  * Is the bug reproducible as explained?   
  * Is it reproducible in other environments (for instance, on different browsers or devices)?   
  * Are the steps to reproduce the bug clear? If not, can you describe how you might reproduce it?  
  * What tags should the bug have?  
  * Is this bug something you have run into? Would you appreciate it being looked into faster?  

### 2. Branch Naming
Use descriptive branch names following this format: `type/description`

**Branch Types:**
* `feature/` - New features or functionality
* `bugfix/` - Bug fixes and corrections  
* `chore/` - Maintenance tasks and updates
* `docs/` - Documentation changes
* `test/` - Adding or updating tests

**Naming Format:**
* `feature/issue-123_startgg-integration`
* `bugfix/issue-456_discord-rate-limit`
* `chore/update-dependencies`
* `docs/update-readme`

**Guidelines:**
- Use lowercase with hyphens between words
- Include issue number when applicable
- Keep descriptions brief but descriptive
- Avoid special characters or spaces

### 3. Commit Messages
Write clear and concise commit messages using this format: `type: brief description`

**Commit Types:**
* `feat:` - New features or functionality
* `fix:` - Bug fixes and corrections
* `chore:` - Maintenance tasks (dependencies, configs, etc.)
* `docs:` - Documentation updates
* `test:` - Adding or updating tests
* `refactor:` - Code improvements without changing functionality

**Examples:**
* `feat: add tournament bracket generation`
* `fix: resolve Discord API rate limiting issue`
* `chore: update Python dependencies to latest versions`
* `docs: update installation instructions in README`

### 4. Pull Requests
Follow these steps when submitting a pull request:

**Before Submitting:**
- Fill out the [pull request template](../.github/pull_request_template.md) completely
- Ensure all tests pass locally
- Verify your code follows the project's coding standards
- Include relevant issue numbers in your PR description

**PR Guidelines:**
- Use a descriptive title that summarizes your changes
- Provide clear descriptions of what was changed and why
- Include screenshots for UI changes
- Reference related issues using `#issue-number`
- Keep PRs focused on a single feature or fix

**Review Process:**
- Zuri Hunter will review all pull requests
- Address any feedback or requested changes promptly
- PRs require approval before merging
- Expect initial feedback within 2-3 business days

### 5. Code Quality
Maintain high code standards by following these guidelines:

**Coding Standards:**
- Follow JavaScript/TypeScript best practices for clean, readable code
- Use React.js conventions for component structure and state management
- Follow Python PEP 8 standards for bot development
- Maintain consistent naming conventions across all files

**Code Formatting:**
- Use ESLint for JavaScript/TypeScript linting
- Use Prettier for automatic code formatting
- Configure your IDE to format on save
- Run `npm run lint` before committing changes

**Testing Requirements:**
- Write unit tests for new features and bug fixes
- Ensure all existing tests pass before submitting PR
- Aim for meaningful test coverage on critical functionality
- Use Jest for JavaScript testing and pytest for Python testing

**Pre-commit Checklist:**
- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] No linting errors or warnings
- [ ] Code is properly documented with comments

### 6. Documentation
Keep documentation current and comprehensive:

**Required Updates:**
- Update `README.md` for new features or installation changes
- Add inline code comments for complex logic.

**Documentation Standards:**
- Use clear, concise language
- Include code examples where helpful
- Update relevant sections in `/docs` folder
- Ensure accuracy of all links and references

**What to Document:**
- New features and their usage
- Configuration changes
- Breaking changes or migrations
- Environment setup requirements


## Community 
Do you really love this project but not entirely a developer? Here are some other ways you can help out:

### Support & Help
* **Answer user questions**: Help respond to questions in Discord that have TagBot
* **Provide user feedback**: Test new features and report your experience to help improve usability

### Design & Content
* **Website design**: Help improve the tagbot.gg website with UI/UX suggestions, mockups, or design assets
* **Video content**: Record demonstration videos showing TagBot features for tournaments

### Writing & Communication
* **Blog posts**: Write articles about TagBot's impact on tournament organization or esports communities
* **Case studies**: Document real tournament experiences using TagBot
* **Social media**: Help spread awareness by sharing TagBot updates and success stories
* **Newsletter content**: Contribute to community newsletters with tips, feature highlights, or user spotlights

### Community Building
* **Real-world examples**: Organize tournaments using TagBot and share your setup process
* **Success stories**: Document how TagBot has improved your tournament experience
* **User showcases**: Feature other tournament organizers who use TagBot effectively

### Feedback & Testing
* **Beta testing**: Try new features before release and provide detailed feedback
* **Feature requests**: Suggest improvements based on your tournament organizing experience
* **Bug reporting**: Help identify issues in a non-technical way through detailed user reports
