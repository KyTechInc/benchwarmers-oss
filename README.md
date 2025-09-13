# 🏒 Benchwarmers OSS

**A comprehensive NHL analytics platform for fans, built with modern web technologies. Deep dive into player statistics, salary data, contract details, and interactive team management tools.**

![NHL Analytics](https://img.shields.io/badge/NHL-Analytics-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

Benchwarmers OSS is your ultimate NHL companion app, designed specifically for passionate hockey fans who want to dive deep into the numbers, contracts, and strategies that make the NHL fascinating. From detailed player statistics and salary breakdowns to interactive team management and game analysis, get the insights you need to understand the business and beauty of professional hockey.

### ✨ Key Features

- **📊 Player Analytics**: Comprehensive statistics, salary data, and contract information
- **💰 Salary & Contract Database**: Complete NHL salary cap management and contract details
- **🏒 Interactive GM Mode**: Drag-and-drop lineup editor for strategic team building
- **📈 Team Statistics**: Detailed team performance metrics and analytics
- **🎯 Game Analysis**: Box scores, player performance tracking, and game insights
- **📱 Modern Interface**: Beautiful, responsive design built for the modern web

## 🚀 Features

### 📊 Player & Team Analytics
- **Comprehensive Player Profiles**: Detailed statistics, bio information, and performance metrics
- **Salary & Contract Analysis**: Complete salary cap breakdowns and contract structures
- **Team Performance Tracking**: Advanced analytics for team and individual performance
- **Historical Data**: Season-by-season statistics and contract history
- **Player Comparisons**: Side-by-side statistical comparisons and analysis tools

### 💰 Salary Cap Management
- **Real-time Cap Tracking**: Current NHL salary cap status and projections
- **Contract Analysis**: Detailed breakdown of player contracts and term structures
- **Cap Space Calculations**: Available cap space and future year projections
- **Trade Impact Analysis**: How trades affect salary cap and team structure
- **RFA/UFA Tracking**: Restricted and unrestricted free agent status and values

### 🏒 Interactive GM Mode
- **Strategic Lineup Builder**: Drag-and-drop interface for creating optimal line combinations
- **Cross-position Flexibility**: Move players between positions regardless of their primary role
- **Automatic Roster Management**: Smart placeholder system for maintaining proper lineup structure
- **Real-time Line Optimization**: Instant feedback on lineup chemistry and performance
- **Scenario Planning**: Test different roster configurations and strategies

### 📈 Game & Statistical Analysis
- **Live Game Tracking**: Real-time game statistics and player performance
- **Advanced Box Scores**: Detailed game-by-game statistical breakdowns
- **Performance Analytics**: Individual and team performance metrics across seasons
- **Trend Analysis**: Statistical trends and performance patterns over time
- **Custom Reports**: Generate personalized statistical reports and insights

### 🎮 User Experience
- **Modern Interface Design**: Clean, intuitive design built for the modern web
- **Responsive Layout**: Seamless experience across desktop, tablet, and mobile
- **Interactive Data Visualization**: Charts, graphs, and visual representations of complex data
- **Real-time Updates**: Live data updates for games, statistics, and roster changes
- **Accessibility First**: Built with accessibility standards and inclusive design principles

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Shadcn/ui](https://ui.shadcn.com/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **State Management**: React hooks with local state
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Biome](https://biomejs.dev/) (fast, modern linter/formatter)
- **Package Manager**: [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm

## 📁 Project Structure

```
benchwarmers-oss/
├── app/                    # Next.js App Router
│   ├── gm-mode/           # Interactive lineup editor
│   ├── boxscores/         # Game results and analysis
│   ├── stats/             # Player and team statistics
│   │   └── players/       # Individual player stats
│   ├── teams/             # Team-specific pages
│   │   └── [team_code]/   # Dynamic team routes
│   ├── globals.css        # Global styles and themes
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Homepage dashboard
├── components/            # Reusable UI components
│   ├── gm-mode/          # GM Mode specific components
│   ├── boxscores/        # Game analysis components
│   ├── data-grid/        # Data table and grid components
│   ├── player-list/      # Player listing components
│   ├── sortable/         # Drag-and-drop utilities
│   ├── ui/               # Shadcn/ui component library
│   └── tw-ui/            # Custom Tailwind components
├── lib/                   # Core business logic and data
│   ├── mock-players.ts   # NHL player data and contracts
│   ├── teams.ts          # NHL teams configuration
│   └── utils.ts          # Helper functions and utilities
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts     # Responsive design hooks
├── public/                # Static assets and media
└── biome.json           # Code linting and formatting config
```

## 🏁 Quick Start

### Prerequisites

- **Node.js**: 20+ or later
- **Package Manager**: Bun (recommended), npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KyTechInc/benchwarmers-oss.git
   cd benchwarmers-oss
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install

   # Or using pnpm
   pnpm install
   ```

3. **Run the development server**
   ```bash
   # Using Bun
   bun run dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev

   # Or using pnpm
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 Usage

### Getting Started
1. **Homepage Dashboard**: Start at the main dashboard to see featured content and quick stats
2. **Navigate Features**: Use the navigation to explore different sections of the app

### Core Features

#### 🏒 Interactive GM Mode
1. **Access GM Mode**: Navigate to `/gm-mode` or click "GM Mode" in navigation
2. **Select Your Team**: Choose from available NHL teams (Toronto Maple Leafs currently implemented)
3. **Strategic Lineup Building**:
   - **Drag & Drop**: Move players between any positions
   - **Press Box**: Manage bench players and substitutions
   - **Auto-Placeholders**: Visual cues for empty roster spots
   - **Flexible Positioning**: Move players regardless of their primary position

#### 📊 Player Statistics & Analytics
1. **Player Stats**: Visit `/stats/players` for comprehensive player statistics
2. **Data Tables**: Sortable tables with advanced filtering and search
3. **Performance Metrics**: Detailed breakdowns of goals, assists, points, and more

#### 📈 Team Analysis
1. **Team Pages**: Visit `/teams/[team_code]` for team-specific information
2. **Roster Overview**: Complete team rosters with salary information
3. **Performance Tracking**: Team statistics and season performance

#### 🎯 Game Analysis
1. **Box Scores**: Visit `/boxscores` for game results and analysis
2. **Live Updates**: Real-time game statistics and player performance
3. **Match Analysis**: Detailed breakdowns of individual games

## 🏗️ Architecture

### Platform Overview

Benchwarmers OSS is built as a modular, scalable platform with clear separation of concerns:

- **📊 Data Layer**: Centralized NHL data management and API integration
- **🎨 Presentation Layer**: Modern React components with consistent design system
- **🔄 State Management**: Efficient local state management with React hooks
- **📱 Responsive Design**: Mobile-first approach with progressive enhancement

### Core Components

#### Interactive Features
- **GM Mode (`LineupEditor`)**: Strategic lineup builder with drag-and-drop
- **Data Tables**: Advanced sorting, filtering, and pagination for statistics
- **Visualization Components**: Charts and graphs for performance analytics

#### Data Management
- **Player Profiles**: Comprehensive player data with statistics and contracts
- **Team Analytics**: Team performance tracking and roster management
- **Game Tracking**: Real-time and historical game data processing

#### UI System
- **Component Library**: Consistent design system built on Radix UI and Tailwind
- **Responsive Layouts**: Adaptive interfaces for all device sizes
- **Accessibility**: WCAG compliant components and interactions

### Data Architecture

#### NHL Data Integration
- **Player Statistics**: Comprehensive performance metrics and historical data
- **Contract Database**: Salary information, contract terms, and cap management
- **Team Data**: Roster information, performance statistics, and analytics
- **Game Results**: Live and historical game data with detailed breakdowns

#### Data Processing Pipeline
1. **Data Ingestion**: NHL API integration and data normalization
2. **Processing Layer**: Statistical calculations and performance analytics
3. **Presentation Layer**: Formatted data display and interactive visualizations
4. **Caching Strategy**: Efficient data caching for optimal performance

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? [Open an issue](https://github.com/KyTechInc/benchwarmers-oss/issues/new?template=bug_report.md)
- ✨ **Feature Requests**: Have an idea? [Open an issue](https://github.com/KyTechInc/benchwarmers-oss/issues/new?template=feature_request.md)
- 💻 **Code Contributions**: See our [Contributing Guide](./CONTRIBUTING.md)
- 📚 **Documentation**: Help improve documentation
- 🧪 **Testing**: Add tests or help with QA

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run the linter**: `bun run lint`
5. **Format code**: `bun run format`
6. **Test your changes**: `bun run dev`
7. **Commit your changes**: `git commit -m 'Add amazing feature'`
8. **Push to the branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict typing required
- **Linting**: All code must pass Biome checks
- **Formatting**: Code must be formatted with Biome
- **Testing**: Include tests for new features
- **Documentation**: Update docs for significant changes

## 📋 Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Run Biome linter
bun run format       # Format code with Biome

# Deployment
bun run build        # Create production build
```

## 🗺️ Roadmap

### Phase 1: Core Platform (Current)
- ✅ **GM Mode**: Interactive lineup editor with drag-and-drop
- ✅ **Player Statistics**: Basic player data and performance metrics
- ✅ **Team Pages**: Team-specific information and rosters
- ✅ **Box Scores**: Game results and basic analysis

### Phase 2: Enhanced Analytics (Q1 2025)
- 🔄 **Advanced Statistics**: Deep statistical analysis and trends
- 🔄 **Salary Cap Tools**: Interactive cap management and projections
- 🔄 **Player Comparisons**: Side-by-side statistical analysis
- 🔄 **Contract Analysis**: Detailed contract breakdowns and analysis

### Phase 3: Real-time Features (Q2 2025)
- 📅 **Live Game Updates**: Real-time game statistics and tracking
- 📅 **Push Notifications**: Game alerts and important updates
- 📅 **Interactive Charts**: Advanced data visualizations
- 📅 **Performance Dashboards**: Custom analytics dashboards

### Phase 4: Community Features (Q3 2025)
- 👥 **User Accounts**: Personalized dashboards and preferences
- 👥 **Fantasy Tools**: Integration with fantasy hockey platforms
- 👥 **Social Features**: Share lineups and analysis with community
- 👥 **API Access**: Public API for third-party integrations

### Long-term Vision
- 🤖 **AI-Powered Insights**: Machine learning for performance predictions
- 📊 **Advanced Analytics**: Predictive modeling and trend analysis
- 🌐 **Multi-league Support**: Expansion beyond NHL
- 📱 **Mobile App**: Native mobile applications

## 🎨 Customization

### Adding New Teams

1. **Update Team Configuration**:
   ```typescript
   // lib/teams.ts
   export const teams: Team[] = [
     // Add new team data
   ];
   ```

2. **Add Player Data**:
   ```typescript
   // lib/mock-players.ts
   export const TEAM_ROSTER_DATA: PlayerData[] = [
     // Add team-specific player data
   ];
   ```

3. **Update Roster Logic**: Modify roster generation in GM Mode components

### Integrating Real NHL Data

#### API Integration Setup
1. **Choose Data Provider**: NHL API, SportsData.io, or custom data source
2. **Create API Client**: Add API integration in `lib/` directory
3. **Update Data Models**: Modify TypeScript interfaces to match API data
4. **Implement Caching**: Add data caching for performance

#### Data Processing Pipeline
1. **Data Ingestion**: Create API integration services
2. **Data Transformation**: Normalize API data to app format
3. **Error Handling**: Implement robust error handling and fallbacks
4. **Data Validation**: Add data validation and type checking

### Styling and Theming

The app uses a modern design system built on Tailwind CSS:

#### Key Files
- `app/globals.css` - Global styles, CSS variables, and theme configuration
- `components/ui/` - Component library with consistent styling
- `tailwind.config.js` - Tailwind configuration and custom utilities

#### Customization Options
- **Color Themes**: Modify CSS variables for custom color schemes
- **Typography**: Update font families and sizing scales
- **Spacing**: Adjust spacing scales and layout grids
- **Component Variants**: Extend component library with custom variants

### Performance Optimization

#### Current Optimizations
- **Next.js App Router**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component for optimal loading
- **Bundle Analysis**: Efficient dependency management with Bun

#### Advanced Optimizations
- **Data Caching**: Implement Redis or similar for API data caching
- **CDN Integration**: Static asset delivery optimization
- **Lazy Loading**: Dynamic imports for large components
- **Service Workers**: Offline functionality and caching

## 🐛 Troubleshooting

### Common Issues

**Drag and drop not working?**
- Ensure you're using a modern browser with drag-and-drop support
- Check browser console for any JavaScript errors
- Try refreshing the page

**Placeholders not appearing?**
- Check that the roster generation is working correctly
- Verify the MAX_* constants are set properly
- Look for console errors related to placeholder creation

**Styling issues?**
- Ensure Tailwind CSS is compiling correctly
- Check that all dependencies are installed
- Try clearing your browser cache

### Performance

- The app is optimized for modern browsers
- Drag-and-drop operations are smooth on most devices
- Consider browser compatibility for older devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### NHL Community
- **NHL Teams & Players**: For the inspiration and data that makes this platform possible
- **Hockey Analytics Community**: For the methodologies and insights that drive our features
- **Hockey Fans Worldwide**: For the passion that keeps the sport alive

### Technology Partners
- **Next.js Team**: For the incredible framework that powers modern web development
- **Vercel**: For hosting and deployment infrastructure
- **Open Source Community**: For the amazing tools, libraries, and frameworks
- **React & TypeScript Teams**: For the robust foundation of our tech stack

### Special Thanks
- **Data Providers**: For making NHL statistics and information accessible
- **Beta Testers**: For feedback and helping shape the user experience
- **Contributors**: For their time, expertise, and passion for the project

## 📞 Support & Community

### Getting Help
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/your-username/benchwarmers-oss/issues/new?template=bug_report.md)
- **✨ Feature Requests**: [GitHub Issues](https://github.com/your-username/benchwarmers-oss/issues/new?template=feature_request.md)
- **💬 General Discussion**: [GitHub Discussions](https://github.com/your-username/benchwarmers-oss/discussions)
- **📖 Documentation**: [Contributing Guide](./CONTRIBUTING.md)

### Community Guidelines
- Be respectful and constructive in all interactions
- Follow our [Code of Conduct](./CODE_OF_CONDUCT.md)
- Help fellow community members when possible
- Share your knowledge and experiences

## 🎉 Join the Community

### Ways to Participate
- **🏒 Contribute Code**: Help build new features and fix bugs
- **📊 Share Data**: Contribute NHL statistics and analysis
- **🎨 Design Input**: Help improve the user interface and experience
- **📝 Documentation**: Improve guides and help new users
- **🧪 Testing**: Help test new features and provide feedback

### Recognition
Contributors are celebrated through:
- **GitHub Contributor Insights**: Track your impact on the project
- **Release Notes**: Feature credits in changelog
- **Community Spotlights**: Featured contributor stories
- **Project Acknowledgments**: Recognition in documentation

---

## 🚀 Ready to Dive Deep?

**Benchwarmers OSS is your gateway to the sophisticated world of NHL analytics.**

Whether you're a:
- **🏆 Fantasy Hockey Manager** looking for edge in player analysis
- **📈 Data Enthusiast** exploring hockey statistics
- **💼 Sports Analyst** studying team performance and contracts
- **🎮 Strategy Gamer** testing different lineup combinations
- **👨‍💻 Developer** building the next generation of sports apps

This platform provides the tools, data, and insights you need to understand the business and beauty of professional hockey.

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/benchwarmers-oss.git

# Install dependencies
bun install

# Start the development server
bun run dev

# Visit http://localhost:3001
```

### First Steps
1. **Explore the Dashboard**: Get familiar with the homepage analytics
2. **Try GM Mode**: Experience strategic lineup building at `/gm-mode`
3. **Browse Statistics**: Dive into player data at `/stats/players`
4. **Check Team Pages**: Explore team rosters at `/teams/[team_code]`

---

**Built with ❤️ for the hockey community**

*🏒 Powering the future of hockey analytics, one commit at a time 🏒*
