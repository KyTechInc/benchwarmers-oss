# 📋 Changelog

All notable changes to **Benchwarmers OSS** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of Benchwarmers OSS
- Interactive NHL General Manager lineup editor
- Drag-and-drop functionality for player management
- Toronto Maple Leafs roster data integration
- Smart placeholder system for empty roster positions
- Team selection dropdown
- Press Box for bench players
- Responsive design for desktop and mobile

### Features
- **Cross-position Drag & Drop**: Move players between any roster positions
- **Automatic Slot Management**: Maintains proper lineup structure (4 forwards, 3 defense pairs, 2 goalies)
- **Visual Placeholder System**: Dotted borders show where players can be added
- **Real Player Data**: Toronto Maple Leafs roster with actual player statistics and headshots
- **Position Flexibility**: Players can be moved regardless of their labeled position

## [0.1.0] - 2024-09-XX

### Added
- 🏒 **Core NHL GM Functionality**
  - Interactive lineup editor with drag-and-drop
  - Toronto Maple Leafs roster integration
  - Press Box management system
  - Visual placeholder cues for empty positions

- 🛠️ **Technical Foundation**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Radix UI component library
  - @dnd-kit for drag-and-drop functionality
  - Biome for linting and formatting

- 🎨 **User Interface**
  - Clean, professional design
  - Responsive layout
  - Smooth animations and transitions
  - Hockey-themed color scheme
  - Intuitive drag-and-drop interactions

- 📊 **Data Management**
  - Player card components with headshots
  - Salary and contract information display
  - Jersey number integration
  - Position-based organization

### Technical Details
- **Framework**: Next.js 15.5.2
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **UI Components**: Radix UI, Lucide Icons
- **Linting**: Biome 2.2.2
- **Package Manager**: Bun (recommended)

---

## Types of Changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

---

## Contributing to the Changelog

When contributing to this project:
1. Add your changes to the "Unreleased" section above
2. Use the appropriate change type (Added, Changed, Fixed, etc.)
3. Keep descriptions clear and concise
4. Reference issue numbers when applicable
5. Update version numbers according to semantic versioning

---

**Legend:**
- 🏒 Hockey/sports related features
- 🛠️ Development/tools related changes
- 🎨 User interface/design related changes
- 📊 Data/analytics related features
- 🔒 Security related changes
- 📚 Documentation related changes
