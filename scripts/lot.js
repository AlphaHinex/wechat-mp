'use strict';

const handler = module.exports = {};

String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const followers = new Map();

followers.set('ounM4vwcww_TjX9EkEH4nSVrlhRY', new Date(2022, 1, 1));
followers.set('ounM4v6JxLYXKPNSA3NywLFUhVgs', new Date(2022, 1, 1));
followers.set('ounM4v5Y2CZ3eXZVXEBcch7nYrZw', new Date(2022, 1, 1));
followers.set('ounM4v5Hpzs7hS8bZmfdY-qNkulI', new Date(2022, 1, 1));
followers.set('ounM4v_t1DGe6NChHLxRGKk1oH9I', new Date(2022, 1, 1));
followers.set('ounM4vyxCVWIWabZfhZASM1FrGYs', new Date(2022, 1, 1));
followers.set('ounM4vzmImdK50GqO32kznXoRjkU', new Date(2022, 1, 1));
followers.set('ounM4v5Zv_6pflpKdgQMAYTHtEfs', new Date(2022, 1, 1));
followers.set('ounM4v3gb3vTB74xjPF2MomqEQew', new Date(2022, 1, 1));
followers.set('ounM4v2gxQ9cuLwrcpOAtpNoT_VE', new Date(2022, 1, 1));
followers.set('ounM4v_Slc6i0zHFC8wgCzK-Ucy8', new Date(2022, 1, 1));
followers.set('ounM4vyLwyhBq2i2VYv8Gg8yD294', new Date(2022, 1, 1));
followers.set('ounM4v7u1r0kGduQaGbD46eWDfkA', new Date(2022, 1, 1));
followers.set('ounM4vxdOXfo_2q0CG675AUaQBNk', new Date(2022, 1, 1));
followers.set('ounM4vwnw-BkXUgG7q6MVDplnrmc', new Date(2022, 1, 1));
followers.set('ounM4v9zQQ1F1q5vSir4hbeMzwpA', new Date(2022, 1, 1));
followers.set('ounM4vzAkKtlCpukVQf9zEC4SKrc', new Date(2022, 1, 1));
followers.set('ounM4vwDY3mTH9pHVlhhUZqshteg', new Date(2022, 1, 1));
followers.set('ounM4v9bl7KrXfN7RDw7P9pG2ObA', new Date(2022, 1, 1));
followers.set('ounM4vwlR9i1QlgUuhhjfnoejgsk', new Date(2022, 1, 1));
followers.set('ounM4v6MglHliLF7P3fWq36QKlqs', new Date(2022, 1, 1));
followers.set('ounM4v5jJLW_pMaBHlXS7oQd6rJw', new Date(2022, 0, 31));
followers.set('ounM4v5Xhi-2HX2CFBU-X32mdYK8', new Date(2022, 0, 31));
followers.set('ounM4v3udfZOGxvejHTWzZoHyTGU', new Date(2022, 0, 31));
followers.set('ounM4vwqIhC8_LsBhV_MJM49K2zY', new Date(2022, 0, 31));
followers.set('ounM4vz0EwGbsUPVGSmi0Txg5tL4', new Date(2022, 0, 31));
followers.set('ounM4vwU5tcJcL8mxZP81Go1z7TY', new Date(2022, 0, 31));
followers.set('ounM4vy8dRxdHsd65oCvGvD97u-w', new Date(2022, 0, 31));
followers.set('ounM4vwqgkVpOuhuhoAYtyO8hWAk', new Date(2022, 0, 31));
followers.set('ounM4v02TTjK6icpU2AOSLqWQNgI', new Date(2022, 0, 31));
followers.set('ounM4v0gg1WxblM_OshoEc8gUa4U', new Date(2022, 0, 31));
followers.set('ounM4v2X6GanlTZR3IVDSU947vKc', new Date(2022, 0, 31));
followers.set('ounM4v0PlKJhcQlT3_Ch1-3oILdQ', new Date(2022, 0, 30));
followers.set('ounM4vydpwSI5rmZpeHbNlcsbB8U', new Date(2022, 0, 30));
followers.set('ounM4v7rpBqlPuVoikgntygwzwW0', new Date(2022, 0, 23));
followers.set('ounM4v1bFob27auCdudIfGEhP3-k', new Date(2022, 0, 19));
followers.set('ounM4v5_EL0EoKNYea8JbLoG4gw4', new Date(2022, 0, 17));
followers.set('ounM4v0vbob2lwQfAMj5-kDOIx3w', new Date(2022, 0, 16));
followers.set('ounM4vz16Sp9dRWBj7auNOG5Mfvk', new Date(2022, 0, 15));
followers.set('ounM4v7JFjMBGkLwOf4ZJWwI144U', new Date(2022, 0, 12));
followers.set('ounM4vwiUxI2kAWzpA2SC5arkHJk', new Date(2022, 0, 5));
followers.set('ounM4v8HJ4nJlV5J9vxlZ6Hc-F6k', new Date(2021, 11, 19));
followers.set('ounM4v-R6eQxi4T0Q0fKncFglZi4', new Date(2021, 11, 19));
followers.set('ounM4v7VODM9VY1Pw73d_5plrxJ4', new Date(2021, 11, 5));
followers.set('ounM4vxCJkJ8x7-M1rBK9Al1z75w', new Date(2021, 9, 3));
followers.set('ounM4v6Mo45l4-HzSi1TAGPaxFyc', new Date(2021, 8, 29));
followers.set('ounM4v3ryP5_OoNcFt5CY0NS_YF4', new Date(2021, 8, 27));
followers.set('ounM4v3d9KW5XPxyhOUFZD6XtUiQ', new Date(2021, 8, 23));
followers.set('ounM4v-NLz_crzCiJiPp4Uncy9II', new Date(2021, 8, 14));
followers.set('ounM4vzsLQbG9VbeTU5P7jIIvnKg', new Date(2021, 8, 9));
followers.set('ounM4v_-4Vci1Y1YlBJGsQDHlR-g', new Date(2021, 8, 4));
followers.set('ounM4v3DLCybhWritTz1Jy8dvEPQ', new Date(2021, 8, 3));
followers.set('ounM4v5lFH39klBYFSNnZbsB0tfU', new Date(2021, 8, 3));
followers.set('ounM4vx9Y6fjH3aQNEN8DdekA71I', new Date(2021, 8, 3));
followers.set('ounM4v8auSGf1lyWmiu-52l17Uw8', new Date(2021, 7, 29));
followers.set('ounM4v-cyERFApMKhpVKI-TbWB8s', new Date(2021, 7, 22));
followers.set('ounM4vwyXXzkaD9ga92-lns1Ckc4', new Date(2021, 7, 20));
followers.set('ounM4v9wKnHELdV5hazaoUmVikqc', new Date(2021, 7, 15));
followers.set('ounM4v_TUToZowFHuheOlPi0PpQo', new Date(2021, 7, 15));
followers.set('ounM4v3aoLHlP8MwsuGwVUNiTA6w', new Date(2021, 6, 28));
followers.set('ounM4v67mrf9_hrdR2YSSWLLBYXY', new Date(2021, 6, 28));
followers.set('ounM4v_ZdMsEMigwYOwd8hZCT2LU', new Date(2021, 6, 27));
followers.set('ounM4vxEhWRcLV8eIZTOXc54RrhU', new Date(2021, 6, 24));
followers.set('ounM4v5CQnh8938acd3m4e_noE9I', new Date(2021, 6, 21));
followers.set('ounM4v202Wvt9aCs-mnxtw8Q9fTc', new Date(2021, 6, 21));
followers.set('ounM4v3rsJtbama7AWaIiwcPDiAk', new Date(2021, 6, 21));
followers.set('ounM4v215zF7CpQCe7kuaf1RNvRc', new Date(2021, 6, 18));
followers.set('ounM4vzjwZyyE2gpTh0O9iNTEI58', new Date(2021, 6, 18));
followers.set('ounM4vyd_uj4jbOBe0D0iTGCsgzs', new Date(2021, 6, 18));
followers.set('ounM4vzaXhmwBeFNWssZsXc1D6X8', new Date(2021, 6, 18));
followers.set('ounM4vxcsJFSG8aDWLYyDlcwD92Y', new Date(2021, 6, 18));
followers.set('ounM4v5G3uy6HIh3deKHmZdJHlWc', new Date(2021, 6, 18));
followers.set('ounM4vzbGTLZ-EICWCuZKFpQW2-o', new Date(2021, 6, 18));
followers.set('ounM4vz_F9xgkqHYUDl2EcD4YhmY', new Date(2021, 6, 18));
followers.set('ounM4v8ReqtWpR_DqXwspK9HqRTo', new Date(2021, 6, 18));
followers.set('ounM4vxGVlLhsp3LyvjmpGIhK0S0', new Date(2021, 6, 18));
followers.set('ounM4v03mWNRE7jXJa-rAlHDp-GQ', new Date(2021, 6, 18));
followers.set('ounM4v1jPGpqTHSuU9qygLwui15E', new Date(2021, 6, 18));
followers.set('ounM4vy0YqR0l0h59_kxsnNqYuaY', new Date(2021, 6, 18));
followers.set('ounM4v057AMvk625afnFA1XLwb2I', new Date(2021, 6, 18));
followers.set('ounM4v3ae_FPmjFrTUqEYzXE07mw', new Date(2021, 6, 18));
followers.set('ounM4v2YftAJpOmfSg3wRBTvLs_Y', new Date(2021, 6, 18));
followers.set('ounM4v3YtC4p0tpbGhRkGQvMXm4c', new Date(2021, 6, 18));
followers.set('ounM4vy3CPvPlT-GhWwwQ28GDVsQ', new Date(2021, 6, 18));
followers.set('ounM4v1ex5UMuYV5lvmOLXmQxQVg', new Date(2021, 6, 18));
followers.set('ounM4vwp5slD9IF7N4NNx7NOtnMY', new Date(2021, 6, 18));
followers.set('ounM4v0S5ED1nwUl0P1XonMawFF0', new Date(2021, 6, 18));
followers.set('ounM4v9ujJm8YAZcOl2gHfNN__Ps', new Date(2021, 6, 18));
followers.set('ounM4v7UJnmRTrmakcCwvz1g2XHo', new Date(2021, 6, 18));
followers.set('ounM4v1grWXptLxrKvdj27FDued4', new Date(2021, 6, 18));
followers.set('ounM4v9UTzUDY9g0yvq9Afu_0k3Q', new Date(2021, 6, 18));
followers.set('ounM4v1LBhPmKF32m-kVwzA4liTA', new Date(2021, 6, 18));
followers.set('ounM4v89URIy2JV-1Dlx9BOBeDQ4', new Date(2021, 6, 18));
followers.set('ounM4vxOYWRRZAdRLFjc4QtdTM2g', new Date(2021, 6, 18));
followers.set('ounM4v1aE4p3l1kLbW_2wybZREIY', new Date(2021, 6, 18));
followers.set('ounM4vwqGwx5wXTqvQzLgjTQOnVk', new Date(2021, 6, 18));
followers.set('ounM4v6fHLIm6VUDqTEdDq0zzIKI', new Date(2021, 6, 18));
followers.set('ounM4vwD3Js2jQQNBnphpOP17SNk', new Date(2021, 6, 18));
followers.set('ounM4v6miWLMUzwTmvArcM1rOelw', new Date(2021, 6, 18));
followers.set('ounM4v_2V4d_4Ms73TGYey5jk6ws', new Date(2021, 6, 18));
followers.set('ounM4v_0gnK-jvaYN305lBjMfb48', new Date(2021, 6, 18));
followers.set('ounM4v1d8cGXoz2BRMzu6Y37tvUY', new Date(2021, 6, 18));
followers.set('ounM4v8UhWBxS5Sz0UWE_y0hFgWg', new Date(2021, 6, 18));
followers.set('ounM4vzfO3JZxlRGwZFM2_SktXo0', new Date(2021, 6, 18));
followers.set('ounM4vwIOHs6Jrwzx2qnC2X6-3tY', new Date(2021, 6, 18));
followers.set('ounM4v7cZjvy-GUxYUjMdpwpC2tQ', new Date(2021, 6, 18));
followers.set('ounM4v9hQbOemB6NweCcVz-FKvXg', new Date(2021, 6, 18));
followers.set('ounM4vyOTXWog1WylnyCjAt7Z2AU', new Date(2021, 6, 18));
followers.set('ounM4v9umleLXOOaO0ZY5zzcXpqQ', new Date(2021, 6, 18));
followers.set('ounM4v__Cp0C9a8_BJZIj_4DBwkM', new Date(2021, 6, 18));
followers.set('ounM4v1Ja_z4f_SH9cO1lRzQI9Xk', new Date(2021, 6, 18));
followers.set('ounM4vw8wBYiV7zU4Yxu8ogMv5tY', new Date(2021, 6, 18));
followers.set('ounM4v2bMlG1qhdHpzRQ1jEAT83U', new Date(2021, 6, 18));
followers.set('ounM4vwWBQDcvcfZMUwgzugMs1O8', new Date(2021, 6, 18));
followers.set('ounM4v9Co8cvRTVIamhydx01qpLk', new Date(2021, 6, 18));
followers.set('ounM4vx5okk-b5x_-BJpbiaYQOEQ', new Date(2021, 6, 18));
followers.set('ounM4v-fEz9x-TL380cbC0TGGExI', new Date(2021, 6, 18));
followers.set('ounM4v7H5hmzcarIgrgtcaApoACc', new Date(2021, 6, 18));
followers.set('ounM4v4K7tr5yHN_4_Z1bAQsYUpg', new Date(2021, 6, 18));
followers.set('ounM4v43UV6FPrS49X7ShSUfLnA8', new Date(2021, 6, 18));
followers.set('ounM4v3WPJ-4pV7kkldSZ8f9T1og', new Date(2021, 6, 14));
followers.set('ounM4v41x1WQiy8_FeCH23rTm37w', new Date(2021, 6, 11));
followers.set('ounM4v8BIoW_NyRQgwsZAcDrNJd0', new Date(2021, 5, 29));
followers.set('ounM4v2MoYQMKC_rGECJEkaMj_SE', new Date(2021, 5, 21));
followers.set('ounM4v_7GMFIGIgfvlWEFmj7nROE', new Date(2021, 5, 9));
followers.set('ounM4v6w-G0X-dAXOPgQwK6Sixno', new Date(2021, 5, 2));
followers.set('ounM4v7GntMVuPw1Bvn75h0TbVUE', new Date(2021, 4, 5));
followers.set('ounM4v44EEHXTPfx9p31eLsvEacY', new Date(2021, 3, 25));
followers.set('ounM4vyPaR4P-udasNG3G5Wa02iM', new Date(2021, 3, 11));
followers.set('ounM4v4OnwvqKz7quzGM3q1o-9R4', new Date(2021, 3, 8));
followers.set('ounM4v66yITer_1T_VYm8AkHtaQU', new Date(2021, 2, 1));
followers.set('ounM4v-Iyjbvn1P_gAcTxdfHD7o8', new Date(2021, 1, 16));
followers.set('ounM4v7YwIvIQp11TWEU8OLpydAo', new Date(2021, 1, 16));
followers.set('ounM4vwa5vrXhclypYu5fV3xMHjk', new Date(2021, 1, 16));
followers.set('ounM4vz7e2OoGW6PfqI70XBWr7eQ', new Date(2021, 1, 15));
followers.set('ounM4v0qITYCGYZX5xhyd9PHS4SA', new Date(2021, 1, 15));
followers.set('ounM4v6KYNWl__eHX3cO5E6zdN6c', new Date(2021, 1, 15));
followers.set('ounM4v0ZxEhwNxWxGQBWUjm1q3Hc', new Date(2021, 1, 14));
followers.set('ounM4v_bQtOgfljCejrYt9mlJSh8', new Date(2021, 1, 14));
followers.set('ounM4vyGdw4ZaqvCmA5GUwqOvnU4', new Date(2021, 1, 14));
followers.set('ounM4vyoNXUB4rWEaDVGfazSaE-0', new Date(2021, 1, 14));
followers.set('ounM4v23Sn9bU0XlxKHISXnOJ9QA', new Date(2021, 1, 14));
followers.set('ounM4v520QUWoh5SuG7JQd8XONO0', new Date(2021, 1, 14));
followers.set('ounM4v7aA_15CSHIHCv3l-isVILo', new Date(2021, 1, 14));
followers.set('ounM4v9XCnpfp9xOEh2cdew8rrhk', new Date(2021, 1, 14));
followers.set('ounM4v_LtYYJq0L-IFk7IoK69GMY', new Date(2021, 1, 14));
followers.set('ounM4vyvFw8g_l1jzBkVZiVFEsyo', new Date(2021, 1, 14));
followers.set('ounM4v4jCbvG2BQquakLAT4TlERQ', new Date(2021, 1, 14));
followers.set('ounM4v1mxKmZmmOnvepMcpJLcse0', new Date(2021, 1, 14));
followers.set('ounM4v9IawQMCmnbsWRfNbRiAjJI', new Date(2021, 1, 14));
followers.set('ounM4v1pLMLIaUL--naGz4GKALqw', new Date(2021, 1, 14));
followers.set('ounM4v8LsUdBWipW15hTCtk4eltY', new Date(2021, 1, 14));
followers.set('ounM4v2AntdZqkeMUljk5IUvYGYc', new Date(2021, 1, 14));
followers.set('ounM4v8oWKsne-A71uFcfb8v2Xmc', new Date(2021, 1, 14));
followers.set('ounM4v80txalvy8zEKAPwqLK2DPE', new Date(2021, 1, 14));
followers.set('ounM4v8geLuoZZoyPnt7Y_FcwWX0', new Date(2021, 1, 14));
followers.set('ounM4vz44qfUfCrlVhQi1wwDNdF4', new Date(2021, 1, 14));
followers.set('ounM4v8bAbo1efkgkO69FJcm5lEo', new Date(2021, 1, 14));
followers.set('ounM4v21J2ZXnzkJZ2XeusG-zhbA', new Date(2021, 1, 14));
followers.set('ounM4vzO6DYw-8Qevw5EsTAxz3y4', new Date(2021, 1, 14));
followers.set('ounM4v8hWYdo38l9mpd9eQySzEsA', new Date(2021, 1, 14));
followers.set('ounM4v8EWzkrDmr-tnYJfDcV9BuI', new Date(2021, 1, 14));
followers.set('ounM4v0EFqOsZ2u6H5TubvEULR-Y', new Date(2021, 1, 14));
followers.set('ounM4v0OUnh1qYZ_ScSw8z8QCkJs', new Date(2021, 1, 14));
followers.set('ounM4v0hRkvRQAVE1jUJtYaGW9WU', new Date(2021, 1, 14));
followers.set('ounM4v636Mm5jFvxQ0TgBhaDc1Q8', new Date(2021, 1, 14));
followers.set('ounM4vwW7b-DMeByBumPCbwWH4hc', new Date(2021, 1, 14));
followers.set('ounM4v_kcW5ujX9-XHRj0fRVeLp4', new Date(2021, 1, 14));
followers.set('ounM4v1FAT2KZCp9_BSQYkTWVBls', new Date(2021, 1, 14));
followers.set('ounM4v0qG162psiBiYu8Ugl7iq7Q', new Date(2021, 1, 14));
followers.set('ounM4v_hH5_pB2fLCM5U1sd4kDAE', new Date(2021, 1, 14));
followers.set('ounM4v-xQTzllundmcWJmWlqmwHM', new Date(2021, 1, 14));
followers.set('ounM4v_7iWDDmgEnUMRKRLMdKExY', new Date(2021, 1, 14));
followers.set('ounM4v25kbuyBUUasf6VvH1Antwk', new Date(2021, 1, 14));
followers.set('ounM4v4e1M_NCfZIuXe_EcM91BPE', new Date(2021, 1, 14));
followers.set('ounM4v60GZp2rtxt2mQrA59gkSLs', new Date(2021, 1, 14));
followers.set('ounM4vytfQL7kOLRdNk9_YUNAbBc', new Date(2021, 1, 14));
followers.set('ounM4v7RC-UlUDFhLSu_U6pQ7T8o', new Date(2021, 1, 14));
followers.set('ounM4v5MZx463Snn26Hxwrf7oaiI', new Date(2021, 1, 14));
followers.set('ounM4v0ifineRHCk8fpm11T3BPGw', new Date(2021, 1, 14));
followers.set('ounM4vx-JPWBRIS94zrOqBrd71e0', new Date(2021, 1, 14));
followers.set('ounM4vzBGueaPy2AqvOEvRuiWQ5Q', new Date(2021, 1, 14));
followers.set('ounM4v0yTKH6PQoYBVEIKZPjPUy8', new Date(2021, 1, 14));
followers.set('ounM4v3r8nk4OyG1uhBNpYNhYF9A', new Date(2021, 1, 14));
followers.set('ounM4v1iG428fujVGMrOZ6Kq9u3o', new Date(2021, 1, 14));
followers.set('ounM4vxpTeh_AjhVh3E0Xp5_8ndo', new Date(2021, 1, 14));
followers.set('ounM4v3JkQLHOiAUdCfMeoXh6ru8', new Date(2021, 1, 14));
followers.set('ounM4v_7RyFfTk97rXNBgHqWjy4w', new Date(2021, 1, 14));
followers.set('ounM4v-uCRSzPDi4z5YRwWBVGRbc', new Date(2021, 1, 14));
followers.set('ounM4v4MQHGivxl4dDRLa63sp144', new Date(2021, 1, 14));
followers.set('ounM4v-zYMTfu6INcFlLLXqFl-0U', new Date(2021, 1, 14));
followers.set('ounM4vxb4ijUTka2iYKacUQGp9PE', new Date(2021, 1, 14));
followers.set('ounM4v3IN9exn4gQd-Ad1SeWaJm4', new Date(2021, 1, 14));
followers.set('ounM4v5aY6YnPvrFeoXR6jeDxL-A', new Date(2021, 1, 14));
followers.set('ounM4vzwQmMwkA0QNYPHRGjWDdlA', new Date(2021, 1, 14));
followers.set('ounM4v0R-Fgn0UiwmXGnIDQ7qodE', new Date(2021, 1, 14));
followers.set('ounM4vy7W3FbUoWadpwnU9wVI7ng', new Date(2021, 1, 14));
followers.set('ounM4v1c4zRN4bCbJl-kRZfFU98o', new Date(2021, 1, 13));
followers.set('ounM4vyusZXVGEb5zY4fDs23kjTM', new Date(2021, 1, 13));
followers.set('ounM4vynTVAn9-2NOZmM7Jz8N4FQ', new Date(2021, 1, 13));
followers.set('ounM4v5Q0tmDDWsbHeaTiJ2B-SMU', new Date(2021, 1, 13));
followers.set('ounM4v0VB7qtUZn9kmvqD75E5oAs', new Date(2021, 1, 13));
followers.set('ounM4vyr9H_IAQIUVFhzvA8qeMsc', new Date(2021, 1, 13));
followers.set('ounM4v-LHB5RqizU3WWz3m0eFpFE', new Date(2021, 1, 13));
followers.set('ounM4vxtPFtk2ZER-FEhp0eJ0lVs', new Date(2021, 1, 13));
followers.set('ounM4v55AFuD6MIcSkx0zUVxxJzQ', new Date(2021, 1, 13));
followers.set('ounM4vzxEfo28M39MTXj7mlaldaU', new Date(2021, 1, 13));
followers.set('ounM4v3H0PbbSit7Rma5Q0UU7XEQ', new Date(2021, 1, 13));
followers.set('ounM4v-KdvOjjO27iShIsnfOGEsg', new Date(2021, 1, 13));
followers.set('ounM4v-RgSJJpucDBYbB4lkkGnm4', new Date(2021, 1, 12));
followers.set('ounM4v3p31hh1ZiSdvUFhULLTvs4', new Date(2021, 1, 12));
followers.set('ounM4v8Qd2l8UcNB6R7G1XKJU7GA', new Date(2021, 1, 12));
followers.set('ounM4vwkaT0hkQjfqajYAGpE733s', new Date(2021, 1, 12));
followers.set('ounM4vwON4GXjX2Yb4ZZ9zv0t9js', new Date(2021, 1, 12));
followers.set('ounM4vxfX5oxm2Ed2x8X-2CFIn-A', new Date(2021, 1, 12));
followers.set('ounM4vwCzWJJMExAIVl6HB6nFquY', new Date(2021, 1, 12));
followers.set('ounM4v4ecQW2LKOqmcgdfpssYO_Q', new Date(2021, 1, 12));
followers.set('ounM4vwDLlUID9nBMBQjMppCPyO0', new Date(2021, 1, 11));
followers.set('ounM4vyXJhnP9cJ0KBh1MRpj3fbU', new Date(2021, 1, 11));
followers.set('ounM4vzd7BcmPinqhxaoBCPuTgXw', new Date(2021, 1, 11));
followers.set('ounM4v7yuOou12WUT38gQMumYHhk', new Date(2021, 1, 11));
followers.set('ounM4v0er1M8RzjvAgAgBCxuNhlQ', new Date(2021, 1, 11));
followers.set('ounM4v0TELIDP62FjiYyKraVTrPs', new Date(2021, 1, 11));
followers.set('ounM4vyasTOovpH2FMOv_7gSATXI', new Date(2021, 1, 11));
followers.set('ounM4v0t3mMghc24ZoRaEnXH-pK8', new Date(2021, 0, 31));
followers.set('ounM4v7dF6suDVlzYiiKnzL6Kprk', new Date(2021, 0, 28));
followers.set('ounM4v5sDYDSAaXvuyxchfNYfFPY', new Date(2021, 0, 25));
followers.set('ounM4vwJBBzXrX1EsYTxKt7uWle8', new Date(2021, 0, 25));
followers.set('ounM4v4cFotgDyF5hC9fZXT1l9As', new Date(2021, 0, 24));
followers.set('ounM4vzP4tZP3oUXevp-VlO28vQY', new Date(2021, 0, 3));
followers.set('ounM4v8LnKmJJqdng9ofoBqVy1Xc', new Date(2021, 0, 3));
followers.set('ounM4v2EjduO_o6KsmWfimyHzQ50', new Date(2020, 11, 6));
followers.set('ounM4v4wwKHi_4LSQdgmqEEGDrgY', new Date(2020, 10, 20));
followers.set('ounM4v_icZRUR6EbG6t2m64rhvYQ', new Date(2020, 10, 15));
followers.set('ounM4v8txk5dS_vu3Wmxk4pzednk', new Date(2020, 10, 8));
followers.set('ounM4v8yuuSTyRhlI4psZeNfO-oQ', new Date(2020, 10, 8));
followers.set('ounM4v_5EMGxwoNREk1K20_U4ufs', new Date(2020, 10, 8));
followers.set('ounM4vw73MkNkV9L4bXDZnWiSmPU', new Date(2020, 10, 8));
followers.set('ounM4v7z45mhMnSdhQd3_5MtsnEM', new Date(2020, 10, 8));
followers.set('ounM4vykM2vjEnMduuXJpPoNtNYE', new Date(2020, 10, 8));
followers.set('ounM4v32tfkw9WeXHZh6UhaNtGF8', new Date(2020, 10, 8));
followers.set('ounM4v8wvceJRv4z7VssfOF4zfko', new Date(2020, 8, 20));
followers.set('ounM4v4CJb2_ZyE4KD1zr8F4mBmQ', new Date(2020, 8, 20));
followers.set('ounM4v-zoDms3lNsH-8bl53nrxl8', new Date(2020, 7, 18));
followers.set('ounM4v_BzKO8o84Newv51vadZ9U8', new Date(2020, 7, 2));
followers.set('ounM4v74GpiExtKFrlFMfWOnnBgo', new Date(2020, 7, 2));
followers.set('ounM4v16RMZXeNBTZIUPiMs2Fse0', new Date(2020, 7, 2));
followers.set('ounM4v3OFOjBPbZh2xJ6m-nzHRKk', new Date(2020, 7, 2));
followers.set('ounM4v97geqvfACI7ulRgBUumi_U', new Date(2020, 7, 2));
followers.set('ounM4v_YzJudIyTabo41bzbyzzPc', new Date(2020, 7, 2));
followers.set('ounM4v6EKIAac2Ms40clVlm52D4o', new Date(2020, 7, 2));
followers.set('ounM4v7x9Wtme_3L3DL7j9pfLbZc', new Date(2020, 6, 30));
followers.set('ounM4v7M6Tu43m9rt33IVYONWG9o', new Date(2020, 6, 19));
followers.set('ounM4v9CUjIHDTDOwDSbv1OCpFO4', new Date(2020, 5, 27));
followers.set('ounM4v7T7f0VFDd8LwpWosNEQQMA', new Date(2020, 5, 27));
followers.set('ounM4v3wicrVN1W1UIfT3wurei80', new Date(2020, 5, 27));
followers.set('ounM4v9Tmck3MizjVvE3IMRh0RGk', new Date(2020, 5, 27));
followers.set('ounM4vw50WtnaCIf0ZlDhSa2buo0', new Date(2020, 5, 23));
followers.set('ounM4v4ROMb5nx92jUFtBXrGUIa0', new Date(2020, 5, 1));
followers.set('ounM4v82NLx2udB_86j9RakG77LQ', new Date(2020, 3, 17));
followers.set('ounM4v_fWQqA2E7_6Ywmv6m0RHfQ', new Date(2020, 3, 17));
followers.set('ounM4vyBh8udSS1Zo7WSlgqTGbBs', new Date(2020, 3, 17));
followers.set('ounM4v4HNpshPV70MwRoGx_OPU5s', new Date(2020, 3, 3));
followers.set('ounM4v7gtPF7Yb6iUN1RPeLeEVF0', new Date(2020, 2, 6));
followers.set('ounM4v7otDTyUB8zYgcPu7v49c0w', new Date(2020, 2, 5));
followers.set('ounM4vwYO6A5bLVDN0ISpS4AjOD4', new Date(2020, 2, 3));
followers.set('ounM4vz23fybLtG3HIN5CDSLOLLE', new Date(2020, 1, 19));
followers.set('ounM4vy2JbuThgDZRXqrvMGiBRe4', new Date(2020, 0, 16));
followers.set('ounM4v8rOwhEDWkKgBWdo4Goztfc', new Date(2020, 0, 10));
followers.set('ounM4vwWB-mIDDbINZpDSfePB9U4', new Date(2020, 0, 9));
followers.set('ounM4v8JipwUdchq-2yCESIhzKsM', new Date(2020, 0, 8));
followers.set('ounM4v0avlYzbbz0ziGZFXR5-V4g', new Date(2020, 0, 6));
followers.set('ounM4vxZtZwrM36IXLv5EaPwTqh8', new Date(2020, 0, 5));
followers.set('ounM4v2snOZPVJOgTYOG3zBYeG18', new Date(2020, 0, 5));
followers.set('ounM4v94lV38ZlOHdkY6fchtObWE', new Date(2020, 0, 5));
followers.set('ounM4v0P9TW-Yur62iTNU2mTcmho', new Date(2020, 0, 5));
followers.set('ounM4vxEnoc2MWk8wr9rAUuMT8vg', new Date(2020, 0, 5));
followers.set('ounM4v-o9BjWdvY82dyoSAmdBdCQ', new Date(2020, 0, 5));

