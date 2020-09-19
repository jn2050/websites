import App from '../IB/App'
import * as IB from '../IB/components'

export default function getRoutes(Layout) {
	return [
		{
			path: '/:locale?',
			component: App,
			routesProxy: {
				default: {
					product: 'produtos',
					service: 'servicos'
				},
				en: {
					product: 'products',
					service: 'services'
				}
			},
			navigation: {
				default: [
					{
						name: 'Página Inicial',
						to: '/',
						exact: true
					},
					{
						name: 'Sobre nós',
						to: '/sobre_nos/',
						exact: true
					},
					{
						name: 'Services',
						to: '/servicos/'
					},
					{
						name: 'Experiences',
						to: {
							hash: '#anchor'
						}
					},
					{
						name: 'About Us',
						to: 'http://www.jimmyboys.rocks'
					},
					{
						name: 'EN',
						to: '/en'
					}
				],
				en: [
					{
						name: 'Homepage',
						to: '/en/',
						exact: true
					},
					{
						name: 'About Us',
						to: '/en/about_us/',
						exact: true
					},
					{
						name: '404',
						to: '/oiiiiiii/',
						exact: true
					},
					{
						name: '404EN',
						to: '/en/oiiiiiii/',
						exact: true
					},
					{
						name: 'PT',
						to: '/',
						exact: true
					}
				]
			},
			// Theme stands for global colors and components like ActionButton
			theme: {
				buttons: IB.simpleArrowButtons,
				navButtons: IB.underlinedButtons,
				inputs: IB.flatSolidInputs,
				icons: IB.simpleIcons,
				decorators: IB.industrialDecorators
			},
			// routes should be sorted by parts length (split('/').length) - unless 404
			routes: [
				{
					path: ['/', '/en'],
					component: Layout,
					exact: true,
					layout: [
						{
							constructor: IB.SimpleMenu,
							modifiers: ['--content-text-transform-uppercase', '--root-position-docked', '--logo-filter-invert'],
							queries: [
								{
									resource: 'business',
									body: '...businessCard'
								}
							],
							props: {
								navigation: 'prop:navigation',
								logo: 'query:0.card.logos.0'
							}
						},
						{
							constructor: IB.BackgroundCoverHeader,
							modifiers: ['--content-width-small', '--content-text-align-center'],
							queries: [
								{
									resource: 'events',
									args: {
										ids: ['congresso_internacional_de_medicina_de_hipoxia']
									},
									body: '...fullEvent'
								}
							],
							props: {
								subtitle: 'label:Auditório Municipal Manteigas Serra Da Estrela Dias 15, 16 e 17 de Junho 2018',
								goToLabel: 'Inscreva-se',
								item: 'query:0.0.card'
							}
						},
						{
							constructor: IB.AsideThumbsPresentation,
							queries: [
								{
									resource: 'events',
									args: {
										ids: ['congresso_internacional_de_medicina_de_hipoxia']
									},
									body: '...fullEvent'
								}
							],
							props: {
								numberOfThumbs: 3,
								items: 'query:0.0.card'
							}
						},
						{
							constructor: IB.CountDownBanner,
							modifiers: ['--background-gradient', '--circle-case'],
							props: {
								label: 'Estamos',
								title: 'Quase a começar',
								summary: '',
								subtitle: 'label:a servir os nossos parceiros',
								date: 1529020800,
								completeLabel: 'Acabou!!!!',
								displaySeconds: false
							}
						},
						{
							constructor: IB.SplitList,
							props: {
								items: [
									{
										title: 'Coffee Breaks Gratuítos',
										summary: 'Coffee Breaks incluídas no preço do Congresso.'
									},
									{
										title: '200 Participantes',
										summary: 'Poderão participar neste Congresso.'
									},
									{
										title: 'Convívio depois das palestras',
										summary: 'Discuta com os outros participantes os temos apresentados.'
									},
									{
										title: '40 Oradores',
										summary: 'Oradores experientes em diversas áreas.'
									}
								]
							}
						},
						{
							constructor: IB.HeroMosaicBoard,
							modifiers: ['--card-filter-greyscale'],
							queries: [
								{
									resource: 'people',
									body: '...personCard'
								}
							],
							props: {
								card: IB.FullThumbCard,
								items: 'query:0',
								summary: 'Conheça aqui os oradores que vão falar no Congresso Internacional de Medicina Hipóxia.'
							}
						},
						{
							constructor: IB.ScheduleContent,
							queries: [
								{
									resource: 'events',
									args: {
										ids: ['congresso_internacional_de_medicina_de_hipoxia']
									},
									body: '...fullEvent'
								}
							],
							props: {
								event: 'query:0.0',
								image: 'query:0.0.card.backgroundImages.1'
							}
						},
						// {
						// 	constructor: IB.ServiceBoard,
						// 	props: {
						// 	}
						// },
						{
							constructor: IB.AsideMapContactCard,
							queries: [
								{
									resource: 'events',
									args: {
										ids: ['congresso_internacional_de_medicina_de_hipoxia']
									},
									body: '...fullEvent'
								}
							],
							props: {
								image: 'query:0.0.card.backgroundImages.2'
							}
						},
						{
							constructor: IB.ContactFormFooter,
							modifiers: ['--card-filter-greyscale'],
							props: {
								form: IB.SimpleForm
							}
						}
					]
				},
				// 404
				{
					path: '*',
					component: Layout,
					exact: true,
					layout: [
						{
							constructor: IB.SimpleMenu,
							queries: [
								{
									resource: 'business',
									body: '...businessCard'
								}
							],
							modifiers: ['--text-uppercase', '--align-logo-right', '--box-shadow'],
							props: {
								logo: 'query:0.card.logos.0'
							}
						},
						{
							constructor: IB.SplitBanner,
							queries: [
								{
									resource: 'business',
									body: '...businessCard'
								}
							],
							props: {
								hero: 'query:0',
								id: 'anchor'
							}
						}
					]
				}
			]
		}
	]
}
