import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardConfig } from './board-config.entity';

@Entity('board_class')
export class BoardClass {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => BoardConfig)
	@JoinColumn({ name: 'config_id' })
	config: BoardConfig;

	@Column({ type: 'varchar', length: 20 })
	classCode: string;

	@Column({ type: 'varchar', length: 10 })
	languageCode: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	className: string;

	@Column({ type: 'int', nullable: true })
	sort: number;

	@Column({ type: 'char', length: 1 })
	useYn: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	regUserNo: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;

	@Column({ type: 'varchar', length: 20, nullable: true })
	modUserNo: string;

	@UpdateDateColumn({ type: 'timestamptz' })
	modDate: Date;
}