let getSubscribeDate = (key) => {
    if (followers.has(key)) {
        console.debug(followers.get(key));
        return followers.get(key).getTime();
    } else {
        console.debug('New comer');
        return Date.now();
    }
};
let baseByDays = function(key) {
    return (new Date(2022, 1, 3, 18).getTime() - getSubscribeDate(key)) / 1000 / 60 / 60 / 24 / 30;
};

const cowWords = [
    '青牛紫气', '牛气冲天', '牛运亨通', '牛势冲盘', '财如牛毛',
    '牛转新运', '奋牛蹄春', '牛羊满圈', '牛年鸿运', '牛转新机',
    '牛年如意', '牛财旺盛', '牛福永恒', '牛股相随', '牛运无边',
    '强壮如牛', '平安就牛', '财气真牛', '业绩倍牛', '运势超牛',
    '惊喜福牛', '牛劲十足'
];

const tigerWords = [
    '如虎添翼', '虎虎生威', '虎运亨通', '虎啸风生', '虎年吉祥',
    '虎年大吉', '福虎报喜', '虎头虎脑', '虎跃龙腾', '生龙活虎',
    '龙骧虎步', '风虎云龙', '爱老虎油', '龙蟠虎踞', '伏虎降龙',
    '龙行虎步', '云龙风虎', '鹰扬虎视', '龙吟虎啸', '虎体熊腰'
];

