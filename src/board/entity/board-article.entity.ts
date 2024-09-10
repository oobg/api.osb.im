import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardConfig } from './board-config.entity';

@Entity('board_article')
export class BoardArticle {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => BoardConfig)
	@JoinColumn({ name: 'config_id' })
	config: BoardConfig;

	@Column({ type: 'int' })
	articleNo: number;

	@Column({ type: 'varchar', length: 10 })
	languageCode: string;

	@Column({ type: 'text', nullable: true })
	title: string;

	@Column({ type: 'int', default: 0 })
	viewCnt: number;

	@Column({ type: 'varchar', length: 15, nullable: true })
	regIp: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	regUserNo: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;

	@Column({ type: 'varchar', length: 20, nullable: true })
	modUserNo: string;

	@UpdateDateColumn({ type: 'timestamptz' })
	modDate: Date;
}