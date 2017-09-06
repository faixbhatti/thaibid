/**
 * Created by Afro on 5/10/2017.
 */
'use strict';

var currencies = {
    'afghani': '؋',
    'baht': '฿',
    'balboa': 'B/.',
    'belidollar': 'BZ$',
    'bolivar': 'Bs',
    'bolíviano': '$b',
    'cedi': '¢',
    'colon': '$',
    'cordoba': 'C$',
    'euro': '€',
    'denar': 'ден',
    'dinar': 'Дин.',
    'dollar': '$',
    'dompeso': 'RD$',
    'dong': '₫',
    'forint': 'Ft',
    'franc': 'CHF',
    'guarani': 'Gs',
    'guilder': 'ƒ',
    'hryvnia': '₴',
    'indiarupee': '₹',
    'jamdollar': 'J$',
    'kip': '₭',
    'koruna': 'Kč',
    'krona': 'kr',
    'krone': 'kr',
    'kuna': 'kn',
    'lek': 'Lek',
    'lempira': 'L',
    'leu': 'lei',
    'lev': 'лв',
    'lira': '₺',
    'manat': 'ман',
    'marka': 'KM',
    'metical': 'MT',
    'naira': '₦',
    'newdollar': 'NT$',
    'peso': '$',
    'philpeso': '₱',
    'pound': '£',
    'pula': 'P',
    'quetzal': 'Q',
    'rand': 'R',
    'real': 'R$',
    'rial': '﷼',
    'riel': '៛',
    'ringgit': 'RM',
    'riyal': '﷼',
    'ttd': 'TT$',
    'ruble': '₽',
    'rupee': '₨',
    'rupiah': 'Rp',
    'shekel': '₪',
    'shilling': 'S',
    'sol': 'S/.',
    'som': 'лв',
    'tenge': 'лв',
    'tughrik': '₮',
    'urupeso': '$U',
    'won': '₩',
    'yen': '¥',
    'yuan': '¥',
    'zimdollar': 'Z$',
    'zloty': 'zł'
};

angular
    .module('ngCurrencyName', [])

.filter('currencyName', ['$filter', '$locale', function($filter, $locale) {
    var numberFilter = $filter('number'),
        formats = $locale.NUMBER_FORMATS,
        pattern = formats.PATTERNS[1];

    return function(amount, symbolName, decimalPoints, suffix) {
        symbolName = symbolName.toLowerCase()

        if (!Number(amount)) {
            amount = 0
        }
        if (angular.isUndefined(decimalPoints) || !Number(decimalPoints)) {
            decimalPoints = 2
        }
        if (angular.isUndefined(symbolName)) {
            var symbol = formats.CURRENCY_SYM;
        } else if (currencies[symbolName] === undefined) {
            console.error('The symbol name you requested is not available');
            symbol = '';
        } else {
            symbol = currencies[symbolName];
        }

        amount = Math.abs(amount);

        var number = numberFilter(amount, decimalPoints);

        suffix = suffix === undefined ? false : suffix;

        if (suffix) {
            number = number + symbol;
            return number
        } else {
            number = symbol + number;
            return number
        }
    }
}]);