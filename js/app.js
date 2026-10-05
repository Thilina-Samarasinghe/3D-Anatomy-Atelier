/* ============================================================
   Anatomy Atelier — 3D Human Anatomy Interactive & Video Tour
   Languages: English & Sinhala (සිංහල) Only
   Medically Verified Sri Lankan Biological / Anatomical Terms
   ============================================================ */

import * as THREE from "three";
import { GLTFLoader } from "./vendor/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "./vendor/libs/meshopt_decoder.module.js";
import { OrbitControls } from "./vendor/controls/OrbitControls.js";
import { RoomEnvironment } from "./vendor/environments/RoomEnvironment.js";

/* ------------------------------------------------------------
   ORGANS DATA WITH EXACT ENGLISH, SINHALA (සිංහල) & LATIN TERMS
------------------------------------------------------------ */

const ORGANS = [
  {
    id: "heart",
    en: "Heart", si: "හෘදය",
    systemEn: "Cardiovascular System",
    systemSi: "හෘද වාහිනී පද්ධතිය",
    latin: "Cor", accent: "#ee7c6a",
    poeticEn: "The tireless muscular pump",
    poeticSi: "නොනැවතී ස්පන්දනය වන ජීව රුධිර පොම්පය",
    descEn: "A muscular organ pumping blood throughout the body, supplying oxygen and vital nutrients to every living cell while removing carbon dioxide and metabolic wastes.",
    descSi: "රුධිරය මුළු සිරුර පුරා පොම්ප කරමින් සෛල වෙත ඔක්සිජන් හා පෝෂක සපයන, ළය මැද වම් පසට බරව පිහිටි ප්‍රධාන මාංශපේශී අවයවයයි. සාමාන්‍යයෙන් පුද්ගලයෙකුගේ මිටමෙලවූ අතක ප්‍රමාණයට සමාන වේ.",
    facts: [
      { enKey: "Size", siKey: "ප්‍රමාණය", enVal: "Clenched fist size", siVal: "මිටමෙලවූ අතක ප්‍රමාණය" },
      { enKey: "Mass", siKey: "බර", enVal: "250–350 grams", siVal: "ග්‍රෑම් 250–350 පමණ" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Thoracic cavity behind sternum", siVal: "උරස් කුහරයේ උරෝස්ථිය පිටුපසින්" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Pumps oxygenated blood", siVal: "රුධිර සංසරණය පවත්වා ගැනීම" },
      { enKey: "Daily", siKey: "දෛනිකව", enVal: "~100,000 beats per day", siVal: "දිනකට වාර 100,000ක් පමණ ගැහේ" },
    ],
    funFactEn: "Over an average lifetime, the human heart beats over 2.5 billion times without a single moment of rest.",
    funFactSi: "සාමාන්‍ය මිනිස් ආයු කාලයක් තුළ හෘදය කිසිදු විවේකයකින් තොරව බිලියන 2.5කට අධික වාර ගණනක් ස්පන්දනය වේ.",
    hotspots: [
      { 
        id: "aorta", en: "Aorta", si: "මහා ධමනිය", latin: "Aorta", color: "#ee7c6a", position: [-0.35, 1.65, 0.55],
        descEn: "The largest artery in the human body, arising from the left ventricle and distributing oxygen-rich blood throughout the entire systemic circulation.",
        descSi: "ශරීරයේ පිහිටි විශාලතම ධමනියයි. වම් කෝෂිකාවෙන් ආරම්භ වී මුළු ශරීරය පුරාම ඔක්සිජන් සහිත රුධිරය බෙදාහරින්නේ මහා ධමනිය මගිනි."
      },
      { 
        id: "left-ventricle", en: "Left Ventricle", si: "වම් කෝෂිකාව", latin: "Ventriculus sinister", color: "#f2a33b", position: [0.7, -0.75, 0.65],
        descEn: "The thickest and most powerful muscular chamber of the heart, pumping oxygenated blood into the aorta under high systolic pressure.",
        descSi: "හෘදයේ ඝනකම්ම මාංශපේශී බිත්තිය සහිත කුටීරයයි. අධික පීඩනයක් යටතේ මහා ධමනිය ඔස්සේ මුළු ශරීරයටම රුධිරය තල්ලු කරන්නේ මෙයිනි."
      },
      { 
        id: "right-atrium", en: "Right Atrium", si: "දකුණු කර්ණිකාව", latin: "Atrium dextrum", color: "#6393d8", position: [-0.9, 0.35, 0.55],
        descEn: "Receives deoxygenated venous return from the superior and inferior vena cavae and transfers it into the right ventricle for pulmonary oxygenation.",
        descSi: "ඉහළ සහ පහළ මහා ශිරා මගින් ශරීරයේ සිට ආපසු එන ඔක්සිජන් හීන රුධිරය ලබාගන්නා හෘදයේ ඉහළ දකුණු කුටීරයයි."
      },
    ],
  },
  {
    id: "brain",
    en: "Brain", si: "මොළය",
    systemEn: "Nervous System",
    systemSi: "ස්නායු පද්ධතිය",
    latin: "Encephalon", accent: "#c58696",
    poeticEn: "The command center of consciousness",
    poeticSi: "චින්තනයේ සහ විඥානයේ ප්‍රධාන පාලන මධ්‍යස්ථානය",
    descEn: "The master control organ of the central nervous system, integrating sensory input, memory, voluntary motion, reasoning, and emotions across 86 billion neurons.",
    descSi: "මධ්‍ය ස්නායු පද්ධතියේ ප්‍රධානතම අවයවයයි. මතකය, චින්තනය, හැඟීම් සහ සියලු ශාරීරික ක්‍රියාකාරකම් බිලියන 86ක් වූ නියුරෝන මගින් පාලනය කරයි.",
    facts: [
      { enKey: "Size", siKey: "ප්‍රමාණය", enVal: "About two clenched fists", siVal: "මිටමෙලවූ අත් දෙකක ප්‍රමාණය" },
      { enKey: "Mass", siKey: "බර", enVal: "1.3–1.4 kg", siVal: "කිලෝග්‍රෑම් 1.3–1.4 පමණ" },
      { enKey: "Protection", siKey: "ආරක්ෂාව", enVal: "Encased in the cranium", siVal: "හිස්කබල තුළ මනාව ආරක්ෂිතයි" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Central neurological processing", siVal: "සියලු සංවේදන හා චලන පාලනය" },
      { enKey: "Energy", siKey: "ශක්තිය", enVal: "Consumes 20% of total oxygen", siVal: "සිරුරේ ඔක්සිජන් වලින් 20%ක් පරිභෝජනය කරයි" },
    ],
    funFactEn: "The brain itself feels no pain because it lacks nociceptors (pain receptors)—headaches arise from surrounding meninges and blood vessels.",
    funFactSi: "මොළයේ වේදනා ප්‍රතිග්‍රාහක නොමැති බැවින් මොළයට සෘජුව වේදනාවක් නොදැනේ; හිසරදය හටගන්නේ ඒ අවට පටක සහ රුධිර නාල මගිනි.",
    hotspots: [
      { 
        id: "frontal", en: "Frontal Lobe", si: "ප්‍රලලාට ඛණ්ඩිකාව", latin: "Lobus frontalis", color: "#ee7c6a", position: [-0.7, 0.65, 0.8],
        descEn: "Responsible for higher executive decisions, voluntary motor control, language articulation (Broca area), and personality traits.",
        descSi: "තීරණ ගැනීම, සැලසුම් කිරීම, චින්තනය, පෞරුෂය සහ ඉච්ඡානුග චලනයන් මෙහෙයවන මස්තිෂ්කයේ ප්‍රධාන ඉදිරිපස කොටසයි."
      },
      { 
        id: "temporal", en: "Temporal Lobe", si: "ශංඛක ඛණ්ඩිකාව", latin: "Lobus temporalis", color: "#6393d8", position: [0.75, -0.1, 0.82],
        descEn: "Processes auditory perception, language interpretation, visual memory associations, and houses the memory-forming hippocampus.",
        descSi: "ශ්‍රවණ සංවේදන හඳුනාගැනීම, භාෂා අවබෝධය සහ මතකය තැන්පත් කරගැනීම (හිපොකැම්පසය) සිදුකරන පැති ඛණ්ඩිකාවයි."
      },
      { 
        id: "cerebellum", en: "Cerebellum", si: "අනුමොළය", latin: "Cerebellum", color: "#d89bc4", position: [0.72, -0.9, 0.55],
        descEn: "Coordinates precision voluntary movements, muscle tone, equilibrium, and fluid posture adjustments.",
        descSi: "ශරීරයේ සමතුලිතතාවය, ඉරියව් පාලනය සහ පේශි ක්‍රියාකාරිත්වයන් එකිනෙක මනාව සම්බන්ධීකරණය කරන්නේ අනුමොළය මගිනි."
      },
    ],
  },
  {
    id: "lungs",
    en: "Lungs", si: "පෙනහළු",
    systemEn: "Respiratory System",
    systemSi: "ශ්වසන පද්ධතිය",
    latin: "Pulmones", accent: "#dd8f8b",
    poeticEn: "The breath of life and gas exchange",
    poeticSi: "ජීවයේ හුස්ම රඳවන වායු හුවමාරු ද්වාරය",
    descEn: "Bilateral spongy organs facilitating gas diffusion across 300 million alveoli, oxygenating venous blood and exhaling carbon dioxide byproduct.",
    descSi: "වායුගෝලීය ඔක්සිජන් රුධිරයට ලබාදෙමින් කාබන්ඩයොක්සයිඩ් බැහැර කරන උරස් කුහරයේ පිහිටි ස්පොන්ජියක් බඳු ප්‍රධාන ශ්වසන අවයව යුගලයයි.",
    facts: [
      { enKey: "Height", siKey: "උස", enVal: "~25 cm per lung", siVal: "එක් පෙනහැල්ලක් සෙන්ටිමීටර 25ක් පමණ" },
      { enKey: "Combined Mass", siKey: "මුළු බර", enVal: "~1.0–1.2 kg", siVal: "දෙකම එක්ව කිලෝග්‍රෑම් 1ක් පමණ" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Either side of the thoracic cavity", siVal: "උරස් කුහරයේ හෘදය දෙපස" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Oxygen & CO2 gas exchange", siVal: "ඔක්සිජන් හා කාබන්ඩයොක්සයිඩ් හුවමාරුව" },
      { enKey: "Airflow", siKey: "වායු ප්‍රමාණය", enVal: "~11,000 liters processed daily", siVal: "දිනකට වාතය ලීටර් 11,000ක් සකසයි" },
    ],
    funFactEn: "The right lung possesses three lobes while the left lung has only two, leaving an anatomical notch for the human heart.",
    funFactSi: "හෘදයේ පිහිටීමට ඉඩ සලසමින් වම් පෙනහැල්ල ඛණ්ඩිකා දෙකකින් පමණක් යුක්ත වන අතර, දකුණු පෙනහැල්ල ඛණ්ඩිකා තුනකින් සමන්විත වේ.",
    hotspots: [
      { 
        id: "trachea", en: "Trachea", si: "ශ්වාසනාලය", latin: "Trachea", color: "#6393d8", position: [0, 1.6, 0.2],
        descEn: "A wide cartilaginous airway reinforced by C-shaped cartilage rings, delivering atmospheric air into the primary bronchi.",
        descSi: "කාටිලේජ වළලුවලින් ශක්තිමත් වූ ප්‍රධාන වායු මාර්ගයයි. ආශ්වාස වාතය ස්වරාලයේ සිට ශ්වාසනාලිකා වෙත ආරක්ෂිතව රැගෙන යයි."
      },
      { 
        id: "right-lung", en: "Right Lung", si: "දකුණු පෙනහැල්ල", latin: "Pulmo dexter", color: "#ee7c6a", position: [-1.2, 0.1, 0.7],
        descEn: "The larger lung, divided into superior, middle, and inferior lobes providing expansive alveolar area for oxygen uptake.",
        descSi: "ඛණ්ඩිකා 3 කින් සමන්විත විශාල පෙනහැල්ලයි. වායු හුවමාරුව සඳහා අතිවිශාල කූපිකා පෘෂ්ඨ වර්ගඵලයක් සපයයි."
      },
      { 
        id: "left-lung", en: "Left Lung", si: "වම් පෙනහැල්ල", latin: "Pulmo sinister", color: "#f2a33b", position: [1.2, 0.1, 0.7],
        descEn: "Comprises two lobes and the cardiac notch, harmonizing gas diffusion alongside the pumping heart.",
        descSi: "ඛණ්ඩිකා 2 කින් යුත් පෙනහැල්ලයි. හෘදය පිහිටීම සඳහා හෘද ඇතුළ්වීම (Cardiac notch) මෙහි පිහිටා ඇත."
      },
    ],
  },
  {
    id: "liver",
    en: "Liver", si: "අක්මාව",
    systemEn: "Digestive & Metabolic System",
    systemSi: "ජීර්ණ හා පරිවෘත්තීය පද්ධතිය",
    latin: "Hepar", accent: "#b86858",
    poeticEn: "The master chemical detoxifier",
    poeticSi: "සිරුරේ ප්‍රධාන රසායනික කර්මාන්තශාලාව",
    descEn: "The largest internal organ, executing over 500 chemical tasks including toxin breakdown, bile production, glycogen storage, and protein synthesis.",
    descSi: "උදරයේ ඉහළ දකුණු පසින් පිහිටි විශාලතම අභ්‍යන්තර අවයවයයි. විෂ ද්‍රව්‍ය නසමින්, පිත නිපදවමින් සහ පරිවෘත්තීය කාර්යයන් 500කට අධික ප්‍රමාණයක් ඉටු කරයි.",
    facts: [
      { enKey: "Size", siKey: "ප්‍රමාණය", enVal: "Largest internal visceral organ", siVal: "විශාලතම අභ්‍යන්තර අවයවය" },
      { enKey: "Mass", siKey: "බර", enVal: "1.4–1.6 kg", siVal: "කිලෝග්‍රෑම් 1.4–1.6 පමණ" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Right upper quadrant under diaphragm", siVal: "මහාප්‍රාචීරයට යටින් ඉහළ දකුණු උදරයේ" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Detoxification, metabolism & bile", siVal: "විෂ නාශනය, පිත නිපදවීම හා ගබඩා කිරීම" },
      { enKey: "Capacity", siKey: "විශේෂත්වය", enVal: "500+ biological operations", siVal: "ප්‍රධාන ජීව රසායනික කාර්යයන් 500කට වැඩි" },
    ],
    funFactEn: "The liver is the only visceral organ capable of full biological regeneration from as little as 25% of its remaining tissue.",
    funFactSi: "අක්මාවෙන් 75%ක් කපා ඉවත් කළ ද, ඉතිරි 25% කොටසින් සති කිහිපයක් තුළ සම්පූර්ණ අක්මාව නැවත ප්‍රතිජනනය වීමේ අසිරිමත් හැකියාවක් ඇත.",
    hotspots: [
      { 
        id: "right-lobe", en: "Right Lobe", si: "දකුණු ඛණ්ඩිකාව", latin: "Lobus hepatis dexter", color: "#ee7c6a", position: [-0.75, 0.35, 0.75],
        descEn: "The largest lobe of the liver, packed with hepatic lobules carrying out detoxification, glycogen storage, and bile formation.",
        descSi: "අක්මාවේ විශාලතම ඛණ්ඩිකාවයි. පරිවෘත්තීය, විෂ නාශන සහ පිත ස්‍රාවය කිරීමේ ප්‍රධාන කාර්යභාරය දරයි."
      },
      { 
        id: "left-lobe", en: "Left Lobe", si: "වම් ඛණ්ඩිකාව", latin: "Lobus hepatis sinister", color: "#f2a33b", position: [0.85, 0.25, 0.75],
        descEn: "Smaller lobe crossing the midline, separated from the right by the falciform ligament.",
        descSi: "මැද රේඛාව හරහා දිවෙන කුඩා ඛණ්ඩිකාවයි. දෑකැති බන්ධනිය මගින් දකුණු ඛණ්ඩිකාවෙන් වෙන් වේ."
      },
      { 
        id: "portal", en: "Portal Vein", si: "ප්‍රතිහාරික ශිරාව", latin: "Vena portae hepatis", color: "#6393d8", position: [0.1, -0.3, 0.82],
        descEn: "Transports nutrient-rich venous blood directly from the digestive tract into hepatic sinusoids for immediate processing.",
        descSi: "ආහාර මාර්ගයේ අවශෝෂණය කරගත් පෝෂක සහිත රුධිරය සැකසීම සඳහා අක්මාව තුළට ගෙනෙන සුවිශේෂී ශිරාවයි."
      },
    ],
  },
  {
    id: "kidneys",
    en: "Kidneys", si: "වකුගඩු",
    systemEn: "Urinary & Excretory System",
    systemSi: "විරේචක සහ මූත්‍ර පද්ධතිය",
    latin: "Renes", accent: "#c96963",
    poeticEn: "The precision filtration apparatus",
    poeticSi: "නිරවද්‍ය රුධිර පෙරහන් සහ සමතුලිතතා පද්ධතිය",
    descEn: "Bilateral bean-shaped organs containing two million microscopic nephrons that cleanse blood, regulate electrolytes, maintain blood pressure, and produce urine.",
    descSi: "කශේරුකාව දෙපස පිහිටි බෝංචි ඇටයක හැඩැති අවයව යුගලයකි. නෙෆ්‍රෝන මිලියන 2ක් මගින් දිනපතා රුධිරය පෙරමින් ජල හා ලවණ සමතුලිතතාවය රකිමින් මූත්‍ර සාදයි.",
    facts: [
      { enKey: "Shape", siKey: "හැඩය", enVal: "Bean-shaped bilateral pair", siVal: "බෝංචි ඇටයක හැඩැති යුගලක්" },
      { enKey: "Mass", siKey: "බර", enVal: "120–170 g each", siVal: "එකක් ග්‍රෑම් 120–170 පමණ" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Retroperitoneal on posterior wall", siVal: "පසුපස උදර බිත්තියේ කොඳු ඇට පෙළ දෙපස" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Purifies blood & regulates fluids", siVal: "රුධිරය පෙරා මූත්‍ර නිපදවීම" },
      { enKey: "Filtration", siKey: "පෙරීමේ ධාරිතාව", enVal: "Filters ~180 L fluid daily", siVal: "දිනකට තරල ලීටර් 180ක් පමණ පෙරයි" },
    ],
    funFactEn: "Over 99% of the liquid filtered by the kidneys is returned to circulation—only 1 to 2 liters are expelled as concentrated urine.",
    funFactSi: "වකුගඩු මගින් දිනකට පෙරන තරල ප්‍රමාණයෙන් 99%කට වඩා නැවත රුධිරයට අවශෝෂණය කරගන්නා අතර, පිටවන්නේ ලීටර් 1.5ක පමණ මූත්‍ර ප්‍රමාණයකි.",
    hotspots: [
      { 
        id: "cortex", en: "Renal Cortex", si: "වකුගඩු බාහිකය", latin: "Cortex renalis", color: "#ee7c6a", position: [-0.9, 0.55, 0.7],
        descEn: "The outer zone of the kidney packed with glomeruli and convoluted tubules where initial capillary ultrafiltration begins.",
        descSi: "වකුගඩුවේ පිටත කලාපයයි. මෙහි ගුච්ඡිකා හා සංවලිත නාලිකා පිහිටා ඇති අතර මුල්ම අතිපෙරීම මෙහිදී සිදුවේ."
      },
      { 
        id: "medulla", en: "Renal Medulla", si: "වකුගඩු මජ්ජාව", latin: "Medulla renalis", color: "#f2a33b", position: [0.85, 0.2, 0.7],
        descEn: "Innermost triangular pyramids that concentrate urine, conserving water and electrolytes through countercurrent exchange.",
        descSi: "වකුගඩුවේ ඇතුළත කලාපයයි. මූත්‍ර සාන්ද්‍රණය කිරීම හා ජල සමතුලිතතාවය මෙහෙයවන්නේ වකුගඩු පිරමිඩ මගිනි."
      },
      { 
        id: "ureter", en: "Ureter", si: "මුත්‍ර වාහිනිය", latin: "Ureter", color: "#6393d8", position: [0.4, -1.1, 0.5],
        descEn: "Long muscular conduits carrying filtered urine from the renal pelvis downward into the urinary bladder via rhythmic peristalsis.",
        descSi: "වකුගඩු ශ්‍රෝණියේ සිට එකතු වන මූත්‍ර, තරංගාකාර චලන මගින් මූත්‍රාශය වෙත රැගෙන යන පේශි නාල යුගලයයි."
      },
    ],
  },
  {
    id: "eyeball",
    en: "Eye", si: "ඇස",
    systemEn: "Sensory System",
    systemSi: "සංවේදී පද්ධතිය",
    latin: "Oculus", accent: "#7294b9",
    poeticEn: "The window of visual perception",
    poeticSi: "ආලෝකය දකින විශ්මිත දෘශ්‍ය කවුළුව",
    descEn: "A precision optical organ focusing incoming photons onto the retina, generating electrochemical signals that the brain translates into vision.",
    descSi: "ආලෝක කිරණ වර්තනය කර දෘෂ්ටිවිතානය මත ප්‍රතිබිම්බ සාදා, එම සංඥා දෘෂ්ටි ස්නායුව හරහා මොළයට යවන විශ්මිත දෘශ්‍ය ඉන්ද්‍රියයි.",
    facts: [
      { enKey: "Diameter", siKey: "විෂ්කම්භය", enVal: "~24 mm sphere", siVal: "මිලිමීටර 24ක පමණ ගෝලයකි" },
      { enKey: "Mass", siKey: "බර", enVal: "~7.5 grams", siVal: "ග්‍රෑම් 7.5ක් පමණ වේ" },
      { enKey: "Protection", siKey: "පිහිටීම", enVal: "Cushioned within orbital bone", siVal: "හිස්කබලේ අස්ථිමය නෙත් කුහරය තුළ" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Focuses light & visual reception", siVal: "ආලෝකය ග්‍රහණය කර පෙනීම ලබාදීම" },
      { enKey: "Motion", siKey: "චලනය", enVal: "Thousands of rapid saccades daily", siVal: "දිනපතා දහස් වාරයක් වේගයෙන් චලනය වේ" },
    ],
    funFactEn: "The cornea receives no blood supply directly; it absorbs oxygen directly from the surrounding atmosphere.",
    funFactSi: "ස්වච්ඡයට කිසිදු රුධිර නාලයක් සම්බන්ධ නොවන අතර, එය සෘජුවම වායුගෝලීය වාතයෙන් ඔක්සිජන් අවශෝෂණය කරගනී.",
    hotspots: [
      { 
        id: "cornea", en: "Cornea", si: "ස්වච්ඡය", latin: "Cornea", color: "#6393d8", position: [-0.94, 0.05, 1.47],
        descEn: "The transparent domed anterior window accounting for two-thirds of the eye's total optical focusing power.",
        descSi: "ඇසේ ඉදිරිපස පිහිටි විනිවිද පෙනෙන උත්තල ආවරණයයි. ඇසට ඇතුළු වන ආලෝකයෙන් 2/3ක්ම වර්තනය කරන්නේ ස්වච්ඡය මගිනි."
      },
      { 
        id: "iris", en: "Iris", si: "තාරා මණ්ඩලය", latin: "Iris", color: "#f2a33b", position: [-1.22, -0.53, 1.15],
        descEn: "Pigmented contractile ring adjusting pupil aperture to control the precise quantity of light reaching the internal retina.",
        descSi: "කනිනිකාවේ ප්‍රමාණය වෙනස් කරමින් ඇස තුළට ඇතුළු වන ආලෝක ප්‍රමාණය පාලනය කරන, වර්ණක සහිත වෘත්තාකාර පේශි පටලයයි."
      },
      { 
        id: "optic", en: "Optic Nerve", si: "දෘෂ්ටි ස්නායුව", latin: "Nervus opticus", color: "#d89bc4", position: [1.61, -0.18, 0.54],
        descEn: "Cable of over one million nerve axons carrying phototransduced electrical vision signals straight to the visual cortex.",
        descSi: "දෘෂ්ටිවිතානයේ හටගන්නා දෘශ්‍ය සංවේදන ආවේග මොළයේ දෘශ්‍ය කලාපය වෙත රැගෙන යන ප්‍රධාන සංවේදක ස්නායුවයි."
      },
    ],
  },
  {
    id: "intestine",
    en: "Intestine", si: "අන්ත්‍රය",
    systemEn: "Digestive System",
    systemSi: "ජීර්ණ පද්ධතිය",
    latin: "Intestinum", accent: "#d78b77",
    poeticEn: "The nutrient absorption core",
    poeticSi: "පෝෂක උරාගන්නා සිරුරේ අභ්‍යන්තර ජීර්ණ මාවත",
    descEn: "A continuous coiled tract stretching 6 to 7 meters where chemical digestion finishes and nutrients are absorbed across millions of microvilli.",
    descSi: "මීටර් 6-7ක් දිගැති නැවුණු ආහාර මාර්ග කොටසයි. ක්ෂුද්‍රාන්තය මගින් පෝෂක අවශෝෂණය කරන අතර මහාන්තය මගින් ජලය උරාගෙන මල සාදයි.",
    facts: [
      { enKey: "Length", siKey: "දිග", enVal: "6–7 meters uncoiled", siVal: "දිගහැරිය විට මීටර් 6–7ක් පමණ" },
      { enKey: "Surface Area", siKey: "වර්ගඵලය", enVal: "~32 square meters of microvilli", siVal: "ක්ෂුද්‍ර අංකුර මගින් අතිවිශාල වර්ගඵලයක්" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Mid and lower abdominal space", siVal: "මැද සහ පහළ උදර කුහරය පුරා" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Nutrient & fluid uptake", siVal: "පෝෂක හා ජලය අවශෝෂණය" },
      { enKey: "Microbiome", siKey: "ක්ෂුද්‍රජීවීන්", enVal: "Trillions of beneficial bacteria", siVal: "හිතකර බැක්ටීරියා ට්‍රිලියන ගණනක් වෙසෙයි" },
    ],
    funFactEn: "The human gut produces over 90% of the body's serotonin ('happiness hormone') and replaces its lining every 3 to 5 days.",
    funFactSi: "මිනිස් සිරුරේ සතුට ඇති කරන 'සෙරටොනින්' හෝමෝනයෙන් 90%කට වඩා නිපදවෙන්නේ අන්ත්‍රයේ වන අතර, එහි ඇතුළත බිත්තිය දින 3-5 කට වරක් අලුත්වැඩියා වේ.",
    hotspots: [
      { 
        id: "duodenum", en: "Duodenum", si: "ග්‍රහණිය", latin: "Duodenum", color: "#f2a33b", position: [0.6, 0.8, 0.75],
        descEn: "C-shaped initial loop of the small intestine receiving acidic stomach chyme, pancreatic enzymes, and liver bile.",
        descSi: "ආමාශය කෙළවරින් ඇරඹෙන 'C' හැඩැති ක්ෂුද්‍රාන්තයේ පළමු කොටසයි. පිත සහ අග්න්‍යාශ යුෂ මෙහිදී ආහාර සමග මිශ්‍ර වේ."
      },
      { 
        id: "jejunum", en: "Jejunum", si: "මධ්‍යන්ත්‍රය", latin: "Jejunum", color: "#ee7c6a", position: [-0.45, 0.1, 0.82],
        descEn: "The middle segment of the small intestine lined with dense vascular villi designed for maximum nutrient absorption.",
        descSi: "ක්ෂුද්‍රාන්තයේ මැද කොටසයි. ජීර්ණය වූ ඇමයිනෝ අම්ල, ග්ලූකෝස් සහ විටමින් රුධිරයට අවශෝෂණය කරන ප්‍රධානම කලාපයයි."
      },
      { 
        id: "colon", en: "Colon", si: "මහාන්ත්‍රය", latin: "Colon", color: "#6393d8", position: [0.75, -0.55, 0.72],
        descEn: "The frame of the large intestine absorbing remaining moisture and salts while housing the gut microbiome flora.",
        descSi: "උදරය වටා පිහිටි මහා බඩවැලේ ප්‍රධාන කොටසයි. ඉතිරි ජලය හා ලවණ උරාගනිමින් මලද්‍රව්‍ය ඝන තත්ත්වයට පත් කරයි."
      },
    ],
  },
  {
    id: "pancreas",
    en: "Pancreas", si: "අග්න්‍යාශය",
    systemEn: "Endocrine & Exocrine System",
    systemSi: "අන්තරාසර්ග සහ බහිස්සර්ග පද්ධතිය",
    latin: "Pancreas", accent: "#c69a5e",
    poeticEn: "The blood sugar and metabolic regulator",
    poeticSi: "රුධිරයේ සීනි සහ එන්සයිම පාලකයා",
    descEn: "An oblong retroperitoneal gland that produces key digestive enzymes and secretes insulin and glucagon hormones to govern glucose equilibrium.",
    descSi: "ආමාශයට පිටුපසින් පිහිටි දිගටි ග්‍රන්ථියකි. ආහාර ජීර්ණයට එන්සයිම ස්‍රාවය කරන අතර, ඉන්සියුලින් හා ග්ලුකොගන් මගින් රුධිර සීනි මට්ටම පාලනය කරයි.",
    facts: [
      { enKey: "Length", siKey: "දිග", enVal: "~15 cm long", siVal: "දිග සෙන්ටිමීටර 15ක් පමණ" },
      { enKey: "Mass", siKey: "බර", enVal: "70–100 grams", siVal: "ග්‍රෑම් 70–100ක් පමණ වේ" },
      { enKey: "Position", siKey: "පිහිටීම", enVal: "Horizontally behind stomach", siVal: "ආමාශය පිටුපසින් තිරස්ව" },
      { enKey: "Hormones", siKey: "හෝමෝන", enVal: "Insulin & Glucagon", siVal: "ඉන්සියුලින් සහ ග්ලුකොගන්" },
      { enKey: "Daily Juice", siKey: "දෛනික ස්‍රාවය", enVal: "~1.5 L digestive juice", siVal: "දිනකට අග්න්‍යාශ යුෂ ලීටර් 1.5ක් නිපදවයි" },
    ],
    funFactEn: "Only about 2% of pancreatic tissue consists of the endocrine Islets of Langerhans, yet this tiny cluster regulates total body energy.",
    funFactSi: "අග්න්‍යාශයෙන් 2%ක් තරම් වූ ලැන්ගර්හැන්ස් දූපත් මගින් සිරුරේ මුළු ග්ලූකෝස් පරිවෘත්තියම හා ශක්ති සමතුලිතතාවයම මනාව පාලනය කෙරේ.",
    hotspots: [
      { 
        id: "head", en: "Pancreatic Head", si: "අග්න්‍යාශ ශීර්ෂය", latin: "Caput pancreatis", color: "#ee7c6a", position: [-1.32, -0.36, 0.55],
        descEn: "Broad segment cradled within the curve of the duodenum, directing digestive enzymes into the main duct.",
        descSi: "ග්‍රහණියේ නැම්ම තුළ පිහිටි පළල් හිස කොටසයි. ප්‍රධාන අග්න්‍යාශ ප්‍රණාලය හරහා ජීර්ණ එන්සයිම පිටකරයි."
      },
      { 
        id: "body", en: "Pancreatic Body", si: "අග්න්‍යාශ දේහය", latin: "Corpus pancreatis", color: "#f2a33b", position: [0.05, 0.25, 0.45],
        descEn: "Central transverse region spanning across the vertebral column, rich in enzyme acini and capillary beds.",
        descSi: "කොඳු ඇට පෙළ හරහා තිරස්ව පිහිටි ප්‍රධාන මැද කොටසයි. එන්සයිම ස්‍රාවී සෛලවලින් පොහොසත් ය."
      },
      { 
        id: "tail", en: "Pancreatic Tail", si: "අග්න්‍යාශ පුච්ඡය", latin: "Cauda pancreatis", color: "#6393d8", position: [1.55, 0.3, 0.35],
        descEn: "Slender terminal segment reaching the spleen, housing the highest density of insulin-secreting beta cells.",
        descSi: "ප්ලීහාව දෙසට විහිදෙන පටු වලිග කොටසයි. ඉන්සියුලින් නිපදවන බීටා සෛල බහුලවම පිහිටා ඇත්තේ මෙහිය."
      },
    ],
  },
  {
    id: "skin",
    en: "Skin", si: "සම / චර්මය",
    systemEn: "Integumentary System",
    systemSi: "බාහිර ආවරණ පද්ධතිය",
    latin: "Integumentum", accent: "#c99277",
    poeticEn: "The dynamic living biological shield",
    poeticSi: "සිරුර ආරක්ෂා කරන සජීවී ආවරණ පලිහ",
    descEn: "The body's largest organ covering ~2 m², serving as a frontline immune defense, tactile sensor, water barrier, and thermal regulator.",
    descSi: "ශරීරයේ විශාලතම බාහිර අවයවයයි. වර්ග මීටර් 2ක පමණ වපසරියක් ආවරණය කරමින් බාහිර විෂබීජවලින් ආරක්ෂාව, ස්පර්ශ සංවේදනය සහ උෂ්ණත්ව පාලනය සපයයි.",
    facts: [
      { enKey: "Total Area", siKey: "මුළු වර්ගඵලය", enVal: "~2 square meters spread flat", siVal: "පැතිරූ විට වර්ග මීටර් 2ක් පමණ" },
      { enKey: "Mass", siKey: "බර", enVal: "3.5–5.0 kg (~16% of body)", siVal: "කිලෝග්‍රෑම් 3.5–5ක් පමණ (සිරුරේ බරින් 16%)" },
      { enKey: "Layers", siKey: "ස්ථර", enVal: "Epidermis, Dermis, Hypodermis", siVal: "උපචර්මය, චර්මය සහ උපචර්මික පටකය" },
      { enKey: "Function", siKey: "කාර්යය", enVal: "Defense, sensation & thermoregulation", siVal: "ආරක්ෂාව, උෂ්ණත්ව පාලනය හා සංවේදනය" },
      { enKey: "Cell Turnover", siKey: "සෛල අලුත්වීම", enVal: "Sheds 500 million dead cells daily", siVal: "දිනකට මැරුණු සෛල මිලියන 500ක් හැලෙයි" },
    ],
    funFactEn: "A single square centimeter of human skin contains roughly 100 sweat glands, 15 sebaceous glands, and meters of microvascular vessels.",
    funFactSi: "මිනිස් සමේ එක් වර්ග සෙන්ටිමීටරයක් තුළ දහඩිය ග්‍රන්ථි 100ක්, ස්නායු අන්ත දහස් ගණනක් සහ රුධිර කේෂනාලිකා මීටර් ගණනක් අඩංගු වේ.",
    hotspots: [
      { 
        id: "epidermis", en: "Epidermis", si: "උපචර්මය", latin: "Epidermis", color: "#ee7c6a", position: [-0.05, 0.88, 1.4],
        descEn: "The outer cellular armor of keratinized stratified squamous cells protecting against moisture loss and microbial entry.",
        descSi: "සමේ පිටතම ආරක්ෂිත ස්ථරයයි. කෙරටින් සහිත සෛල මගින් ජලය පිටවීම වැළැක්වීම සහ විෂබීජ ඇතුළුවීම වළක්වයි."
      },
      { 
        id: "dermis", en: "Dermis", si: "චර්මය (සැබෑ සම)", latin: "Dermis", color: "#f2a33b", position: [0.29, 0.05, 1.4],
        descEn: "The thick connective tissue core rich in collagen, sensory receptors, blood capillaries, and thermoregulatory sweat glands.",
        descSi: "උපචර්මයට යටින් පිහිටි සැබෑ සමයි. ස්නායු අන්ත, රුධිර වාහිනී, දහඩිය ග්‍රන්ථි සහ කොලැජන් තන්තු මෙහි අඩංගු වේ."
      },
      { 
        id: "follicle", en: "Hair Follicle", si: "රෝම කූපය", latin: "Folliculus pili", color: "#d89bc4", position: [0.89, -0.44, 1.4],
        descEn: "Miniature epidermal invagination anchoring hair growth, connected with arrector pili muscles and sebum-producing glands.",
        descSi: "රෝම වර්ධනය වන කුඩා කූපයයි. මෙයට සම්බන්ධ සීබම් ග්‍රන්ථි මගින් සම තෙතමනයෙන් තබාගැනීම සිදුකරයි."
      },
    ],
  },
];

/* ------------------------------------------------------------
   THREE.JS 3D STAGE SETUP
------------------------------------------------------------ */

const FIT_SIZE = 2.9;
const CAMERA_FOV = 34;
const HOME_CAMERA = { x: 0, y: 0.35, z: 7.8 };
const DOT_PIXELS = 34;
const VIEW_LIFT = 0.3;
const TAU = Math.PI * 2;

const canvas = document.getElementById("stage");
const stageFrame = document.querySelector(".stage-frame");

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
camera.position.set(HOME_CAMERA.x, HOME_CAMERA.y, HOME_CAMERA.z);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 4.8;
controls.maxDistance = 12.0;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.85;
controls.target.set(0, 0, 0);

/* Lights */
scene.add(new THREE.AmbientLight(0xffffff, 0.45));
scene.add(new THREE.HemisphereLight(0xfff8ee, 0x33252d, 0.75));

const keyLight = new THREE.DirectionalLight(0xfff3e7, 3.5);
keyLight.position.set(4.8, 6.5, 6.8);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xe6ecff, 1.15);
fillLight.position.set(-4.5, 1.2, 5.2);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffb7a5, 1.6);
rimLight.position.set(-4, 3.5, -5.5);
scene.add(rimLight);

