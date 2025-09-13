# 🤝 Contributing to Benchwarmers OSS

Thank you for your interest in contributing to Benchwarmers OSS! 🎉

We welcome contributions from developers of all skill levels. Whether you're fixing bugs, adding features, improving documentation, or helping with testing, your contributions are valuable to us.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## 📜 Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to [your-email@example.com].

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.17 or later
- **Package Manager**: Bun (recommended), npm, yarn, or pnpm
- **Git**: For version control

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/benchwarmers-oss.git
   cd benchwarmers-oss
   ```

3. **Install dependencies**:
   ```bash
   bun install  # Recommended
   # or npm install
   ```

4. **Start development server**:
   ```bash
   bun run dev
   ```

5. **Open** [http://localhost:3001](http://localhost:3001)

## 🔄 Development Workflow

### 1. Choose an Issue

- Check [existing issues](https://github.com/your-username/benchwarmers-oss/issues) for something to work on
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Changes

- Write clear, concise commit messages
- Follow our [coding standards](#coding-standards)
- Test your changes thoroughly
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linter
bun run lint

# Format code
bun run format

# Build for production
bun run build

# Test the build locally
bun run start
```

### 5. Submit a Pull Request

- Push your branch to your fork
- Create a Pull Request with a clear title and description
- Reference any related issues
- Wait for review and address feedback

## 📁 Project Structure

```
benchwarmers-oss/
├── app/                    # Next.js App Router pages
│   ├── gm-mode/           # GM Mode feature
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── gm-mode/          # GM Mode specific components
│   ├── ui/               # Shadcn/ui components
│   └── tw-ui/            # Custom UI components
├── lib/                   # Utilities and data
│   ├── mock-players.ts   # Player data
│   ├── teams.ts          # NHL teams data
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── public/                # Static assets
├── .github/              # GitHub configuration
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   └── workflows/        # GitHub Actions
├── biome.json           # Biome configuration
└── tailwind.config.js   # Tailwind configuration
```

## 💻 Coding Standards

### TypeScript

- **Strict typing**: Use TypeScript for all new code
- **Interface over type**: Prefer interfaces for object types
- **No any**: Avoid `any` type - use proper typing
- **Descriptive names**: Use clear, descriptive variable and function names

```typescript
// ✅ Good
interface PlayerCardData {
  id: string;
  name: string;
  position: Position;
  jersey: number;
}

// ❌ Avoid
type PlayerData = any;
```

### React

- **Functional components**: Use functional components with hooks
- **Custom hooks**: Extract reusable logic into custom hooks
- **Props interface**: Define props interfaces for all components

```typescript
// ✅ Good
interface PlayerCardProps {
  player: PlayerCardData;
  onClick?: () => void;
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  // Component logic
}
```

### Styling

- **Tailwind CSS**: Use utility classes for styling
- **Component classes**: Group related styles in components
- **Responsive design**: Use Tailwind's responsive prefixes
- **CSS variables**: Use CSS custom properties for theming

```typescript
// ✅ Good
<div className="flex items-center justify-between p-4 md:p-6">
  <h2 className="text-lg font-semibold text-foreground">Title</h2>
</div>
```

### File Organization

- **One component per file**: Each component in its own file
- **Index files**: Use index files for clean imports
- **Consistent naming**: Use kebab-case for file names

```
components/
├── player-card.tsx        # ✅ Good
├── player-card/
│   ├── index.tsx         # ✅ Good
│   ├── player-card.tsx
│   └── types.ts
```

## 🧪 Testing

### Manual Testing

1. **Functionality**: Test all user interactions
2. **Edge cases**: Test with empty data, error states
3. **Responsive**: Test on different screen sizes
4. **Performance**: Check for smooth interactions

### Code Quality

```bash
# Run all checks
bun run lint
bun run format
bun run build
```

### Browser Testing

- **Chrome/Edge**: Primary development browsers
- **Firefox**: Cross-browser compatibility
- **Safari**: macOS testing
- **Mobile**: iOS Safari, Chrome Mobile

## 📝 Submitting Changes

### Commit Guidelines

- **Clear messages**: Write descriptive commit messages
- **Atomic commits**: One logical change per commit
- **Reference issues**: Include issue numbers when relevant

```bash
# ✅ Good commit messages
git commit -m "feat: add drag-and-drop for player cards"
git commit -m "fix: resolve placeholder display issue #42"
git commit -m "docs: update API documentation"

# ❌ Avoid
git commit -m "fix bug"
git commit -m "update"
```

### Pull Request Process

1. **Create PR**: Use our PR template
2. **Description**: Explain what and why
3. **Screenshots**: Include before/after screenshots for UI changes
4. **Testing**: Describe how you tested the changes
5. **Breaking changes**: Note any breaking changes

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Manual testing
- [ ] Unit tests
- [ ] Integration tests

## Screenshots (if applicable)
<!-- Add screenshots to show the changes -->

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Expected behavior**: What should happen
2. **Actual behavior**: What actually happens
3. **Steps to reproduce**: Step-by-step instructions
4. **Environment**: Browser, OS, Node version
5. **Screenshots**: If applicable
6. **Console errors**: Any JavaScript errors

### Feature Requests

For feature requests, please include:

1. **Problem**: What's the problem you're trying to solve
2. **Solution**: Describe your proposed solution
3. **Alternatives**: Any alternative solutions considered
4. **Use case**: How would this feature be used

## 🌐 Community

### Communication

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Pull Requests**: For code contributions

### Recognition

Contributors are recognized in:
- **README.md**: Project contributors
- **GitHub**: Contribution graph and insights
- **Release notes**: For significant contributions

## 📞 Getting Help

If you need help:

1. **Check existing issues**: Search for similar problems
2. **Read documentation**: Check README and contributing guide
3. **Ask questions**: Use GitHub Discussions for questions
4. **Community support**: Reach out to other contributors

## 🎯 Areas for Contribution

### High Priority
- **Bug fixes**: Address existing issues
- **Documentation**: Improve setup and usage docs
- **Accessibility**: Improve a11y compliance
- **Performance**: Optimize bundle size and runtime performance

### Medium Priority
- **New features**: Add NHL teams and player data
- **UI improvements**: Enhance visual design and UX
- **Testing**: Add comprehensive test coverage
- **Internationalization**: Add support for multiple languages

### Future Enhancements
- **Real-time data**: Integrate with NHL APIs
- **Advanced analytics**: Player statistics and performance metrics
- **Social features**: Share lineups, compete with friends
- **Mobile app**: React Native implementation

---

Thank you for contributing to Benchwarmers OSS! Your efforts help make this project better for everyone. 🏒✨
