import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { File } from './file.entity';

@Entity({ name: 'directories' })
export class Directory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	parentId: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'text' })
	path: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@ManyToOne(() => Directory, directory => directory.children, { onDelete: 'CASCADE' })
	parent: Directory;

	@OneToMany(() => Directory, directory => directory.parent)
	children: Directory[];

	@OneToMany(() => File, file => file.directory)
	files: File[];
}