const warmLight = new THREE.PointLight(0xff8d70, 0.72, 11, 2);
warmLight.position.set(-3, -1.4, 3.5);
scene.add(warmLight);

const glowLight = new THREE.PointLight(0xee7c6a, 0.5, 8, 2);
glowLight.position.set(2.8, 0.4, 2.8);
scene.add(glowLight);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* Contact Shadow */
function makeShadowTexture() {
  const s = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, s * 0.06, s / 2, s / 2, s * 0.5);
  g.addColorStop(0, "rgba(96, 72, 52, 0.34)");
  g.addColorStop(0.55, "rgba(96, 72, 52, 0.14)");
  g.addColorStop(1, "rgba(96, 72, 52, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const shadowMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(3.6, 3.6),
  new THREE.MeshBasicMaterial({
    map: makeShadowTexture(), transparent: true, depthWrite: false,
  })
);
shadowMesh.rotation.x = -Math.PI / 2;
shadowMesh.position.y = -1.55;
scene.add(shadowMesh);

/* ------------------------------------------------------------
   MODEL LOADING & CACHING
------------------------------------------------------------ */

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const modelCache = new Map();
let currentPivot = null;
let currentMeshes = [];
let currentOrgan = null;

const loaderVeil = document.getElementById("loader");
const loaderFill = document.getElementById("loader-fill");
const loaderPct = document.getElementById("loader-pct");