const goodWords = tigerWords;
let words = [];

let randomWord = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

let demoBonus = function (key, word) {
    return (Math.abs(Math.sin((key + word).hashCode() + Date.now() * Math.random()))
        * (Date.now() - new Date(2020, 0, 5).getTime())
        / 1000 / 60 / 60 / 24 / 30)
        .toFixed(2);
};
let formalBonus = function (key, word) {
    return (Math.abs(Math.sin((key + word).hashCode() + Date.now() * Math.random())) * baseByDays(key)).toFixed(2);
};

let used = new Map();
let pool = 0;
let lot = function (key, word) {
    words.push(word);
    if (!used.has(key)) {
        let bonus = formalBonus(key, word);
        if (bonus > 1) {
            // used.set(key, bonus);
            console.debug(new Date());
            console.debug(used);
            return '【正式抽奖从初三2月3日12点开始，当前提示文字为测试内容】恭喜您获得 ' + bonus + ' 元红包！祝您 2022 年' + randomWord(goodWords) + '!';
        } else if (bonus > 0) {
            pool += parseFloat(bonus);
            console.debug(pool.toFixed(2));
            return '【正式抽奖从初三2月3日12点开始，当前提示文字为测试内容】恭喜您为阳光普照奖池贡献 ' + bonus + ' 元！当前奖池总金额 ' + pool.toFixed(2) + ' 元，将在活动结束后通过公众号推送支付宝口令！祝您 2022 年' + randomWord(goodWords) + '!';
        }
    }
    return '【正式抽奖从初三2月3日12点开始，当前提示文字为测试内容】每人仅一次机会。祝您 2022 年' + randomWord(words) + '!【此消息内容为从大家的抽奖口令中随机生成，若出现一些奇奇怪怪的词语，切莫当真】';
};

handler.response = (msg, fromUser) => {
    handler.envelop(lot(fromUser, msg));
};
