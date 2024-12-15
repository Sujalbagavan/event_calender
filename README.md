# Event Calendar Application

A modern, responsive event calendar application built with React, TypeScript, and shadcn/ui. This application provides a robust solution for managing events with an intuitive user interface.

![Event Calendar Screenshot](https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=1920)

## 🌟 Features

### Calendar View
- 📅 Interactive monthly calendar grid
- 🔄 Easy month-to-month navigation
- 📱 Fully responsive design for mobile and desktop
- 🎯 Visual indicators for current day and selected dates

### Event Management
- ➕ Add new events with title, time, and description
- ✏️ Edit existing events
- 🗑️ Delete events
- 🎨 Color coding for different event types (work, personal, other)
- ⚡ Real-time updates and notifications

### Advanced Features
- 🔍 Search functionality for events
- 🚫 Automatic prevention of event time conflicts
- 💾 Local storage persistence
- 📱 Mobile-optimized interface
- 🎯 Quick month/year selection

## 🛠️ Technical Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📦 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarDay.tsx
│   │   ├── CalendarGrid.tsx
│   │   ├── CalendarHeader.tsx
│   │   ├── EventDialog.tsx
│   │   ├── EventList.tsx
│   │   └── MobileEventButton.tsx
│   └── ui/
├── hooks/
│   ├── useCalendar.ts
│   ├── useEvents.ts
│   ├── useEventColor.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── types/
│   └── calendar.ts
└── App.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/event-calendar.git
cd event-calendar
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Adding Events
1. Click on any date in the calendar
2. Click the "Add Event" button
3. Fill in the event details:
   - Title (required)
   - Start time
   - End time
   - Description (optional)
   - Category (work/personal/other)

### Managing Events
- Click on a date to view its events
- Use the edit icon to modify events
- Use the delete icon to remove events
- Search for events using the search bar

### Navigation
- Use arrow buttons to move between months
- Use dropdown selectors for quick month/year navigation
- Click on any date to view or add events

## 🔧 Configuration

The application uses several configuration files:

- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite bundler configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

This project follows strict coding standards:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture
- Custom hooks for reusable logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [date-fns](https://date-fns.org/) for date manipulation
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 🔗 Links

- [Live Demo]([your-deployment-url](https://glittering-meerkat-a78096.netlify.app/))


## 📞 Support

For support, email sujalbagavan@gmail.com.com or join our Slack channel.
