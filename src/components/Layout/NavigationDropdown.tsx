import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  LayoutTemplate, 
  PenTool, 
  ChevronDown 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../Shared/DropdownMenu';
import { Avatar } from '../Shared/Avatar';
import { Button } from '../Shared/Button';
import logo from '../../assets/logo.ico';
import styles from './NavigationDropdown.module.css';

export const NavigationDropdown: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" size="sm" className={styles.triggerBtn}>
            <Avatar src={logo} alt="Cue" className={styles.avatar} />
            <span className={styles.appName}>Cue</span>
            <ChevronDown size={14} className={styles.chevron} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/')}>
              <Home />
              Intro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/templates')}>
              <LayoutTemplate />
              Templates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/builder')}>
              <PenTool />
              Builder
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.open('https://noorglobal.page/contact', '_blank')}>
            <span className={styles.supportLink}>Support & Feedback</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
