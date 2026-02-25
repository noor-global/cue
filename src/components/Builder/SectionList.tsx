import React, { useState } from 'react';
import { usePrompt } from '../../contexts/PromptContext';
import { Button } from '../Shared/Button';
import { Input, TextArea } from '../Shared/Input';
import { Card } from '../Shared/Card';
import { Trash2, Plus, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './Builder.module.css';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableSectionProps {
  section: { id: string; title: string; content: string };
}

const SortableSection = ({ section }: SortableSectionProps) => {
  const { updateSection, removeSection } = usePrompt();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 5 : 1,
    position: isDragging ? 'relative' as const : undefined,
    opacity: isDragging ? 0.8 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem}>
      <Card className={styles.item}>
        <div className={styles.itemHeader} data-collapsed={isCollapsed}>
          <div {...attributes} {...listeners} className={styles.dragHandle}>
            <GripVertical size={16} />
          </div>
          <button 
            className={styles.collapseBtn}
            onClick={() => setIsCollapsed(!isCollapsed)}
            type="button"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>
          <Input 
            placeholder="Section Title (e.g., Role, Context)" 
            value={section.title}
            onChange={(e) => updateSection(section.id, 'title', e.target.value)}
            className={styles.titleInput}
          />
          <Button variant="icon" onClick={() => removeSection(section.id)}><Trash2 size={16} /></Button>
        </div>
        {!isCollapsed && (
          <TextArea 
            placeholder="Content..." 
            value={section.content}
            onChange={(e) => updateSection(section.id, 'content', e.target.value)}
            className={styles.contentInput}
          />
        )}
      </Card>
    </div>
  );
};

export const SectionList: React.FC = () => {
  const { sections, addSection, reorderSection } = usePrompt();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      reorderSection(oldIndex, newIndex);
    }
  };

  return (
    <div className={styles.list}>
        <div className={styles.header}>
            <h2 className={styles.heading}>Sections</h2>
            <Button onClick={addSection} size="sm" variant="secondary"><Plus size={16} /> Add Section</Button>
        </div>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map(section => (
            <SortableSection key={section.id} section={section} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
