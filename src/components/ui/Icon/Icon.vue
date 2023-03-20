<template>
  <div class="container" :class="{'no_border': no_border}" :style="{'border-color': iconStrokeColor}">
    <svg class="svg" width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'ok'">
      <line y1="-1.5" x2="33.0639" y2="-1.5" transform="matrix(0.672581 -0.740024 0.829275 0.558842 18.7618 26.4681)" :stroke="iconStrokeColor" stroke-width="6"/>
      <path d="M18.1441 27L1.49461 13.8501" :stroke="iconStrokeColor" stroke-width="6"/>
    </svg>

    <svg class="svg" width="12" height="64" viewBox="0 0 12 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'attention'">
      <ellipse cx="6" cy="55.7576" rx="6" ry="8.24242" :fill="iconFillColor"/>
      <path d="M11.9753 22.7879C11.2284 35.3212 9.30007 45.5758 6 45.5758C2.69993 45.5758 0.771605 35.3212 0.0246912 22.7879C0.0246912 10.2025 -0.722222 0 6 0C12.7222 0 11.9753 10.2025 11.9753 22.7879Z" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'repeat'">
      <path d="M61.9424 16.6314L36.5481 29.0437C36.2159 29.206 35.8285 28.9642 35.8285 28.5945V3.76984C35.8285 3.40012 36.2159 3.15827 36.5481 3.32063L61.9424 15.7329C62.3163 15.9157 62.3163 16.4486 61.9424 16.6314Z" :fill="iconFillColor" :stroke="iconStrokeColor"/>
      <path d="M37.0073 16.2957C-26.521 22.6495 37.0075 91.9861 57.3323 35.5606" :stroke="iconStrokeColor" stroke-width="8"/>
    </svg>

    <svg class="svg" width="53" height="64" viewBox="0 0 53 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'arrow_r'">
      <path d="M53 19.5689L37.1331 40.5523V0L53 19.5689Z" :fill="iconFillColor"/>
      <rect x="26.2201" y="12.2128" width="10.913" height="15.0892" :fill="iconFillColor"/>
      <path d="M36.6798 59.9568L35.4674 60.0406V63.6625H36.6798L37.9288 63.3212L40.0228 62.2972L41.247 61.541L42.3239 60.4095L43.8317 58.6403L44.3342 57.8166L44.765 56.968L45.2317 55.978L45.9137 53.9979L46.1291 53.1022L46.3445 52.1121L46.4881 51.075L46.5958 50.0378L46.6245 49.3306L43.7332 49.4249L43.6974 50.0378L43.4393 51.424L43.1454 52.4967L42.4474 54.4471L41.3821 56.2511L40.4269 57.5189L39.1778 58.6403L37.9288 59.4692L36.6798 59.9568Z" :fill="iconFillColor" :stroke="iconStrokeColor"/>
      <path d="M4.10693 18.8615L4.07103 19.7103L1.30688 19.7575V18.8615L1.37868 18.1071L1.48637 17.164L1.59407 16.551L1.70176 16.0795L2.02484 14.9006L2.56331 13.3917L2.92229 12.4958L3.31717 11.7413L3.89154 10.7511L4.32231 10.0909L4.78899 9.52508L5.36336 8.86493L6.44029 7.78039L7.58903 6.88447L8.98905 6.08285C8.98905 6.08285 9.74291 5.79993 10.3532 5.56416C10.9634 5.32839 10.9993 5.28123 11.3583 5.28123H11.9327V8.86493H11.6814L11.2506 8.95924L10.425 9.28931L9.8147 9.57224L9.16854 9.90231L8.63007 10.2795L8.0557 10.7511L7.37364 11.3169L7.01466 11.7413L6.44029 12.4958L5.83003 13.3917L5.43515 14.1933L5.07617 14.9478L4.82489 15.5608L4.6454 16.1266L4.46591 16.7396L4.28642 17.4469L4.17872 18.1071L4.10693 18.8615Z" :fill="iconFillColor" :stroke="iconStrokeColor"/>
      <path d="M4.08085 49.3306H1.19925V50.4116L1.38397 51.4456L1.67952 53.1846L2.45533 55.3465L3.08337 56.8505L4.0439 58.5425L5.04138 59.7645L5.92802 60.7514L6.74078 61.5034L8.0338 62.3964L8.8835 62.8194L9.54849 63.1484L10.7676 63.5244L11.9498 63.6654H12.3562H12.6148V60.0465H12.1345L11.6912 59.9525L10.546 59.6705L9.69626 59.2475L8.47713 58.5425L7.62742 57.7905L7.36882 57.5085L7.07327 57.1795L6.88855 56.9445L6.74078 56.7565L6.51912 56.4745L6.29746 56.1925L6.00191 55.7225L5.70636 55.2525L5.55859 54.9705L5.41081 54.6885L5.26304 54.4065L5.11526 54.1246L4.96749 53.7486L4.8936 53.5606L4.74583 53.1846L4.59805 52.7146L4.45028 52.1506L4.37639 51.8686L4.30251 51.6336L4.22862 51.3046L4.15473 50.8346L4.08085 50.2706V49.8946V49.3306Z" :fill="iconFillColor" :stroke="iconStrokeColor"/>
      <path d="M11.7586 4.94604L20.7241 4.94604V9.18458H11.9578L11.7586 4.94604Z" :fill="iconFillColor"/>
      <path d="M1.08261 19.5204L4.26743 19.4726V49.3306H2.63372H1L1.08261 19.5204Z" :fill="iconFillColor"/>
      <rect x="12.7548" y="59.716" width="22.7126" height="4.28398" :fill="iconFillColor"/>
      <path d="M43.636 39.5943H46.8238V49.0061L43.4817 49.9797L43.636 39.5943Z" :fill="iconFillColor"/>
      <path d="M23.5621 12.8825L26.3027 12.5598V26.7679L26.2666 26.9696L25.5094 26.9371L24.716 27.0367L23.8866 27.3054L23.1294 27.5742L22.2639 28.0669L21.4706 28.5148L20.6051 29.0971L19.8839 29.7242L19.2348 30.3961L18.6218 31.0679L18.0448 31.8742L17.5039 32.77L16.7827 34.2482L16.0976 36.0398L15.5927 38.2794L15.3403 40.0263L15.2682 41.4148V43.4753V45.6253L15.4124 46.7003L15.7009 49.2982L14.4027 46.7003L13.3209 44.3711L12.7079 42.8034L12.0588 41.1013L11.3737 38.7273L10.9049 36.8909L10.6525 35.2336L10.364 33.0388V31.2023L10.5082 29.1419L10.9049 26.7231L11.4819 24.7971L12.2391 22.8263L13.5373 20.5419L15.124 18.5263L16.8909 16.6898L18.8742 15.2117L20.6051 14.1815L23.5621 12.8825Z" :fill="iconFillColor" :stroke="iconStrokeColor"/>
    </svg>

    <svg class="svg" width="83" height="78" viewBox="0 0 83 78" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'door_unlock'">
      <g filter="url(#filter0_d_1_8)">
        <rect x="4" y="28.2041" width="54.6187" height="41.7959" rx="10" :fill="iconFillColor"/>
      </g>
      <path d="M46.5396 28.2041C46.5396 -1.08891 77 -1.71217 77 28.2041" :stroke="iconStrokeColor" stroke-width="11"/>
      <defs>
        <filter id="filter0_d_1_8" x="0" y="28.2041" width="62.6187" height="49.7959" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/>
        </filter>
      </defs>
    </svg>

    <svg class="svg" width="81" height="78" viewBox="0 0 81 78" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'door_lock'">
      <g filter="url(#filter0_d_1_7)">
        <rect x="4" y="28.2041" width="73" height="41.7959" rx="10" :fill="iconFillColor"/>
      </g>
      <path d="M20.1442 28.2041C20.1442 -1.08891 60.8558 -1.71217 60.8558 28.2041" :stroke="iconStrokeColor" stroke-width="11"/>
      <defs>
        <filter id="filter0_d_1_7" x="0" y="28.2041" width="81" height="49.7959" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_7"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_7" result="shape"/>
        </filter>
      </defs>
    </svg>

    <svg class="svg" width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='triangle-right'">
      <path d="M55 28L0.25 55.7128L0.25 0.287188L55 28Z" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='triangle-top'">
      <path d="M28 0L55.7128 54.75H0.287188L28 0Z" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='triangle-bottom'">
      <path d="M28 55L0.287186 0.25L55.7128 0.25L28 55Z" :fill="iconFillColor"/>
    </svg>

    <svg class="mark-index" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='mark-index'">
      <rect x="0.960815" y="14.4071" width="8.96552" height="8.97903" :fill="iconFillColor"/>
      <rect x="11.7194" y="0.0406799" width="10.7586" height="8.97903" :fill="iconFillColor"/>
      <path d="M5.44359 14.4072C5.44359 10.8155 4.54704 4.53017 11.7195 4.53031" :stroke="iconStrokeColor" :stroke-width="iconStrokeWidth"/>
      <rect x="52.9608" y="35.6336" width="8.96552" height="5.38742" transform="rotate(-180 52.9608 35.6336)" :fill="iconFillColor"/>
      <rect x="42.2022" y="50" width="12.5517" height="8.97903" transform="rotate(-180 42.2022 50)" :fill="iconFillColor"/>
      <path d="M48.478 35.6335C48.478 39.2252 49.3746 45.5105 42.2022 45.5104" :stroke="iconStrokeColor" :stroke-width="iconStrokeWidth"/>
      <rect x="15.3056" y="50" width="8.97903" height="7.17241" transform="rotate(-90 15.3056 50)" :fill="iconFillColor"/>
      <rect x="0.960815" y="39.2252" width="8.97903" height="8.96552" transform="rotate(-90 0.960815 39.2252)" :fill="iconFillColor"/>
      <path d="M15.3057 45.5105C11.7195 45.5105 5.44356 46.4084 5.4437 39.2252" :stroke="iconStrokeColor" :stroke-width="iconStrokeWidth"/>
      <rect x="38.616" y="0.0406799" width="8.97903" height="8.96552" transform="rotate(90 38.616 0.0406799)" :fill="iconFillColor"/>
      <rect x="52.9608" y="10.8155" width="12.5706" height="8.96552" transform="rotate(90 52.9608 10.8155)" :fill="iconFillColor"/>
      <path d="M38.6159 4.53021C42.2022 4.53021 48.4781 3.63231 48.4779 10.8155" :stroke="iconStrokeColor" :stroke-width="iconStrokeWidth"/>
    </svg>

    <svg class="svg" version="1.0" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='settings'"
         width="1280.000000pt" height="1280.000000pt" viewBox="0 0 1280.000000 1280.000000"
         preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
         :fill="iconFillColor" :stroke="iconStrokeColor">
        <path d="M5385 12786 c-92 -29 -158 -87 -199 -175 -21 -45 -21 -56 -24 -687
        l-3 -640 -102 -29 c-388 -108 -835 -298 -1166 -495 l-85 -51 -465 465 c-439
        437 -469 465 -521 482 -82 27 -173 23 -246 -10 -53 -24 -130 -98 -730 -699
        -746 -747 -718 -714 -719 -847 0 -142 -17 -120 494 -633 l456 -458 -24 -42
        c-132 -236 -243 -467 -329 -682 -59 -148 -154 -435 -189 -570 l-18 -70 -640
        -5 -640 -5 -57 -28 c-65 -32 -121 -89 -152 -156 l-21 -46 0 -1005 0 -1005 28
        -57 c32 -65 89 -121 156 -152 45 -21 56 -21 691 -24 l645 -3 43 -151 c104
        -365 300 -824 477 -1112 l44 -71 -57 -60 c-31 -33 -179 -184 -327 -335 -610
        -619 -580 -582 -580 -725 1 -63 6 -90 24 -130 19 -40 160 -187 695 -722 460
        -460 685 -678 714 -692 90 -45 197 -47 290 -5 23 11 208 188 497 476 l461 458
        114 -65 c328 -187 711 -348 1077 -453 l162 -47 3 -645 c3 -635 3 -646 24 -691
        31 -67 87 -124 152 -156 l57 -28 1005 0 1005 0 57 28 c65 32 121 89 152 156
        21 45 21 56 24 687 l3 642 62 17 c408 111 818 282 1186 493 l114 65 456 -460
        c514 -519 499 -507 636 -507 63 0 91 5 130 23 73 34 1390 1352 1426 1426 34
        71 34 200 0 265 -15 30 -174 197 -482 506 l-460 460 56 95 c85 142 235 454
        308 639 66 166 148 414 182 547 l19 72 645 3 c636 3 647 3 692 24 67 31 124
        87 156 152 l28 57 0 1005 0 1005 -28 57 c-32 65 -89 121 -156 152 -45 21 -56
        21 -687 24 l-642 3 -11 44 c-91 360 -280 819 -490 1185 l-71 124 464 466 c520
        521 502 498 500 640 -1 134 23 106 -722 852 -595 595 -673 670 -726 694 -73
        33 -164 37 -246 10 -52 -17 -82 -45 -520 -482 l-466 -464 -114 66 c-326 187
        -741 360 -1117 465 l-122 34 -3 645 c-3 637 -3 646 -25 692 -30 66 -95 132
        -156 159 l-52 24 -990 2 c-779 1 -999 -1 -1030 -11z m1160 -4527 c580 -49
        1087 -347 1410 -829 71 -106 174 -315 215 -438 220 -653 55 -1381 -425 -1881
        -557 -580 -1414 -740 -2135 -400 -392 186 -696 485 -885 874 -110 224 -163
        422 -185 680 -14 162 -1 345 35 520 166 798 849 1403 1665 1474 137 12 171 12
        305 0z"/>
      </g>
    </svg>

    <svg class="svg" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='document'">
      <rect x="1.5" y="1.5" width="14" height="17" rx="3.5" :stroke="iconStrokeColor" stroke-width="2"/>
      <line x1="4" y1="7" x2="13" y2="7" :stroke="iconStrokeColor" stroke-width="1"/>
      <path d="M4 14H10" :stroke="iconStrokeColor" stroke-width="1"/>
      <line x1="4" y1="10.5" x2="13" y2="10.5" :stroke="iconStrokeColor" stroke-width="1"/>
    </svg>

    <svg class="svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='destroyed'">
      <mask id="path-1-inside-1_9_2" fill="white">
      <rect x="23" width="20" height="20" rx="4"/>
      </mask>
      <rect x="23" width="20" height="20" rx="4" :stroke="iconStrokeColor" stroke-width="10" mask="url(#path-1-inside-1_9_2)"/>
      <line x1="25.5355" y1="25.5" x2="40.3848" y2="40.3492" :stroke="iconStrokeColor" stroke-width="5" stroke-linecap="round"/>
      <mask id="path-3-inside-2_9_2" fill="white">
      <rect width="20" height="20" rx="4"/>
      </mask>
      <rect width="20" height="20" rx="4" :stroke="iconStrokeColor" stroke-width="10" mask="url(#path-3-inside-2_9_2)"/>
      <mask id="path-4-inside-3_9_2" fill="white">
      <rect y="23" width="20" height="20" rx="4"/>
      </mask>
      <rect y="23" width="20" height="20" rx="4" :stroke="iconStrokeColor" stroke-width="10" mask="url(#path-4-inside-3_9_2)"/>
      <line x1="25.5" y1="40.2645" x2="40.3492" y2="25.4152" :stroke="iconStrokeColor" stroke-width="5" stroke-linecap="round"/>
    </svg>

    <svg class="svg" width="63" height="64" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='disaggregation'">
      <path d="M25 38L7 56" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="4" y1="-4" x2="21.9369" y2="-4" transform="matrix(0.999997 0.00243784 -0.00243065 0.999997 0 63.9368)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="-4" x2="20.9762" y2="-4" transform="matrix(-0.00262212 0.999997 -0.999997 -0.00225983 0.0655649 38)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <path d="M36.9369 26L54.9369 8" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="4" y1="-4" x2="21.9369" y2="-4" transform="matrix(-0.999997 -0.00243784 0.00243065 -0.999997 61.9369 0.0632305)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="-4" x2="20.9762" y2="-4" transform="matrix(0.00262212 -0.999997 0.999997 0.00225983 61.8713 26)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <path d="M36.0243 37.9369L54.0068 55.9543" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="4" y1="-4" x2="21.9369" y2="-4" transform="matrix(0.00340943 -0.999994 0.999994 0.00340224 61.9368 62.962)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="-4" x2="20.9762" y2="-4" transform="matrix(0.999994 0.0035937 -0.00323142 0.999995 36.0001 62.8713)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <path d="M26 26L8 8" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="4" y1="-4" x2="21.9369" y2="-4" transform="matrix(-0.00243784 0.999997 -0.999997 -0.00243065 0.0632305 1)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="-4" x2="20.9762" y2="-4" transform="matrix(-0.999997 -0.00262212 0.00225983 -0.999997 26 1.06556)" :stroke="iconStrokeColor" stroke-width="8" stroke-linecap="round"/>
    </svg>

    <svg class="svg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='filter-funnel'">
      <path d="M30.9923 30.614L24.8659 30.614L13.6943 19.0259C13.6943 19.0259 3.12325 8.02606 0.961003 6.43784C-1.20125 4.84963 0.961003 0.261449 0.961003 0.261449C0.961003 0.261449 61.7443 -0.326779 63.3059 0.261449C64.8676 0.849677 63.3059 6.61431 63.3059 6.61431L50.9331 19.0847L39.7614 30.614L30.9923 30.614Z" :fill="iconFillColor"/>
      <rect x="23.9049" y="33.2022" width="16.8175" height="20.4703" :fill="iconFillColor"/>
      <path d="M40.7224 53.5949L40.7224 62.3783C40.7224 62.3783 40.7224 62.7313 40.3621 63.0842C40.0017 63.4371 40.2419 63.3195 39.7614 63.4371C39.2809 63.5548 39.1608 63.5548 38.6803 63.3195C38.1998 63.0842 38.0797 62.9665 38.0797 62.9665L35.6772 61.5548L31.4728 59.0842L27.5087 56.7313L25.2263 55.4372C25.2263 55.4372 24.6257 55.0843 24.2653 54.7314C23.9049 54.3784 23.9049 53.6725 23.9049 53.6725L40.7224 53.5949Z" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName ==='emitted'">
      <rect x="2" y="2" width="10" height="10" :stroke="iconStrokeColor" stroke-width="2"/>
      <rect x="2" y="18" width="10" height="10" :stroke="iconStrokeColor" stroke-width="2"/>
      <rect x="18" y="2" width="10" height="10" :stroke="iconStrokeColor" stroke-width="2"/>
      <line x1="17.9497" y1="17.9497" x2="27.8492" y2="27.8492" :stroke="iconStrokeColor" stroke-width="2"/>
      <line x1="17.9498" y1="27.8492" x2="27.8501" y2="17.9505" :stroke="iconStrokeColor" stroke-width="2"/>
    </svg>

    <svg class="svg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'transfer'">
      <path d="M36.6399 8.47609L36.1678 25.8869L18.7202 8.93478L36.6399 8.47609Z" :fill="iconFillColor"/>
      <rect width="15.4807" height="27.475" transform="matrix(0.717216 0.696851 -0.717216 0.696851 22.8778 11.0597)" :fill="iconFillColor"/>
      <path d="M27.3601 55.5239L27.8323 38.1131L45.2798 55.0652L27.3601 55.5239Z" :fill="iconFillColor"/>
      <rect width="15.4807" height="27.475" transform="matrix(-0.717216 -0.696851 0.717216 -0.696851 41.1223 52.9403)" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="141" height="113" viewBox="0 0 141 113" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'fund-information'">
    <path d="M138.664 38.5024L105.866 73.4244L105.806 51.608L75.1565 51.4353L63.8796 51.4079L63.8284 32.8398L63.8073 25.1948L69.2877 25.2081L76.595 25.2259L90.2962 25.2591L101.257 25.2857L105.824 25.2968L105.764 3.42056L138.664 38.5024Z" :fill="iconFillColor" :stroke="iconStrokeColor" stroke-width="7"/>
    <path d="M1.43392 78.3394L34.2835 110.305L34.3108 90.3585L64.9593 90.2348L76.236 90.2224L76.2592 73.2455L76.2688 66.2557L70.7885 66.2618L63.4813 66.2698L49.7805 66.2849L38.8198 66.297L34.2529 66.3021L34.2803 46.3006L1.43392 78.3394Z" :fill="iconFillColor"  :stroke="iconStrokeColor" stroke-width="7"/>
    </svg>

    <svg class="svg" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'clock'">
      <circle cx="45" cy="45" r="39.5" :stroke="iconStrokeColor" stroke-width="11"/>
      <path d="M45 26V49" :stroke="iconStrokeColor" stroke-width="8"/>
      <path d="M43.7173 46.0647L59.6019 62.0943" :stroke="iconStrokeColor" stroke-width="8"/>
      <ellipse cx="45" cy="26" rx="4" ry="3" :fill="iconFillColor"/>
      <ellipse cx="59.4941" cy="61.9964" rx="4.02041" ry="3.21303" transform="rotate(-38.6318 59.4941 61.9964)" :fill="iconFillColor"/>
    </svg>

    <svg class="svg" width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'delete'">
      <path d="M4.53253 4.47817L87.4727 87.5528" :stroke="iconStrokeColor" stroke-width="10"/>
      <path d="M4.4653 87.4856L87.54 4.54542" :stroke="iconStrokeColor" stroke-width="10"/>
    </svg>

    <svg class="svg" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'autotests'">
      <path d="M30 47L16 47" :stroke="iconStrokeColor" stroke-width="5"/>
      <path d="M31.8805 67H8.00006C5.23864 67 3.00006 64.7614 3.00006 62L3.00006 8C3.00006 5.23858 5.23863 3 8.00006 3L42.7648 3C45.5262 3 47.7648 5.23858 47.7648 8V36.0847" :stroke="iconStrokeColor" stroke-width="5"/>
      <path d="M34 33L16 33" :stroke="iconStrokeColor" stroke-width="5"/>
      <path d="M38 20L16 20" :stroke="iconStrokeColor" stroke-width="5"/>
      <ellipse cx="10.6327" cy="33.1017" rx="2.47547" ry="3.25424" :fill="iconFillColor"/>
      <ellipse cx="10.6327" cy="46.661" rx="2.47547" ry="3.25424" :fill="iconFillColor"/>
      <ellipse cx="10.6327" cy="20.0847" rx="2.47547" ry="3.25424" :fill="iconFillColor"/>
      <line y1="-2" x2="9.64896" y2="-2" transform="matrix(0.579927 0.814668 -0.630768 0.775972 30.8167 54.2937)" :stroke="iconStrokeColor" stroke-width="4"/>
      <path d="M36.2125 61.8475L49.3448 45.212" :stroke="iconStrokeColor" stroke-width="4"/>
    </svg>

    <svg class="svg" width="72" height="64" viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'delete-filters'">
      <g filter="url(#filter0_d_402_13)">
        <path d="M34.9923 30.614L28.8659 30.614L17.6943 19.0259C17.6943 19.0259 7.12325 8.02606 4.961 6.43784C2.79875 4.84962 4.961 0.261446 4.961 0.261446C4.961 0.261446 65.7443 -0.326782 67.3059 0.261446C68.8676 0.849674 67.3059 6.61431 67.3059 6.61431L54.9331 19.0847L43.7614 30.614L34.9923 30.614Z" :fill="iconFillColor"/>
      </g>
      <rect x="27.9049" y="33.2022" width="16.8175" height="20.4703" :fill="iconFillColor"/>
      <path d="M44.7224 53.5949L44.7224 62.3783C44.7224 62.3783 44.7224 62.7312 44.3621 63.0842C44.0017 63.4371 44.2419 63.3195 43.7614 63.4371C43.2809 63.5547 43.1608 63.5547 42.6803 63.3195C42.1998 63.0842 42.0797 62.9665 42.0797 62.9665L39.6772 61.5548L35.4728 59.0842L31.5087 56.7313L29.2263 55.4372C29.2263 55.4372 28.6257 55.0843 28.2653 54.7313C27.9049 54.3784 27.9049 53.6725 27.9049 53.6725L44.7224 53.5949Z" :fill="iconFillColor"/>
      <circle cx="50" cy="33" r="15.5" :fill="iconFillColor" :stroke="iconStrokeColor"/>
      <path d="M41.4811 24.2258L59.3346 42.1082" :stroke="iconStrokeColor" stroke-width="5"/>
      <path d="M41.4666 42.0937L59.349 24.2403" :stroke="iconStrokeColor" stroke-width="5"/>
      <defs>
        <filter id="filter0_d_402_13" x="0" y="0" width="72" height="38.614" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_402_13"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_402_13" result="shape"/>
        </filter>
      </defs>
    </svg>

    <svg class="svg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'anchor'">
      <path d="M32 0L44.3076 14.7692H19.6923L32 0Z" :fill="iconFillColor"/>
      <path d="M32 64L44.3076 49.2308H19.6923L32 64Z" :fill="iconFillColor"/>
      <path d="M64 29.5385L49.2308 41.8462V17.2308L64 29.5385Z" :fill="iconFillColor"/>
      <path d="M0 29.5385L14.7692 41.8462V17.2308L0 29.5385Z" :fill="iconFillColor"/>
      <path d="M32 14.7692V49.3114" :stroke="iconStrokeColor" stroke-width="4"/>
      <path d="M14.7693 29.5385H49.3115" :stroke="iconStrokeColor" stroke-width="4"/>
    </svg>




    <svg :class="{'svg': !width && !height}" :width="width ? width : 64" :height="height ? height : 64"  viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="iconName === 'play'">
      <circle cx="32" cy="32" r="30" stroke-width="4" :stroke="iconStrokeColor"/>
      <path d="M50 32.5L23.75 44.1913V20.8087L50 32.5Z" :fill="iconFillColor"/>
    </svg>

  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    heightContainer:{
      type: String,
      default: '20px',
      required: false
    },
    widthContainer: {
      type: String,
      default: '15px',
      required: false
    },
    height:{
      type: String,
      default: '20px',
      required: false
    },
    width: {
      type: String,
      default: '15px',
      required: false
    },
    no_border: {
      type: Boolean,
      default: false,
      required: false
    },
    iconName: {
      type: String,
      required: true,
      default: ''
    },
    iconFillColor: {
      type: String,
      required: false,
      default: 'black'
    },
    iconStrokeColor: {
      type: String,
      required: false,
      default: 'black'
    },
    iconStrokeWidth: {
      type: String,
      required: false,
      default: '1'
    }
  }
}
</script>

<style lang="scss" src="./Icon.scss" scoped>

</style>