let veilTimer = 0;
function showVeil() {
  clearTimeout(veilTimer);
  veilTimer = setTimeout(() => loaderVeil.classList.remove("hidden"), 200);
}
function hideVeil() {
  clearTimeout(veilTimer);
  loaderVeil.classList.add("hidden");
}

function tuneMaterial(mat) {
  mat.transparent = false;
  mat.opacity = 1;
  mat.depthWrite = true;
  mat.depthTest = true;
  mat.side = THREE.FrontSide;
  if (mat.isMeshStandardMaterial) {
    mat.roughness = THREE.MathUtils.clamp(mat.roughness ?? 0.5, 0.42, 0.62);
    mat.metalness = 0;
    mat.envMapIntensity = 0.32;
    if (mat.emissive) { mat.emissive.set(0x000000); mat.emissiveIntensity = 0; }
  }
  if (mat.isMeshPhysicalMaterial) {
    mat.clearcoat = THREE.MathUtils.clamp(mat.clearcoat ?? 0.1, 0.08, 0.12);
    mat.clearcoatRoughness = 0.62;
    if ("transmission" in mat) mat.transmission = 0;
  }
}

async function loadOrganModel(organ, onProgress) {
  if (modelCache.has(organ.id)) return modelCache.get(organ.id);

  const gltf = await loader.loadAsync(`models/${organ.id}.glb`, (e) => {
    if (e.total > 0) onProgress?.(e.loaded / e.total);
  });

  const model = gltf.scene;
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale = FIT_SIZE / Math.max(size.x, size.y, size.z, 0.001);
  model.scale.setScalar(scale);
  model.position.copy(center.multiplyScalar(-scale));

  const pivot = new THREE.Group();
  pivot.name = "organ-pivot";
  pivot.add(model);
  pivot.rotation.set(0.05, -0.28, 0);

  const meshes = [];
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  model.traverse((child) => {
    if (!child.isMesh) return;
    meshes.push(child);
    child.castShadow = false;
    child.receiveShadow = false;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    mats.forEach((m) => {
      tuneMaterial(m);
      if (m.map) m.map.anisotropy = maxAniso;
    });
  });

  const entry = { pivot, meshes };
  modelCache.set(organ.id, entry);
  return entry;
}

