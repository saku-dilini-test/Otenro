/**
 *
 * @type {{attributes: {id: string, name: string, pieces: string, price: string}, seedData: *[]}}
 */

module.exports = {
  attributes: {
    name: 'string',
    itemCode:'string',
    price: 'float',
    description: 'string',
    quantity:'string',
    perSlicePrice:'float',
    logoUrl:'string',
    categoryCode:'string',
    category:{
      model:'Category'
    }
  },
  seedData: [
    {
      name: 'VICTORIA SANDWICH',
      itemCode:'SKU TECC85',
      price: '1700',
      description: 'Vanilla sponge cake with butter cream and strawberry, passion fruit or lemon curd filling',
      quantity:'10-12 pieces',
      perSlicePrice:'180',
      logoUrl:'images/products/266327082.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'CARROT CAKE',
      itemCode:'SKU TECC12',
      price: '2100',
      description: '2 layer soft sponge cake with carrot, apple and cashew nuts with cream cheese icing',
      quantity:'10-12 pieces',
      perSlicePrice:'220',
      logoUrl:'images/products/266392804.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'CHOCOLATE ORANGE CAKE',
      itemCode:'SKU TECC20',
      price: '1800',
      description: 'Moist chocolate cake with real chocolate pieces, orange zest and juice, with chocolate orange icing',
      quantity:'10-12 pieces',
      perSlicePrice:'200',
      logoUrl:'images/products/266321892.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'JAFFA ORANGE CAKE',
      itemCode:'SKU TECC52',
      price: '1600',
      description: '2 layer soft orange cake with chocolate orange icing',
      quantity:'10-12 pieces',
      perSlicePrice:'180',
      logoUrl:'images/products/266321986.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'CHOCOLATE CAKE',
      itemCode:'SKU TECC15',
      price: '1500',
      description: 'Soft chocolate cake with 2 layers of dark or white chocolate icing',
      quantity:'10-12 pieces',
      perSlicePrice:'160',
      logoUrl:'images/products/266321872.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'THE MINTY WAY',
      itemCode:'SKU TECC58',
      price: '2800',
      description: '2 layers of rich mint chocolate cake sandwiched with peppermint cream and chocolate shavings',
      quantity:'10-12 pieces',
      perSlicePrice:'290',
      logoUrl:'images/products/266327002.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'EGGLESS CHOCOLATE CAKE ',
      itemCode:'SKU TECC01',
      price: '1500',
      description: 'Soft chocolate 2 layer eggless cake with chocolate/white chocolate icing',
      quantity:'10-12 pieces',
      perSlicePrice:'160',
      logoUrl:'images/products/266321818.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'GOOEY CHOCOLATE CAKE',
      itemCode:'SKU TECC44',
      price: '2600',
      description: 'A very rich moist dark chocolate cake with chocolate ganache icing',
      quantity:'8-10 pieces',
      perSlicePrice:'280',
      logoUrl:'images/products/266321966.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'THE COOKIE MONSTER',
      itemCode:'SKU TECC26',
      price: '2600',
      description: 'Vanilla sponge with cookie dough, chocolate ganache middle and white chocolate & cookie dough topping',
      quantity:'8-10 pieces',
      perSlicePrice:'280',
      logoUrl:'images/products/266321904.jpg',
      categoryCode: 'LAYER CAKES'
    },
    {
      name: 'LEMON AND BLUEBERRYLOAF',
      itemCode:'SKU TECC54',
      price: '2200',
      description: 'Lemon sponge cake with blueberries, and light lemon icing',
      quantity:'10-12 pieces',
      perSlicePrice:'240',
      logoUrl:'images/products/266321990.jpg',
      categoryCode: 'LOAF CAKES'
    },
    {
      name: 'PASSION FRUIT AND RASPBERRY LOAF',
      itemCode:'SKU TECC65',
      price: '2200',
      description: 'Passion sponge cake with raspberries, and light passion icing',
      quantity:'10-12 pieces',
      perSlicePrice:'240',
      logoUrl:'images/products/266327022.jpg',
      categoryCode: 'LOAF CAKES'
    },
    {
      name: 'LEMON/ORANGE DRIZZLE CAKE',
      itemCode:'SKU TECC62',
      price: '1500',
      description: 'Lemon/Orange sponge cake with lemon/orange drizzle icing',
      quantity:'10-12 pieces',
      perSlicePrice:'160',
      logoUrl:'images/products/266327014.jpg',
      categoryCode: 'LOAF CAKES'
    },
    {
      name: 'BANANA AND CHOCOLATE LOAF CAKE',
      itemCode:'SKU TECC04',
      price: '1500',
      description: 'Soft banana and chocolate loaf with chunks of dark chocolate',
      quantity:'10-12 pieces',
      perSlicePrice:'140',
      logoUrl:'images/products/266321830.jpg',
      categoryCode: 'LOAF CAKES'
    },
    {
      name: 'WHITE CHOCOLATE/DARK CHOCOLATE AND STRAWBERRY GATEAU',
      itemCode:'SKU TECC14',
      price: '2500',
      description: '3 layer Strawberry cake with white/dark chocolate butter icing topped with strawberries',
      quantity:'10-12 pieces',
      perSlicePrice:'260',
      logoUrl:'images/products/266321868.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'PEACH AND PASSION FRUIT GATEAU',
      itemCode:'SKU TECC67',
      price: '2400',
      description: '3 layer banana, peach & passion cake with cream cheese icing',
      quantity:'10-12 pieces',
      perSlicePrice:'250',
      logoUrl:'images/products/266327030.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'LEMON AND WHITE CHOCOLATE GATEAU',
      itemCode:'SKU TECC55',
      price: '2400',
      description: '3 layer soft lemon cake, filled with lemon curd and a white chocolate icing',
      quantity:'10-12 pieces',
      perSlicePrice:'250',
      logoUrl:'images/products/266321994.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'NEAPOLITAN GATEAU',
      itemCode:'SKU TECC60',
      price: '2200',
      description: 'Chocolate/vanilla/strawberry layers with white chocolate middle and dark chocolate topping',
      quantity:'10-12 pieces',
      perSlicePrice:'240',
      logoUrl:'images/products/266327006.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'CAPPUCCINO/MOCHA GATEAU',
      itemCode:'SKU TECC10',
      price: '1900',
      description: '3 layer coffee cake with white or dark chocolate butter icing',
      quantity:'10-12 pieces',
      perSlicePrice:'200',
      logoUrl:'images/products/266321850.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'BLACK FOREST GATEAU',
      itemCode:'SKU TECC06',
      price: '3700',
      description: '3 layer moist chocolate and real cherry sponge layered with chocolate mousse and whipped cream icing',
      quantity:'10-12 pieces',
      perSlicePrice: '380',
      logoUrl:'images/products/266321838.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'BUTTERSCOTCH PRALINE GATEAU',
      itemCode:'SKU TECC09',
      price: '2800',
      description: '3 layer moist butterscotch sponge layered with home made butterscotch sauce and crunchy almond praline',
      quantity:'10-12 pieces',
      perSlicePrice:'300',
      logoUrl:'images/products/266321846.jpg',
      categoryCode: 'GATEAUX'
    },
    {
      name: 'CHEESECAKE',
      itemCode:'SKU TECC13',
      price: '4600',
      description: 'New York with/without topping (Blueberry, Raspberry, Strawberry, Passion Fruit, English Fudge, Chocolate ganache)',
      quantity:'8-10 pieces',
      perSlicePrice:'440',
      logoUrl:'images/products/266321862.jpg',
      categoryCode: 'CHEESECAKES'
    },
    {
      name: 'GOURMET CHEESECAKE',
      itemCode:'SKU TECC46',
      price: '4600',
      description: 'Creamy baked cheesecake; Raspberry & White choc, Blueberry & Dark Choc, Passion fruit, Caramel Swirl, Chocolate swirl or Dark Chocolate Cheesecake',
      quantity:'10-15 pieces',
      perSlicePrice:'480',
      logoUrl:'images/products/266321974.jpg',
      categoryCode: 'CHEESECAKES'
    },
    {
      name: 'SQUIDGY CHOCOLATE LOG',
      itemCode:'SKU TECC76',
      price: '3200',
      description: 'Flourless soft sponge rolled with whipped cream and fresh chocolate mousse',
      quantity:'10-12 pieces',
      perSlicePrice:'340',
      logoUrl:'images/products/266327054.jpg',
      categoryCode: 'LOGS'
    },
    {
      name: 'PASSION AND COCONUT ROLL',
      itemCode:'SKU TECC64',
      price: '1800',
      description: 'Soft vanilla sponge roll with passion buttercream and passion fruit  curd covered in sweet coconut & passion drizzle',
      quantity:'8-10 pieces',
      perSlicePrice:'180',
      logoUrl:'images/products/266327709.jpg',
      categoryCode: 'LOGS'
    },
    {
      name: 'YORKSHIRE ROLL',
      itemCode:'SKU TECC86',
      price: '1500',
      description: 'Soft sponge roll with vanilla buttercream and filling; strawberry & chocolate/Raspberry & white chocolate/ fruit curd (Passion fruit/Lemon/Strawberry)',
      quantity:'8-10 pieces',
      perSlicePrice:'180',
      logoUrl:'images/products/266327086.jpg',
      categoryCode: 'LOGS'
    },
    {
      name: 'FRUIT TARTS [LEMON AND LIME / PASSION FRUIT / ORANGE',
      itemCode:'SKU TECC40',
      price: '2500',
      description: 'Fruity, soft creamy filling on a pastry base',
      quantity:'10-12 pieces',
      perSlicePrice:'260',
      logoUrl:'images/products/266321956.jpg',
      categoryCode: 'TARTS'
    },
    {
      name: 'CHOCOLATE MOUSSE TARTS',
      itemCode:'SKU TECC19',
      price: '360',
      description: 'Mini tarts filled with chocolate mousse and strawberry',
      quantity:'1 piece',
      perSlicePrice:'0',
      logoUrl:'images/products/266321888.jpg',
      categoryCode: 'TARTS'
    },
    {
      name: 'CRÈME BRÛLÉE TART',
      itemCode:'SKU TECC31',
      price: '3400',
      description: 'Rich vanilla custard tart with raspberry / strawberry / blueberry and a hard caramelised top',
      quantity:'8-10 pieces',
      perSlicePrice:'320',
      logoUrl:'images/products/266321924.jpg',
      categoryCode: 'TARTS'
    },
    {
      name: 'PEAR & CHOCOLATE TART',
      itemCode:'SKU TECC03',
      price: '3400',
      description: 'Gooey rich chocolate cream filling with pear on a chocolate pastry base',
      quantity:'10-12 pieces',
      perSlicePrice:'340',
      logoUrl:'images/products/266321826.jpg',
      categoryCode: 'TARTS'
    },
    {
      name: 'CHOCOLATE CHEESECAKE TART',
      itemCode:'SKU TECC16',
      price: '3000',
      description: 'A two-layer tart - gooey rich chocolate cream and a layer of cheesecake on a chocolate pastry base',
      quantity:'10-12 pieces',
      perSlicePrice:'320',
      logoUrl:'images/products/266321876.jpg',
      categoryCode: 'TARTS'
    },

    {
      name: 'SALTED CARAMEL CHOCOLATE TORTE',
      itemCode:'SKU TECC74',
      price: '3200',
      description: 'soft creamy chocolate layer with salted caramel on a sweet biscuit base',
      quantity:'10-12 pieces',
      perSlicePrice:'340',
      logoUrl:'images/products/266327357.jpg',
      categoryCode: 'TARTS'
    },
    {
      name: 'LEMON/PASSION MERINGUE PIE',
      itemCode:'SKU TECC56',
      price: '2700',
      description: 'Sweet pastry base with lemon or passion fruit filling and a fluffy meringue topping',
      quantity:'10-12 pieces',
      perSlicePrice:'280',
      logoUrl:'images/products/266321998.jpg',
      categoryCode: 'SWEET PIES'
    },
    {
      name: 'BANOFFEE PIE',
      itemCode:'SKU TECC05',
      price: '2600',
      description: 'Sweet pastry base with a layer of banana and caramel, topped with fresh whipped cream and chocolate ganache',
      quantity:'10-12 pieces',
      perSlicePrice:'270',
      logoUrl:'images/products/266321834.jpg',
      categoryCode: 'SWEET PIES'
    },
    {
      name: 'APPLE PIE',
      itemCode:'SKU TECC02',
      price: '2700',
      description: 'Sweet pastry base, topped with real apple and a hint of cinnamon',
      quantity:'10-12 pieces',
      perSlicePrice:'280',
      logoUrl:'images/products/266321822.jpg',
      categoryCode: 'SWEET PIES'
    },
    {
      name: 'CRÈME BRÛLÉE',
      itemCode:'SKU TECC30',
      price: '450',
      description: 'Banoffee/Lemon/Passion fruit/Strawberry/Raspberry/Blueberry coulis base with a rich custard middle topped with a layer of hard caramel',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321920.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'CHOCOLATE MOUSSE',
      itemCode:'SKU TECC17',
      price: '450',
      description: 'Dark/White/Double',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321920.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'FRUIT TRIFLE',
      itemCode:'SKU TECC41',
      price: '300',
      description: 'Home made vanilla custard with a layer of fresh fruit with jelly and sponge cake',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321962.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'TIRAMISU',
      itemCode:'SKU TECC82',
      price: '380',
      description: 'Layers of coffee soaked chocolate cake, chocolate ganache and rich cream cheese and cream',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266327070.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'ETON MESS',
      itemCode:'SKU TECC36',
      price: '260',
      description: 'Strawberry and meringue pieces, with whipped cream, swirled with strawberry coulis',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321944.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'CRÈME BROWNIE',
      itemCode:'SKU TECC29',
      price: '340',
      description: 'Chunks of brownie layered with cream and chocolate ganache',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321916.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'CHOCOLATE PUDDLE PUDDING',
      itemCode:'SKU TECC21',
      price: '4000',
      description: 'Baked chocolate sponge with a hot chocolate sauce',
      quantity:'Pre Glass',
      perSlicePrice:'0',
      logoUrl:'images/products/266321896.jpg',
      categoryCode: 'GLASS DESSERTS'
    },
    {
      name: 'OMG!',
      itemCode:'SKU TECC61',
      price: '2800',
      description: 'Soft eggless sponge squares layered with chocolate mousse, white chocolate and caramel',
      quantity:'10 -15 pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266321854.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'CHOCOLATE CARAMEL SHORTBREAD',
      itemCode:'SKU TECC11',
      price: '1800',
      description: 'Soft bread with chocolate topping',
      quantity:'10 -15 pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266321854.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'CUP CAKES',
      itemCode:'SKU TECC33',
      price: '1500',
      description: 'Soft eggless sponge squares layered with chocolate mousse, white chocolate and caramel',
      quantity:'10 -15 pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266321932.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'COOKIES',
      itemCode:'SKU TECC61',
      price: '120',
      description: 'chocolate chip/raspberry and white chocolate/ oat & raisin/ gingerbread/chocolate and cashew nut',
      quantity:'1 piece',
      perSlicePrice:'0',
      logoUrl:'images/products/266321908.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'COOKIE SANDWICHES',
      itemCode:'SKU TECC28',
      price: '200',
      description: 'Two plain or chocolate chip cookies sandwiched with peppermint cream, dark/white chocolate, passion/lemon/strawberry cream or caramel',
      quantity:'1 piece',
      perSlicePrice:'0',
      logoUrl:'images/products/266321912.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'PROFITEROLES',
      itemCode:'SKU TECC71',
      price: '1000',
      description: 'Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache',
      quantity:'10 pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266327038.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'CROQUEMBOUCHE',
      itemCode:'SKU TECC72',
      price: '3000',
      description: 'Profiterole tree dressed with pulled sugar or drizzled with chocolate ganache',
      quantity:'20 balls',
      perSlicePrice:'0',
      logoUrl:'images/products/266327042.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'PARIS-BREST',
      itemCode:'SKU TECC63',
      price: '1100',
      description: 'Soft choux pastry ring filled with crème patisserie or chocolate mousse with whipped cream',
      quantity:'6 pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266327018.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'CHELSEA BUNS',
      itemCode:'SKU TECC25',
      price: '2300',
      description: 'Cinnamon swirled buns with a citrus syrup topping',
      quantity:'12 Pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266321900.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'SCONES',
      itemCode:'SKU TECC75',
      price: '1000',
      description: 'with home-¬made jam or fruit curd',
      quantity:'12 Pieces',
      perSlicePrice:'0',
      logoUrl:'images/products/266327050.jpg',
      categoryCode: 'OTHER SWEETS'
    },
    {
      name: 'GOURMET FRUIT CURD',
      itemCode:'SKU TECC38',
      price: '450',
      description: 'Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes',
      quantity:'1 piece',
      perSlicePrice:'0',
      logoUrl:'images/products/266392927.jpg',
      categoryCode: 'OTHER SWEETS'
    }
  ]
};
