

const urls = [
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/amadeu.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/carbon1.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/carbon2.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/dali.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/drawing.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/escher.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/matrix.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/modern.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/monnet.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/picasso1.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/picasso2.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/van-gogh.jpg",
    "http://dlogic-style.s3-eu-west-1.amazonaws.com/styles/vinci.jpg"
]


const tree_data = [
    {
      "id": 1,
      "value": "Value 1",
      "children": [
        {
          "id": 4,
          "value": "Value 1.1",
          "children": [
            {
              "id": 6,
              "value": "Value 1.1.1",
            }
          ]
        },
        {
          "id": 5,
          "value": "Value 1.2",
        },
      ]
    },
    {
      "id": 2,
      "value": "Value 2",
      "children": [
        {
          "id": 2,
          "value": "Value 2.1",
        }
      ]
    },
    {
      "id": 3,
      "value": "Value 3",
      "children": [
        {
          "id": 2,
          "value": "Value 3.1",
        }
      ]
    }
  ]


const table_data = [
    {code: 1, 'name': 'aName', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'GREEN', 'item': 'value1'},
    {code: 2, 'name': 'aaName', 'value': 1000, 'amount': 1000000, 'percentage': 1, 'time': 10, 'label': 'YELLOW', 'item': 'value1'},
    {'code': 3, 'name': 'bName', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'RED', 'item': 'value1'},
    {'code': 4, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'GRAY', 'item': 'value1'},
    {'code': 5, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'GREEN', 'item': 'value1'},
    {'code': 6, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'YELLOW', 'item': 'value1'},
    {'code': 7, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'RED', 'item': 'value1'},
    {'code': 8, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'GREEN', 'item': 'value1'},
    {'code': 9, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'GREEN', 'item': 'value1'},
    {'code': 10, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'YELLOW', 'item': 'value1'},
    {'code': 11, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'RED', 'item': 'value1'},
    {'code': 12, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'GREEN', 'item': 'value1'},
    {'code': 13, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'GREEN', 'item': 'value1'},
    {'code': 14, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'YELLOW', 'item': 'value1'},
    {'code': 15, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'RED', 'item': 'value1'},
    {'code': 16, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'GREEN', 'item': 'value1'},
]

export { urls, tree_data, table_data }