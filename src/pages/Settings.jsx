import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { FaMoon, FaSun, FaTrash, FaUser, FaPalette, FaDatabase, FaPen, FaCheck } from 'react-icons/fa';
import './Settings.css';
import { Notification } from '../components/Notification';

export default function Settings() {
    const { 
        tasksObject = [], 
        setTasksObject, 
        userName = 'User', 
        setUserName 
    } = useContext(TaskContext);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    });
    const [toastNotification, setToastNotification] = useState('');

    const accentColors = [
        { name: 'Sky Blue', hex: '#0284c7' },
        { name: 'Teal', hex: '#0d9488' },
        { name: 'Purple', hex: '#8b5cf6' },
        { name: 'Rose', hex: '#f43f5e' },
        { name: 'Emerald', hex: '#10b981' }
    ];

    const [activeAccent, setActiveAccent] = useState(() => {
        return localStorage.getItem('accentColor') || '#0284c7';
    });

    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(userName);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const handleAccentChange = (hex) => {
        setActiveAccent(hex);
        document.documentElement.style.setProperty('--progress', hex);
        localStorage.setItem('accentColor', hex);
    };

    const handleSaveName = () => {
        const finalName = tempName.trim() || 'User';
        setUserName(finalName);
        localStorage.setItem('userName', finalName);
        setIsEditingName(false);
    };

    const handleLoadDemoData = () => {
        const demoTasks = [
            {
                id: 'demo-1',
                title: 'Review Dark Mode Contrast',
                description: 'Verify accessibility standards across theme badges.',
                priority: 'Low',
                priorityNumber: 1,
                status: 'Progress'
            },
            {
                id: 'demo-2',
                title: 'Complete Project Setup',
                description: 'Configure React components and layout styles.',
                priority: 'High',
                priorityNumber: 3,
                status: 'Completed'
            },
            {
                id: 'demo-3',
                title: 'Design Dashboard View',
                description: 'Add summary stats and recent task cards.',
                priority: 'Medium',
                priorityNumber: 2,
                status: 'Progress'
            },
            {
                id: 'demo-4',
                title: 'Add Toast Notifications',
                description: 'Display a quick confirmation popup when tasks are created or cleared.',
                priority: 'Low',
                priorityNumber: 1,
                status: 'Progress'
            },
            {
                id: 'demo-5',
                title: 'Review Task Category Filters',
                description: 'Verify filter buttons properly isolate pending vs completed items.',
                priority: 'Medium',
                priorityNumber: 2,
                status: 'Progress'
            }
            ];

        setTasksObject(demoTasks);
        setToastNotification('Demo tasks loaded successfully!');
        localStorage.setItem('Tasks', JSON.stringify(demoTasks));
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to delete all tasks?')) {
            setTasksObject([]);
            localStorage.removeItem('Tasks');
        }
    };

    return (
        <div className="settings-container">
            <Notification message={toastNotification} onClose={() => setToastNotification('')} />
            <h2 className="settings-header">Settings</h2>

            <div className="settings-section">
                <p className="section-title">User Profile</p>
                <div className="settings-card profile-card">
                    <div className="profile-icon">
                        <FaUser />
                    </div>
                    <div className="profile-info">
                        {isEditingName ? (
                            <div className="name-edit-group">
                                <input 
                                    type="text" 
                                    value={tempName} 
                                    onChange={(e) => setTempName(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                />
                                <button type="button" onClick={handleSaveName} className="save-name-btn">
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div className="name-display-group">
                                <h3>{userName}</h3>
                                <FaPen 
                                    className="edit-icon" 
                                    onClick={() => {
                                        setTempName(userName);
                                        setIsEditingName(true);
                                    }} 
                                />
                            </div>
                        )}
                        <p>Local Account</p>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <p className="section-title">Appearance</p>
                
                <div 
                    className="settings-card setting-item" 
                    role="button"
                    tabIndex={0}
                    onClick={toggleTheme}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTheme()}
                >
                    <div className="item-label">
                        {isDarkMode ? <FaMoon /> : <FaSun />}
                        <span>Dark Mode</span>
                    </div>
                    <div className={`toggle-switch ${isDarkMode ? 'active' : ''}`}>
                        <div className="toggle-handle"></div>
                    </div>
                </div>

                <div className="settings-card accent-card">
                    <div className="item-label">
                        <FaPalette />
                        <span>Accent Color</span>
                    </div>
                    <div className="color-swatches">
                        {accentColors.map((color) => (
                            <div 
                                key={color.hex}
                                role="button"
                                tabIndex={0}
                                className={`swatch ${activeAccent === color.hex ? 'selected' : ''}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => handleAccentChange(color.hex)}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAccentChange(color.hex)}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <p className="section-title">Data Management</p>
                
                <div 
                    className="settings-card setting-item" 
                    role="button"
                    tabIndex={0}
                    onClick={handleLoadDemoData}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLoadDemoData()}
                >
                    <div className="item-label">
                        <FaDatabase />
                        <span>Load Demo Data</span>
                    </div>
                </div>

                <div 
                    className="settings-card setting-item danger" 
                    role="button"
                    tabIndex={0}
                    onClick={handleClearAll}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClearAll()}
                >
                    <div className="item-label">
                        <FaTrash />
                        <span>Clear All Tasks</span>
                    </div>
                    <span className="badge-count">{tasksObject.length}</span>
                </div>
            </div>
        </div>
    );
}