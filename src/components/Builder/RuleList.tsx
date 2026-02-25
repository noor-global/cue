import React from 'react';
import { usePrompt } from '../../contexts/PromptContext';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { Card } from '../Shared/Card';
import { Trash2, Plus, GripVertical } from 'lucide-react';
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

interface SortableRuleProps {
    rule: { id: string; content: string };
}

const SortableRule = ({ rule }: SortableRuleProps) => {
    const { updateRule, removeRule } = usePrompt();
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: rule.id });

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
                <div className={`${styles.itemHeader} ${styles.noMarginBottom}`}>
                    <div {...attributes} {...listeners} className={styles.dragHandle}>
                        <GripVertical size={16} />
                    </div>
                    <Input 
                        placeholder="Rule content (e.g., Be concise)" 
                        value={rule.content}
                        onChange={(e) => updateRule(rule.id, e.target.value)}
                        className={styles.titleInput}
                    />
                    <Button variant="icon" onClick={() => removeRule(rule.id)}><Trash2 size={16} /></Button>
                </div>
            </Card>
        </div>
    );
};

export const RuleList: React.FC = () => {
  const { rules, addRule, reorderRule } = usePrompt();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = rules.findIndex((r) => r.id === active.id);
      const newIndex = rules.findIndex((r) => r.id === over?.id);
      reorderRule(oldIndex, newIndex);
    }
  };

  return (
    <div className={styles.list}>
        <div className={styles.header}>
            <h2 className={styles.heading}>Rules</h2>
            <Button onClick={addRule} size="sm" variant="secondary"><Plus size={16} /> Add Rule</Button>
        </div>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={rules}
          strategy={verticalListSortingStrategy}
        >
          {rules.map(rule => (
            <SortableRule key={rule.id} rule={rule} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
