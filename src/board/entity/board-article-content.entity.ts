import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardArticle } from './board-article.entity';
import { BoardConfig } from './board-config.entity';

@Entity('board_article_content')
export class BoardArticleContent {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => BoardConfig)
	@JoinColumn({ name: 'config_id' })
	config: BoardConfig;

	@ManyToOne(() => BoardArticle)
	@JoinColumn({ name: 'article_id' })
	article: BoardArticle;

	@Column({ type: 'varchar', length: 10 })
	languageCode: string;

	@Column({ type: 'text' })
	content: string;

	@Column({ type: 'text', nullable: true })
	price: string;

	@Column({ type: 'text', nullable: true })
	discount: string;

	@Column({ type: 'text', nullable: true })
	dlvyPrice: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	regUserNo: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;

	@Column({ type: 'varchar', length: 20, nullable: true })
	modUserNo: string;

	@UpdateDateColumn({ type: 'timestamptz' })
	modDate: Date;
}