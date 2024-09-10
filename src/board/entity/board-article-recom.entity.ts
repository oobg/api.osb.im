import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardArticle } from './board-article.entity';
import { BoardConfig } from './board-config.entity';

@Entity('board_article_recom')
export class BoardArticleRecom {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => BoardConfig)
	@JoinColumn({ name: 'config_id' })
	config: BoardConfig;

	@ManyToOne(() => BoardArticle)
	@JoinColumn({ name: 'article_id' })
	article: BoardArticle;

	@Column({ type: 'varchar', length: 20 })
	userNo: string;

	@Column({ type: 'char', length: 1 })
	recomType: string;

	@Column({ type: 'varchar', length: 15, nullable: true })
	regIp: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;
}