function prefetchOthers() {
  ORGANS.forEach((o) => {
    if (!modelCache.has(o.id)) {
      fetch(`models/${o.id}.glb`, { priority: "low" }).catch(() => {});
    }
  });
}

/* ------------------------------------------------------------
   HOTSPOTS & SPRITE MARKERS
------------------------------------------------------------ */

function rgba(color, alpha) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${alpha})`;
}

function dotTexture(hex) {
  const size = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d");
  const c = size / 2;
  const color = new THREE.Color(hex);

  const halo = ctx.createRadialGradient(c, c, size * 0.3, c, c, size * 0.5);
  halo.addColorStop(0, rgba(color, 0.45));
  halo.addColorStop(0.5, rgba(color, 0.16));
  halo.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = halo;
  ctx.beginPath(); ctx.arc(c, c, c, 0, TAU); ctx.fill();

  ctx.beginPath(); ctx.arc(c, c, size * 0.3, 0, TAU);
  ctx.fillStyle = "rgba(48, 32, 24, 0.25)"; ctx.fill();

  ctx.beginPath(); ctx.arc(c, c, size * 0.285, 0, TAU);
  ctx.fillStyle = "rgba(255, 253, 249, 0.98)"; ctx.fill();

  ctx.beginPath(); ctx.arc(c, c, size * 0.185, 0, TAU);
  ctx.fillStyle = rgba(color, 1); ctx.fill();

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function ringTexture() {
  const size = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d");
  const c = size / 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 1)";
  ctx.lineWidth = size * 0.04;
  ctx.beginPath(); ctx.arc(c, c, size * 0.42, 0, TAU); ctx.stroke();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const dotTexCache = new Map();
function getDotTex(hex) {
  if (!dotTexCache.has(hex)) dotTexCache.set(hex, dotTexture(hex));
  return dotTexCache.get(hex);
}

const dotLayer = new THREE.Group();
scene.add(dotLayer);

let markers = [];
let selectedHotspot = null;
let pulseStart = -1;

function buildMarkers(organ, pivot) {
  markers.forEach((m) => {
    dotLayer.remove(m.sprite);
    dotLayer.remove(m.ring);
    m.sprite.material.dispose();
    m.ring.material.dispose();
  });
  markers = [];
  selectedHotspot = null;
  pulseStart = -1;

  organ.hotspots.forEach((hs) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getDotTex(hs.color), transparent: true, depthTest: true, depthWrite: false,
    }));
    sprite.renderOrder = 10;
    dotLayer.add(sprite);

    const ring = new THREE.Sprite(new THREE.SpriteMaterial({
      map: ringTexture(), transparent: true, depthTest: false, depthWrite: false, opacity: 0,
    }));
    ring.renderOrder = 11;
    dotLayer.add(ring);

    markers.push({
      hotspot: hs, sprite, ring,
      anchorLocal: new THREE.Vector3(...hs.position),
      worldPos: new THREE.Vector3(),
      opacity: 1, targetOpacity: 1, emphasis: 0,
    });
  });
}

const raycaster = new THREE.Raycaster();
const tmpV = new THREE.Vector3();
const camDir = new THREE.Vector3();
let occlCursor = 0;

function updateMarkers(dt, elapsed) {
  if (!currentPivot) return;
  const h = renderer.domElement.clientHeight || 1;

  markers.forEach((m) => {
    m.worldPos.copy(m.anchorLocal).applyMatrix4(currentPivot.matrixWorld);

    tmpV.copy(camera.position).sub(m.worldPos).normalize();
    const lifted = tmpV.multiplyScalar(VIEW_LIFT).add(m.worldPos);

    m.sprite.position.copy(lifted);
    m.ring.position.copy(lifted);

    const dist = camera.position.distanceTo(lifted);
    const worldPerPx = (2 * dist * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2))) / h;
    const base = DOT_PIXELS * worldPerPx;
    const pulse = (selectedHotspot === m.hotspot && pulseStart > 0)
      ? 1 + 0.22 * Math.sin((elapsed - pulseStart) * 7) * Math.max(0, 1 - (elapsed - pulseStart) / 5)
      : 1;
    const s = base * (1 + m.emphasis * 0.28) * pulse;
    m.sprite.scale.set(s, s, 1);
    const rs = base * (2.0 + 0.35 * Math.sin(elapsed * 3.5));
    m.ring.scale.set(rs, rs, 1);

    m.opacity += (m.targetOpacity - m.opacity) * Math.min(1, dt * 8);
    m.sprite.material.opacity = m.opacity;

    const ringOn = selectedHotspot === m.hotspot;
    m.ring.material.opacity += ((ringOn ? 0.9 * m.opacity : 0) - m.ring.material.opacity) * Math.min(1, dt * 8);
  });

  if (markers.length && currentMeshes.length) {
    const m = markers[occlCursor++ % markers.length];
    camDir.copy(m.worldPos).sub(camera.position);
    const anchorDist = camDir.length();
    raycaster.set(camera.position, camDir.normalize());
    raycaster.far = anchorDist + 0.5;
    const hits = raycaster.intersectObjects(currentMeshes, false);
    m.targetOpacity = (hits.length > 0 && hits[0].distance < anchorDist - 0.14) ? 0.12 : 1;
  }
}

/* ------------------------------------------------------------
   POINTER INTERACTION (CLICK / HOVER)
------------------------------------------------------------ */

const pointer = { x: 0, y: 0, downX: 0, downY: 0, downT: 0 };
const projV = new THREE.Vector3();

function markerAtScreen(cx, cy, maxDist) {
  const rect = canvas.getBoundingClientRect();
  let best = null, bestD = maxDist;
  markers.forEach((m) => {
    if (m.opacity < 0.35) return;
    projV.copy(m.sprite.position).project(camera);
    if (projV.z > 1) return;
    const sx = rect.left + (projV.x * 0.5 + 0.5) * rect.width;
    const sy = rect.top + (-projV.y * 0.5 + 0.5) * rect.height;
    const d = Math.hypot(sx - cx, sy - cy);
    if (d < bestD) { bestD = d; best = m; }
  });
  return best;
}

canvas.addEventListener("pointerdown", (e) => {
  pointer.downX = e.clientX; pointer.downY = e.clientY;
  pointer.downT = performance.now();
  canvas.classList.add("dragging");
});

canvas.addEventListener("pointerup", (e) => {
  canvas.classList.remove("dragging");
  const moved = Math.hypot(e.clientX - pointer.downX, e.clientY - pointer.downY);
  const dt = performance.now() - pointer.downT;
  if (moved > 7 || dt > 600) return;

  const hit = markerAtScreen(e.clientX, e.clientY, 34);
  if (hit) {
    selectHotspot(hit.hotspot);
  } else if (selectedHotspot) {
    selectHotspot(null);
  }
});

canvas.addEventListener("pointermove", (e) => {
  if (e.buttons) return;
  const hit = markerAtScreen(e.clientX, e.clientY, 30);
  canvas.classList.toggle("hot", Boolean(hit));
  markers.forEach((m) => {
    const target = hit === m ? 1 : 0;
    m.emphasis += (target - m.emphasis) * 0.3;
  });
});

/* ------------------------------------------------------------
   CAMERA TWEENING & SMOOTH 3D FOCUS
------------------------------------------------------------ */

const btnRotate = document.getElementById("btn-rotate");
const btnReset = document.getElementById("btn-reset");
let autoRotateWanted = true;
let resumeTimer = 0;

btnRotate.addEventListener("click", () => {
  autoRotateWanted = !autoRotateWanted;
  controls.autoRotate = autoRotateWanted;
  btnRotate.classList.toggle("active", autoRotateWanted);
});

controls.addEventListener("start", () => {
  controls.autoRotate = false;
  clearTimeout(resumeTimer);
});
controls.addEventListener("end", () => {
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    if (autoRotateWanted && !isTourPlaying) controls.autoRotate = true;
  }, 2400);
});

btnReset.addEventListener("click", () => {
  selectHotspot(null);
  tweenCamera(HOME_CAMERA, 0.7);
});

let camTween = null;
function tweenCamera(toCam, dur = 0.7) {
  camTween = {
    from: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
    to: { x: toCam.x, y: toCam.y, z: toCam.z },
    t: 0,
    dur,
  };
}

function focusOnHotspot(hs, dur = 0.8) {
  if (!hs || !currentPivot) {
    tweenCamera(HOME_CAMERA, dur);
    return;
  }
  const pos = new THREE.Vector3(...hs.position);
  const angle = Math.atan2(pos.x, pos.z);
  const dist = 6.2;
  const targetCam = {
    x: Math.sin(angle) * dist,
    y: THREE.MathUtils.clamp(0.4 + pos.y * 0.2, 0.1, 1.0),
    z: Math.cos(angle) * dist,
  };
  tweenCamera(targetCam, dur);
}

/* ------------------------------------------------------------
   ORGAN SWITCHING
------------------------------------------------------------ */

let switchAnim = null;
let showToken = 0;

async function showOrgan(organ) {
  if (currentOrgan?.id === organ.id) return;
  const token = ++showToken;
  currentOrgan = organ;

  document.querySelectorAll(".organ-entry").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === organ.id);
  });
  
  const captionEl = document.getElementById("caption-name");
  if (currentLang === "en") captionEl.textContent = `${organ.en} (${organ.latin})`;
  else if (currentLang === "si") captionEl.textContent = `${organ.si} (${organ.latin})`;
  else captionEl.textContent = `${organ.en} · ${organ.si}`;

  selectHotspot(null);
  renderOverview(organ);

  showVeil();
  loaderFill.style.width = "0%";
  loaderPct.textContent = "0%";

  const entry = await loadOrganModel(organ, (p) => {
    if (token !== showToken) return;
    const pct = Math.round(p * 100);
    loaderFill.style.width = pct + "%";
    loaderPct.textContent = pct + "%";
  });
  if (token !== showToken) return;

  const prevPivot = currentPivot || switchAnim?.oldPivot || switchAnim?.newPivot || null;
  if (switchAnim?.oldPivot && switchAnim.oldPivot !== prevPivot) scene.remove(switchAnim.oldPivot);
  if (switchAnim?.newPivot && switchAnim.newPivot !== prevPivot) scene.remove(switchAnim.newPivot);

  switchAnim = { oldPivot: prevPivot, newPivot: entry.pivot, meshes: entry.meshes, t: 0, phase: "out" };
  currentPivot = null;
  currentMeshes = [];

  loaderFill.style.width = "100%";
  loaderPct.textContent = "100%";
  hideVeil();

  buildMarkers(organ, entry.pivot);
  prefetchOthers();
  updateTourUiForHotspot(null);
  controls.target.set(0, 0, 0);
  tweenCamera(HOME_CAMERA, 0.6);
}

/* ------------------------------------------------------------
   KNOWLEDGE CARDS IN ENGLISH & SINHALA (සිංහල)
------------------------------------------------------------ */

let currentLang = "bilingual"; // "bilingual", "en", or "si"
const infoContent = document.getElementById("info-content");

function factIcon() {
  return `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>`;
}

function renderOverview(organ) {
  infoContent.classList.remove("swap");
  void infoContent.offsetWidth;
  infoContent.classList.add("swap");

  let titleLine = `${organ.en} · ${organ.si}`;
  let poetic = `${organ.poeticEn} · ${organ.poeticSi}`;
  let desc = `${organ.descEn}<br/><br/><span style="color:var(--ink-soft);font-family:var(--font-si)">${organ.descSi}</span>`;
  let systemLine = `${organ.systemEn} · ${organ.systemSi} · <em style="font-family:var(--serif-en)">${organ.latin}</em>`;
  let funFact = `${organ.funFactEn}<br/><small style="font-family:var(--font-si);opacity:0.9;display:block;margin-top:6px">${organ.funFactSi}</small>`;

  if (currentLang === "en") {
    titleLine = organ.en;
    poetic = organ.poeticEn;
    desc = organ.descEn;
    systemLine = `${organ.systemEn} · <em style="font-family:var(--serif-en)">${organ.latin}</em>`;
    funFact = organ.funFactEn;
  } else if (currentLang === "si") {
    titleLine = organ.si;
    poetic = organ.poeticSi;
    desc = organ.descSi;
    systemLine = `${organ.systemSi} · <em style="font-family:var(--serif-en)">${organ.latin}</em>`;
    funFact = organ.funFactSi;
  }

  infoContent.innerHTML = `
    <div class="info-kicker"><span class="k-dot" style="background:${organ.accent}"></span> ${organ.en} · ${organ.si}</div>
    <div class="info-title-row">
      <div>
        <div class="info-title-en">${titleLine}</div>
        <div class="info-poetic">${poetic}</div>
      </div>
      <img class="info-thumb" src="assets/thumbs/${organ.id}.webp" alt="${organ.en}" />
    </div>
    <div class="info-zh-line">${systemLine}</div>
    <p class="info-desc">${desc}</p>
    <hr class="info-divider" />
    <div class="facts-title">Key Anatomical Facts · ප්‍රධාන කරුණු</div>
    ${organ.facts.map((f) => {
      const key = currentLang === "en" ? f.enKey : (currentLang === "si" ? f.siKey : `${f.enKey} / ${f.siKey}`);
      const val = currentLang === "en" ? f.enVal : (currentLang === "si" ? f.siVal : `${f.enVal} · ${f.siVal}`);
      return `
      <div class="fact-row">
        <span class="fact-key">${factIcon()}${key}</span>
        <span class="fact-val">${val}</span>
      </div>`;
    }).join("")}
    <div class="note-card gold">
      <div class="note-title">✦ Did you know? · ඔබ දැන සිටියාද?</div>
      <p>${funFact}</p>
    </div>
    <div class="note-card">
      <div class="note-title">◉ 3D Video Tour · වීඩියෝ චාරිකාව</div>
      <p>Click "Video Tour" at the bottom to watch a cinematic automated 3D tour, or click any glowing marker directly.<br/><small style="font-family:var(--font-si)">පහත “Video Tour” ඔබා ස්වයංක්‍රීය 3D වීඩියෝ චාරිකාව නරඹන්න, නැතහොත් ආකෘතිය මත ඇති ලක්ෂ්‍ය කෙලින්ම ඔබන්න.</small></p>
    </div>
  `;
}

function renderHotspotCard(organ, hs) {
  infoContent.classList.remove("swap");
  void infoContent.offsetWidth;
  infoContent.classList.add("swap");

  let kicker = `${organ.en} (${organ.si}) · Structure Close-Up / කොටස් විස්තරය`;
  let primaryTitle = `${hs.en} · ${hs.si}`;
  let descText = `${hs.descEn}<br/><br/><span style="color:var(--ink-soft);font-family:var(--font-si)">${hs.descSi}</span>`;
  let organName = `${organ.en} (${organ.si})`;
  let systemName = `${organ.systemEn} (${organ.systemSi})`;

  if (currentLang === "en") {
    kicker = `${organ.en} · Anatomical Structure`;
    primaryTitle = hs.en;
    descText = hs.descEn;
    organName = organ.en;
    systemName = organ.systemEn;
  } else if (currentLang === "si") {
    kicker = `${organ.si} · ව්‍යුහ විද්‍යාත්මක විස්තරය`;
    primaryTitle = hs.si;
    descText = hs.descSi;
    organName = organ.si;
    systemName = organ.systemSi;
  }

  infoContent.innerHTML = `
    <div class="hs-head">
      <span class="hs-dot" style="background:${hs.color}"></span>
      <span class="hs-kicker">${kicker}</span>
      <button class="close-x" id="btn-close" type="button" title="Close / වසන්න">×</button>
    </div>
    <div class="hs-name-zh" style="font-family:var(--font-si);font-size:22px;line-height:1.3;margin:4px 0">${primaryTitle}</div>
    <div class="hs-name-latin" style="font-family:var(--serif-en)">Latin: <em>${hs.latin}</em></div>
    <p class="hs-desc" style="margin-top:10px;line-height:1.65">${descText}</p>
    <hr class="info-divider" />
    <div class="facts-title">Classification · වර්ගීකරණය</div>
    <div class="fact-row">
      <span class="fact-key">${factIcon()}Organ / අවයවය</span>
      <span class="fact-val">${organName}</span>
    </div>
    <div class="fact-row">
      <span class="fact-key">${factIcon()}System / පද්ධතිය</span>
      <span class="fact-val">${systemName}</span>
    </div>
    <button class="back-link" id="btn-back" type="button" style="font-family:var(--font-si)">‹ Return to ${organ.en} Overview / ${organ.si} වෙත ආපසු</button>
  `;

  document.getElementById("btn-close").addEventListener("click", () => selectHotspot(null));
  document.getElementById("btn-back").addEventListener("click", () => selectHotspot(null));
}

function selectHotspot(hs) {
  selectedHotspot = hs;
  if (hs) {
    pulseStart = clock.elapsedTime;
    focusOnHotspot(hs, 1.0);
    playAudioEffect(currentOrgan?.id === "heart" ? "heart" : "chime");
    renderHotspotCard(currentOrgan, hs);
    updateTourUiForHotspot(hs);
  } else if (currentOrgan) {
    focusOnHotspot(null, 0.8);
    renderOverview(currentOrgan);
    updateTourUiForHotspot(null);
  }
}

/* ------------------------------------------------------------
   AUDIO SYNTHESIZER (WEB AUDIO API - ZERO EXTERNAL ASSETS)
------------------------------------------------------------ */

let audioCtx = null;
let soundEnabled = true;

function playAudioEffect(type = "chime") {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;

    if (type === "heart") {
      // Lub
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.frequency.setValueAtTime(85, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.12);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1); gain1.connect(audioCtx.destination);
      osc1.start(now); osc1.stop(now + 0.15);

      // Dub
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.frequency.setValueAtTime(110, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(45, now + 0.3);
      gain2.gain.setValueAtTime(0.35, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2); gain2.connect(audioCtx.destination);
      osc2.start(now + 0.18); osc2.stop(now + 0.33);
    } else {
      // Ethereal scanner chime
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.33);
    }
  } catch (e) {}
}

/* ------------------------------------------------------------
   CINEMATIC 3D VIDEO TOUR ENGINE
------------------------------------------------------------ */

let isTourPlaying = false;
let tourHotspotIdx = 0;
let tourPartSeconds = 4.5;
let tourPartRemaining = 4.5;

const btnTourPlay = document.getElementById("btn-tour-play");
const tourPlayIcon = document.getElementById("tour-play-icon");
const tourPlayText = document.getElementById("tour-play-text");
const btnTourPrev = document.getElementById("btn-tour-prev");
const btnTourNext = document.getElementById("btn-tour-next");
const tourPartTitle = document.getElementById("tour-part-title");
const tourPartCounter = document.getElementById("tour-part-counter");
const tourProgressFill = document.getElementById("tour-progress-fill");
const tourTimeline = document.getElementById("tour-timeline");
const btnSound = document.getElementById("btn-sound");
const btnLang = document.getElementById("btn-lang");

function updateTourUiForHotspot(hs) {
  if (!currentOrgan) return;
  const list = currentOrgan.hotspots || [];
  if (hs) {
    const idx = list.findIndex(h => h.id === hs.id);
    if (idx !== -1) tourHotspotIdx = idx;

    let nameDisplay = `${hs.en} · ${hs.si}`;
    if (currentLang === "en") nameDisplay = hs.en;
    else if (currentLang === "si") nameDisplay = hs.si;

    tourPartTitle.textContent = `${currentOrgan.en} (${currentOrgan.si}): ${nameDisplay}`;
    tourPartCounter.textContent = `Part ${tourHotspotIdx + 1} / ${list.length}`;
    const pct = ((tourHotspotIdx + 1) / list.length) * 100;
    tourProgressFill.style.width = pct + "%";
  } else {
    let readyText = `${currentOrgan.en} · ${currentOrgan.si} Overview · Ready for Tour`;
    if (currentLang === "si") readyText = `${currentOrgan.si} දළ විශ්ලේෂණය · 3D චාරිකාව අරඹන්න`;
    else if (currentLang === "en") readyText = `${currentOrgan.en} Overview · Press Play for 3D Tour`;

    tourPartTitle.textContent = readyText;
    tourPartCounter.textContent = `0 / ${list.length}`;
    tourProgressFill.style.width = "0%";
  }
}

function startTour() {
  if (!currentOrgan) return;
  isTourPlaying = true;
  btnTourPlay.classList.add("touring");
  tourPlayIcon.textContent = "⏸";
  tourPlayText.textContent = currentLang === "si" ? "විරාමය" : "Pause Tour";
  controls.autoRotate = false;
  tourPartRemaining = tourPartSeconds;

  const list = currentOrgan.hotspots || [];
  if (list.length > 0) {
    if (selectedHotspot) {
      const cur = list.findIndex(h => h.id === selectedHotspot.id);
      tourHotspotIdx = cur >= 0 ? cur : 0;
    } else {
      tourHotspotIdx = 0;
    }
    selectHotspot(list[tourHotspotIdx]);
  }
}

function pauseTour() {
  isTourPlaying = false;
  btnTourPlay.classList.remove("touring");
  tourPlayIcon.textContent = "▶";
  tourPlayText.textContent = currentLang === "si" ? "වීඩියෝ චාරිකාව" : "Video Tour";
}

function toggleTour() {
  if (isTourPlaying) pauseTour();
  else startTour();
}

function nextTourPart() {
  if (!currentOrgan) return;
  const list = currentOrgan.hotspots || [];
  if (list.length === 0) return;
  tourPartRemaining = tourPartSeconds;
  if (tourHotspotIdx < list.length - 1) {
    tourHotspotIdx++;
    selectHotspot(list[tourHotspotIdx]);
  } else {
    // Advance to next organ in library
    const curOrganIdx = ORGANS.findIndex(o => o.id === currentOrgan.id);
    const nextOrganIdx = (curOrganIdx + 1) % ORGANS.length;
    tourHotspotIdx = 0;
    showOrgan(ORGANS[nextOrganIdx]).then(() => {
      if (isTourPlaying) {
        setTimeout(() => {
          if (isTourPlaying && currentOrgan.hotspots?.length) {
            selectHotspot(currentOrgan.hotspots[0]);
          }
        }, 500);
      }
    });
  }
}

function prevTourPart() {
  if (!currentOrgan) return;
  const list = currentOrgan.hotspots || [];
  if (list.length === 0) return;
  tourPartRemaining = tourPartSeconds;
  if (tourHotspotIdx > 0) {
    tourHotspotIdx--;
    selectHotspot(list[tourHotspotIdx]);
  } else {
    tourHotspotIdx = list.length - 1;
    selectHotspot(list[tourHotspotIdx]);
  }
}

setInterval(() => {
  if (isTourPlaying && currentOrgan && currentOrgan.hotspots?.length) {
    tourPartRemaining -= 0.2;
    const list = currentOrgan.hotspots;
    const basePct = (tourHotspotIdx / list.length) * 100;
    const stepPct = (1 / list.length) * 100;
    const partProgress = Math.max(0, Math.min(1, 1 - (tourPartRemaining / tourPartSeconds)));
    tourProgressFill.style.width = (basePct + stepPct * partProgress) + "%";

    if (tourPartRemaining <= 0) {
      nextTourPart();
    }
  }
}, 200);

btnTourPlay.addEventListener("click", toggleTour);
btnTourNext.addEventListener("click", nextTourPart);
btnTourPrev.addEventListener("click", prevTourPart);

tourTimeline.addEventListener("click", (e) => {
  if (!currentOrgan || !currentOrgan.hotspots?.length) return;
  const rect = tourTimeline.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const list = currentOrgan.hotspots;
  const targetIdx = Math.min(list.length - 1, Math.floor(ratio * list.length));
  tourHotspotIdx = targetIdx;
  tourPartRemaining = tourPartSeconds;
  selectHotspot(list[tourHotspotIdx]);
});

btnSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  btnSound.textContent = soundEnabled ? "🔊" : "🔇";
  if (soundEnabled) playAudioEffect(currentOrgan?.id === "heart" ? "heart" : "chime");
});

btnLang.addEventListener("click", () => {
  if (currentLang === "bilingual") {
    currentLang = "si";
    btnLang.textContent = "🌐 සිංහල";
  } else if (currentLang === "si") {
    currentLang = "en";
    btnLang.textContent = "🌐 English";
  } else {
    currentLang = "bilingual";
    btnLang.textContent = "🌐 EN / සිංහල";
  }

  // Refresh Organ Library Labels
  updateOrganListLabels();

  // Refresh Caption
  const captionEl = document.getElementById("caption-name");
  if (currentOrgan) {
    if (currentLang === "en") captionEl.textContent = `${currentOrgan.en} (${currentOrgan.latin})`;
    else if (currentLang === "si") captionEl.textContent = `${currentOrgan.si} (${currentOrgan.latin})`;
    else captionEl.textContent = `${currentOrgan.en} · ${currentOrgan.si}`;
  }

  // Refresh Cards
  if (selectedHotspot) renderHotspotCard(currentOrgan, selectedHotspot);
  else if (currentOrgan) renderOverview(currentOrgan);
  updateTourUiForHotspot(selectedHotspot);
});

/* ------------------------------------------------------------
   ORGAN LIBRARY SIDEBAR
------------------------------------------------------------ */

const organList = document.getElementById("organ-list");

function updateOrganListLabels() {
  document.querySelectorAll(".organ-entry").forEach((btn) => {
    const org = ORGANS.find(o => o.id === btn.dataset.id);
    if (!org) return;
    const nameEnEl = btn.querySelector(".organ-name-en");
    const nameSiEl = btn.querySelector(".organ-name-zh");
    if (nameEnEl && nameSiEl) {
      if (currentLang === "en") {
        nameEnEl.textContent = org.en;
        nameSiEl.textContent = org.systemEn;
      } else if (currentLang === "si") {
        nameEnEl.textContent = org.si;
        nameSiEl.textContent = org.systemSi;
      } else {
        nameEnEl.textContent = org.en;
        nameSiEl.textContent = `${org.si} · ${org.systemSi}`;
      }
    }
  });
}

ORGANS.forEach((organ) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "organ-entry";
  btn.dataset.id = organ.id;
  btn.innerHTML = `
    <img class="organ-thumb" src="assets/thumbs/${organ.id}.webp" alt="${organ.en}" />
    <span class="organ-text">
      <span class="organ-name-en">${organ.en}</span>
      <span class="organ-name-zh" style="font-family:var(--font-si)">${organ.si} · ${organ.systemSi}</span>
    </span>
    <span class="organ-heart">♥</span>
  `;
  btn.addEventListener("click", () => showOrgan(organ));
  organList.appendChild(btn);
});

/* ------------------------------------------------------------
   RENDER LOOP
------------------------------------------------------------ */

const clock = new THREE.Clock();

function resize() {
  const w = stageFrame.clientWidth;
  const h = stageFrame.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;

  if (switchAnim) {
    switchAnim.t += dt;
    if (switchAnim.phase === "out") {
      const k = Math.min(switchAnim.t / 0.22, 1);
      if (switchAnim.oldPivot) {
        switchAnim.oldPivot.scale.setScalar(1 - 0.35 * k);
        if (k >= 1) {
          scene.remove(switchAnim.oldPivot);
          scene.add(switchAnim.newPivot);
          switchAnim.newPivot.scale.setScalar(0.55);
          switchAnim.phase = "in";
          switchAnim.t = 0;
          currentPivot = switchAnim.newPivot;
          currentMeshes = switchAnim.meshes;
        }
      } else {
        scene.add(switchAnim.newPivot);
        switchAnim.newPivot.scale.setScalar(0.55);
        switchAnim.phase = "in";
        switchAnim.t = 0;
        currentPivot = switchAnim.newPivot;
        currentMeshes = switchAnim.meshes;
      }
    } else {
      const k = Math.min(switchAnim.t / 0.5, 1);
      switchAnim.newPivot.scale.setScalar(0.55 + 0.45 * easeOutCubic(k));
      if (k >= 1) switchAnim = null;
    }
  }

  if (camTween) {
    camTween.t += dt;
    const k = Math.min(camTween.t / camTween.dur, 1);
    const e = easeOutCubic(k);
    camera.position.set(
      camTween.from.x + (camTween.to.x - camTween.from.x) * e,
      camTween.from.y + (camTween.to.y - camTween.from.y) * e,
      camTween.from.z + (camTween.to.z - camTween.from.z) * e
    );
    controls.target.set(0, 0, 0);
    if (k >= 1) camTween = null;
  }

  controls.update();
  if (currentPivot) currentPivot.updateMatrixWorld();
  updateMarkers(dt, elapsed);
  renderer.render(scene, camera);
}

/* ------------------------------------------------------------
   INITIALIZATION
------------------------------------------------------------ */

window.__atelier = {
  get markers() { return markers; },
  get camera() { return camera; },
  get organ() { return currentOrgan; },
  selectHotspot, showOrgan, ORGANS,
  startTour, pauseTour, toggleTour,
};

showOrgan(ORGANS[0]).catch((err) => {
  console.error(err);
  loaderPct.textContent = "Error / දෝෂයකි";
  loaderFill.style.background = "#c0392b";
  const tip = document.querySelector(".loader-label");
  if (tip) {
    tip.innerHTML = "Model loading requires HTTP server.<br/><small style='letter-spacing:0'>Double click <b>start_server.bat</b> to launch at http://localhost:8080</small>";
  }
});

animate();
