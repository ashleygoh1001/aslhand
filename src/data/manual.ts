// Site-wide content and build manual data.
// Edit this file to update text, tables, and parts without touching components.

export interface NavLink {
  path: string
  label: string
}

export interface HowItWorksStep {
  id: string
  label: string
  description: string
  icon: string
}

export interface CodeBlock {
  language: 'bash' | 'python' | 'text'
  code: string
}

export interface WiringRow {
  piPin: string
  pca9685Pin: string
  wireColor: string
  notes?: string
}

export interface Callout {
  type: 'warning' | 'caution' | 'info'
  title: string
  body: string
}

export interface ManualTable {
  headers: string[]
  rows: string[][]
}

export interface ManualSection {
  id: string
  title: string
  summary?: string
  paragraphs?: string[]
  steps?: string[]
  codeBlocks?: CodeBlock[]
  wiringTable?: WiringRow[]
  table?: ManualTable
  callouts?: Callout[]
  placeholder?: boolean
}

export interface PartItem {
  item: string
  quantity: string
  purpose: string
  href?: string
}

export interface DownloadItem {
  id: string
  label: string
  description: string
  href: string
}

export type TaglineEmphasisStyle = 'purple' | 'coral'

export const siteMeta = {
  welcomeLine: 'This is',
  title: 'Build Buddy @ Dartmouth',
  tagline: [
    { text: 'Teaching Dartmouth HCD minors how to ' },
    { text: 'design', emphasize: true, style: 'purple' },
    { text: ' and ' },
    { text: 'build', emphasize: true, style: 'coral' },
    { text: ' with physical parts' },
  ],
  subhead:
    '~12–20 hour build · No prior engineering experience required',
}

/** ASL fingerspelling sequence on the landing page — spells HELLO in order */
export const helloSigns = [
  {
    letter: 'H',
    src: '/hello/h.png',
    alt: 'ASL letter H — index and middle fingers extended',
    color: 'text-pop-purple',
  },
  {
    letter: 'E',
    src: '/hello/e.png',
    alt: 'ASL letter E — fingers curled, thumb tucked',
    color: 'text-pop-coral',
  },
  {
    letter: 'L',
    src: '/hello/l-1.png',
    alt: 'ASL letter L — index up, thumb out',
    color: 'text-pop-teal',
  },
  {
    letter: 'L',
    src: '/hello/l-2.png',
    alt: 'ASL letter L — index up, thumb out',
    color: 'text-dartmouth-green',
  },
  {
    letter: 'O',
    src: '/hello/o.png',
    alt: 'ASL letter O — thumb and index form a circle',
    color: 'text-pop-lemon',
  },
] as const

export const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/demo', label: 'Demo' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/build-manual', label: 'Build Manual' },
  { path: '/resources', label: 'Dartmouth Resources' },
]

export const demoVideo = {
  /** Hosted in public/demo.mov — replace file to update the demo */
  src: '/demo.mov',
  caption:
    'The hand listens through a USB microphone, transcribes speech on a Raspberry Pi, and drives five servos to curl each finger into ASL fingerspelling shapes.',
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'voice',
    label: 'Voice Input',
    description: 'You speak a word or letter into a USB microphone connected to the Pi.',
    icon: '🎤',
  },
  {
    id: 'pi',
    label: 'Raspberry Pi',
    description:
      'Python software transcribes speech and maps each letter to a finger-curl pattern.',
    icon: '🖥️',
  },
  {
    id: 'pca9685',
    label: 'PCA9685 Board',
    description:
      'The Pi sends PWM signals over I²C to a 16-channel servo driver breakout board.',
    icon: '🔌',
  },
  {
    id: 'servos',
    label: '5 Servos',
    description:
      'One servo per finger curls the index, middle, ring, pinky, and thumb independently.',
    icon: '⚙️',
  },
  {
    id: 'tendons',
    label: 'Tendons',
    description:
      'Fishing line tendons run through printed channels and pull fingertips toward the palm.',
    icon: '🧵',
  },
  {
    id: 'sign',
    label: 'ASL Sign',
    description:
      'The hand forms each letter of the alphabet in American Sign Language fingerspelling.',
    icon: '🤟',
  },
]

export const scopeCallout: Callout = {
  type: 'info',
  title: 'Honest scope note',
  body: 'This build uses 5 servos for finger curl only — no side-to-side thumb rotation or wrist movement. That means roughly 17 of 26 letters are accurate. Letters G, H, J, P, Q, and Z are approximations and may look different from a human signer.',
}

export const manualParts: ManualSection[] = [
  {
    id: 'part-1',
    title: 'Part 1: Parts Checklist',
    summary: 'Gather everything before you start. Check off each item as you unpack it.',
    paragraphs: [
      'Lay out all components on a clean workspace. Verify quantities against the parts list on the Dartmouth Resources page and below. Missing a single M3 screw can stall assembly for a day.',
      'Keep small parts in labeled bags. The tendon routing step is much easier if you do not mix up left-hand and right-hand print files.',
    ],
    table: {
      headers: ['Item', 'Qty', 'Check'],
      rows: [
        ['Raspberry Pi 4 (2 GB or 4 GB)', '1', '☐'],
        ['MicroSD card (16 GB+)', '1', '☐'],
        ['PCA9685 16-channel PWM board', '1', '☐'],
        ['SG90 micro servos', '5', '☐'],
        ['USB microphone', '1', '☐'],
        ['5 V power supply (≥ 3 A for Pi + servos)', '1', '☐'],
        ['Jumper wires (male–female)', '20', '☐'],
        ['Braided fishing line (20–30 lb test)', '1 spool', '☐'],
        ['M3 screws & nuts assortment', '1 kit', '☐'],
        ['3D-printed hand parts (see Dartmouth Resources)', '1 set', '☐'],
      ],
    },
    callouts: [
      {
        type: 'info',
        title: 'Before you power on',
        body: 'Do not connect servo power to the Pi’s 5 V pin. The PCA9685 has a separate V+ terminal for servos — use it.',
      },
    ],
  },
  {
    id: 'part-2',
    title: 'Part 2: Set Up the Raspberry Pi (Headless via SSH)',
    summary:
      'Flash Raspberry Pi OS, enable SSH, and connect from your laptop — no monitor required.',
    steps: [
      'Download Raspberry Pi Imager from raspberrypi.com and flash Raspberry Pi OS (64-bit) to your microSD card.',
      'Before ejecting the card, enable SSH: create an empty file named `ssh` in the boot partition.',
      'Create a `wpa_supplicant.conf` or use Imager’s advanced options to set Wi-Fi credentials and a hostname (e.g. `aslhand.local`).',
      'Insert the SD card, connect power, and wait ~90 seconds for first boot.',
      'From your laptop on the same network, open a terminal and SSH in.',
    ],
    codeBlocks: [
      {
        language: 'bash',
        code: `# TODO: replace with your Pi's hostname or IP address
ssh pi@aslhand.local

# First-login system update
sudo apt update && sudo apt upgrade -y

# Enable I2C (required for PCA9685)
sudo raspi-config nonint do_i2c 0

# Install Python dependencies
sudo apt install -y python3-pip python3-venv i2c-tools

# Verify I2C is enabled (after wiring Part 3)
i2cdetect -y 1`,
      },
    ],
    callouts: [
      {
        type: 'warning',
        title: 'Default password',
        body: 'Change the default `pi` user password on first login. Never leave a headless Pi on a shared network with factory credentials.',
      },
      {
        type: 'caution',
        title: 'Wi-Fi troubleshooting',
        body: 'If `aslhand.local` does not resolve, find the Pi’s IP in your router’s DHCP client list and SSH with `ssh pi@192.168.x.x` instead.',
      },
    ],
  },
  {
    id: 'part-3',
    title: 'Part 3: Wire Up the Electronics',
    summary:
      'Connect the Pi to the PCA9685 over I²C, then hook up servos and a shared power rail.',
    paragraphs: [
      'Power off everything before wiring. Connect signal wires first, then ground, then servo power last.',
      'Each servo plugs into one channel on the PCA9685: signal (orange/yellow), V+ (red), GND (brown/black).',
      'Use a dedicated 5 V supply for servo V+ on the PCA9685. Tie grounds together: Pi GND ↔ PCA9685 GND ↔ power supply GND.',
    ],
    wiringTable: [
      { piPin: 'Pin 1 — 3.3 V', pca9685Pin: 'VCC', wireColor: 'Red', notes: 'Logic power only' },
      { piPin: 'Pin 3 — SDA (GPIO 2)', pca9685Pin: 'SDA', wireColor: 'Blue' },
      { piPin: 'Pin 5 — SCL (GPIO 3)', pca9685Pin: 'SCL', wireColor: 'Yellow' },
      { piPin: 'Pin 6 — GND', pca9685Pin: 'GND', wireColor: 'Black' },
      { piPin: 'External 5 V supply +', pca9685Pin: 'V+ (terminal block)', wireColor: 'Red', notes: 'Servo power — NOT Pi 5 V' },
      { piPin: 'External 5 V supply −', pca9685Pin: 'GND (terminal block)', wireColor: 'Black' },
    ],
    table: {
      headers: ['Finger', 'PCA9685 Channel', 'Servo'],
      rows: [
        ['Index', '0', 'SG90 #1'],
        ['Middle', '1', 'SG90 #2'],
        ['Ring', '2', 'SG90 #3'],
        ['Pinky', '4', 'SG90 #4'],
        ['Thumb', '5', 'SG90 #5'],
      ],
    },
    callouts: [
      {
        type: 'warning',
        title: 'Never hot-plug servos under load',
        body: 'Disconnect power before moving wires. A stalled servo can draw enough current to brown out the Pi.',
      },
    ],
  },
  {
    id: 'part-4',
    title: 'Part 4: Mechanical Assembly',
    summary: 'Mount servos, attach finger segments, and install the palm base.',
    placeholder: true,
    paragraphs: [
      // TODO: Paste full assembly instructions here
      'Placeholder — detailed assembly steps will go here. Include servo horn orientation, M3 screw torque notes, and palm lid sequence.',
    ],
  },
  {
    id: 'part-5',
    title: 'Part 5: Threading Tendons',
    summary: 'Route fishing line through each finger channel and tie off at the fingertip.',
    placeholder: true,
    paragraphs: [
      // TODO: Paste tendon threading instructions here
      'Placeholder — include line routing diagram references, knot types, and tension guidelines for each finger.',
    ],
  },
  {
    id: 'part-6',
    title: 'Part 6: Software Setup',
    summary: 'Clone the project repo, install dependencies, and run the voice-to-sign pipeline.',
    placeholder: true,
    codeBlocks: [
      {
        language: 'bash',
        code: `# TODO: Replace with real repository URL
git clone https://github.com/your-org/aslhand.git
cd aslhand
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# TODO: Replace with real run command
python main.py`,
      },
    ],
    paragraphs: [
      // TODO: Paste software configuration steps here
      'Placeholder — microphone selection, speech recognition API keys (if any), and systemd auto-start instructions.',
    ],
  },
  {
    id: 'part-7',
    title: 'Part 7: Calibration',
    summary: 'Tune each servo’s min/max angles so every letter lands cleanly.',
    placeholder: true,
    codeBlocks: [
      {
        language: 'python',
        code: `# TODO: Paste calibration script or interactive tuning commands
# Example: set finger curl angle for letter "A"
from hand import Hand
hand = Hand()
hand.calibrate_finger("index", open_angle=10, closed_angle=85)`,
      },
    ],
    paragraphs: [
      // TODO: Paste calibration workflow here
      'Placeholder — per-letter tuning table, save-to-file format, and test phrase suggestions.',
    ],
  },
]

export const partsList: PartItem[] = [
  {
    item: 'Raspberry Pi 4 Model B (2 GB)',
    quantity: '1',
    purpose: 'On-board computer for speech recognition and servo control',
    href: '#', // TODO: vendor link
  },
  {
    item: 'MicroSD card (16 GB, Class 10)',
    quantity: '1',
    purpose: 'Raspberry Pi OS storage',
    href: '#', // TODO: vendor link
  },
  {
    item: 'PCA9685 16-channel PWM driver',
    quantity: '1',
    purpose: 'I²C interface to drive up to 16 servos',
    href: '#', // TODO: vendor link
  },
  {
    item: 'SG90 micro servo',
    quantity: '5',
    purpose: 'One per finger — index, middle, ring, pinky, thumb',
    href: '#', // TODO: vendor link
  },
  {
    item: 'USB condenser microphone',
    quantity: '1',
    purpose: 'Captures spoken words for transcription',
    href: '#', // TODO: vendor link
  },
  {
    item: '5 V 3 A power supply',
    quantity: '1',
    purpose: 'Powers Pi and servos (use a barrel jack or terminal block split)',
    href: '#', // TODO: vendor link
  },
  {
    item: 'Dupont jumper wires (M–F)',
    quantity: '20',
    purpose: 'Pi ↔ PCA9685 connections',
    href: '#', // TODO: vendor link
  },
  {
    item: 'Braided fishing line (20 lb test)',
    quantity: '1 spool',
    purpose: 'Tendons that curl each finger',
    href: '#', // TODO: vendor link
  },
  {
    item: 'M3 × 8 mm screws & nuts',
    quantity: '~30',
    purpose: 'Servo mounting and finger joint assembly',
    href: '#', // TODO: vendor link
  },
  {
    item: 'PLA filament (~200 g)',
    quantity: '1 roll',
    purpose: '3D-printed palm, fingers, and servo mounts',
    href: '#', // TODO: vendor link
  },
]

export const toolsList: string[] = [
  'Laptop with SSH client (macOS Terminal, Windows PuTTY, or Linux)',
  'Phillips-head screwdriver (small)',
  'Wire strippers or flush cutters',
  'Needle-nose pliers (for tendon threading)',
  'Multimeter (optional but helpful for debugging power)',
  '3D printer access (~6–8 hour print time for all parts)',
  'Raspberry Pi Imager (free download)',
]

/** Google Drive folder with all hand STL files (Arm, fingers, Left/Right Hand, etc.) */
export const stlFilesUrl =
  'https://drive.google.com/drive/folders/1s3dWR7tIZK6eXvIeR3uY36rGJj1A0x3W?usp=drive_link'

export const stlFiles = {
  label: '3D Print Files (STLs)',
  description:
    'Download the Robo Hand STL files (palm, fingers, arm, covers) from here.',
  href: stlFilesUrl,
}

/** Printable instruction manual — file in public/instructions-manual.pdf */
export const pdfManual = {
  label: 'Printable PDF Manual',
  description:
    'Download and print the full instruction manual for offline use in the lab or workshop.',
  href: '/instructions-manual.pdf',
  downloadFilename: 'Instructions.pdf',
}

export const downloads: DownloadItem[] = [
  {
    id: 'stl',
    label: stlFiles.label,
    description: stlFiles.description,
    href: stlFiles.href,
  },
  {
    id: 'code',
    label: 'Python Source Code',
    description: 'Speech-to-sign pipeline, servo mapping, and calibration utilities.',
    href: '#', // TODO: link to GitHub repo or zip download
  },
  {
    id: 'pdf',
    label: pdfManual.label,
    description: pdfManual.description,
    href: pdfManual.href,
  },
]

export interface PrintingLocation {
  id: string
  name: string
  summary: string
  address: string
  building: string
  /** Google Maps embed URL — TODO: swap for a custom campus map image if you prefer */
  mapEmbedUrl: string
  websiteHref: string
  websiteLabel: string
  email?: string
  highlights: string[]
}

export const dartmouthResources = {
  title: 'Dartmouth Resources',
  subtitle:
    'Where to 3D print your hand parts on campus — equipment, people, and how to find the makerspace.',
  intro:
    'Every piece of this build that isn’t ordered online comes off a 3D printer. Dartmouth has two great options at Thayer: the Cable Makerspace for walk-in, self-serve printing with student TAs, and the MShop (Engineering Machine Shop) for staff-assisted PLA prints through an online queue.',
  steps: [
    {
      title: 'Review your STL files',
      body: 'Download the hand print files from our Google Drive folder (Arm, Finger_Index, Left_Hand, Right_Hand, and more). Check that each part is oriented for minimal supports before slicing.',
    },
    {
      title: 'Pick a printing location',
      body: 'Cable Makerspace — best for first-time makers who want hands-on help at the printer. MShop — best if you prefer to submit files online and pick up finished parts from Cummings Hall (typical lead time ~3–4 workdays).',
    },
    {
      title: 'Get oriented',
      body: 'At Cable Makerspace, walk in during open hours for a safety intro and slicing help. At MShop, submit your STLs through the online print request form and watch for email when parts are ready.',
    },
    {
      title: 'Print & pick up',
      body: 'A full hand set takes several hours of print time. Plan ahead — especially if using the MShop queue during busy weeks.',
    },
  ],
  locations: [
    {
      id: 'cable-makerspace',
      name: 'Harold Edward Cable Makerspace',
      summary:
        'Open to all Dartmouth students, faculty, and staff. Laser cutters, Prusa 3D printers, hand tools, and CAD workstations — staffed by trained student TAs.',
      address: '15 Thayer Drive, Suite 003, Hanover, NH 03755',
      building:
        'Ground floor, Class of 1982 Engineering & Computer Science Center (ECSC) — just off the atrium',
      mapEmbedUrl:
        'https://www.google.com/maps?q=Harold+Edward+Cable+Makerspace,+15+Thayer+Drive,+Hanover,+NH+03755&output=embed',
      websiteHref: 'https://cablemakerspace.dartmouth.edu/',
      websiteLabel: 'Cable Makerspace website',
      highlights: [
        'Prusa MK3S+ 3D printers (PLA)',
        'Prusa Slicer & CAD workstations on site',
        'Student tech instructors for hands-on help',
        'Walk-in during open hours — no engineering major required',
      ],
    },
    {
      id: 'mshop',
      name: 'MShop (Dartmouth Engineering Machine Shop)',
      summary:
        'Thayer’s full machine shop and makerspace. Submit PLA parts through an online queue; staff run the printers and email you when parts are ready for pickup.',
      address: 'Cummings Hall, 15 Thayer Drive, Hanover, NH 03755',
      building: 'Lower level, Cummings Hall (C025 area) — pickup cubbies outside the shop',
      mapEmbedUrl:
        'https://www.google.com/maps?q=Dartmouth+Engineering+Machine+Shop,+Cummings+Hall,+Hanover,+NH+03755&output=embed',
      websiteHref: 'https://sites.dartmouth.edu/mshop/',
      websiteLabel: 'MShop website & print request',
      email: 'mshop@thayer.dartmouth.edu',
      highlights: [
        'Online PLA print submission (Prusa printers)',
        'Staff-operated queue — ~3–4 workday lead time advised',
        'Pickup in cubbies outside MShop or a location you choose',
        'Also offers laser cutting, CNC, welding, and training sessions',
      ],
    },
  ] satisfies PrintingLocation[],
}

/** Slide images exported from Instructions.pptx — re-run scripts/export-manual-slides.mjs to refresh */
export const manualBook = {
  title: 'Instruction Manual',
  subtitle: 'Scroll to turn the pages — your full build presentation from class.',
  /** vh of scroll height per page (controls how fast pages turn) */
  scrollHeightPerPage: 40,
  slides: Array.from({ length: 44 }, (_, i) => ({
    src: `/manual-book/slide-${String(i + 1).padStart(2, '0')}.png`,
    alt: `Instruction manual page ${i + 1}`,
  })),
}

export type CopyPasteBlock = {
  part: number
  step: number
  title: string
  description?: string
  content: string
}

/** Copy/paste-friendly coding notes shown under the instruction manual. */
export const codingCopyPaste: CopyPasteBlock[] = [
  {
    part: 1,
    step: 17,
    title: 'SSH into the Pi',
    description: 'Copy/paste this into your terminal to connect.',
    content: `ashleypi@aslhand.local`,
  },
  {
    part: 1,
    step: 18,
    title: 'Update + install dependencies on the Pi',
    description: 'Paste into your terminal after connecting via SSH.',
    content: `ashleypi@aslhand.local:~ $ sudo apt update
ashleypi@aslhand.local:~ $ sudo apt upgrade -y
ashleypi@aslhand.local:~ $ sudo apt install -y python3-pip i2c-tools portaudio19-dev flac
`,
  },
  {
    part: 1,
    step: 19,
    title: 'Open Raspberry Pi configuration',
    description: 'Paste into your terminal.',
    content: `ashleypi@aslhand.local:~ $ sudo raspi-config
`,
  },
  {
    part: 1,
    step: 20,
    title: 'Install Python packages on the Pi',
    description: 'Paste into your terminal.',
    content: `ashleypi@aslhand.local:~ $ pip3 install --break-system-packages adafruit-circuitpython-pca9685 adafruit-circuitpython-servokit SpeechRecognition pyaudio
`,
  },
  {
    part: 1,
    step: 21,
    title: 'Test the microphone',
    description: 'Paste into your terminal.',
    content: `ashleypi@aslhand.local:~ $ arecord -l
ashleypi@aslhand.local:~ $ arecord -D plughw:1,0 -d 5 test.wav 
ashleypi@aslhand.local:~ $ ls -lh test.wav


`,
  },
  {
    part: 3,
    step: 5,
    title: 'Create the ASL hand script',
    description: 'Paste into your terminal.',
    content: `ashleypi@aslhand.local:~ $ nano asl_hand.py
`,
  },
  {
    part: 3,
    step: 6,
    title: 'ASL hand script (paste into nano)',
    description: 'Copy this entire script, then paste into nano and save.',
    content: `from adafruit_servokit import ServoKit
import speech_recognition as sr
import time

kit = ServoKit(channels=16)

# === CALIBRATED ANGLES — REPLACE WITH YOUR NUMBERS ===
# Format: (open_angle, closed_angle)
THUMB  = (30, 150)   # CHANGE THIS
INDEX  = (30, 150)   # CHANGE THIS
MIDDLE = (30, 150)   # CHANGE THIS
RING   = (30, 150)   # CHANGE THIS
PINKY  = (30, 150)   # CHANGE THIS

CHANNELS = [0, 1, 2, 3, 4]                       # thumb, index, middle, ring, pinky
RANGES   = [THUMB, INDEX, MIDDLE, RING, PINKY]
FINGER_NAMES = ["Thumb", "Index", "Middle", "Ring", "Pinky"]

# Each letter is (thumb, index, middle, ring, pinky)
# 0 = open/straight, 1 = closed/curled
ASL = {
    'A': (1, 1, 1, 1, 1),   # fist, thumb on side
    'B': (1, 0, 0, 0, 0),   # 4 fingers up, thumb across palm
    'C': (0, 0, 0, 0, 0),   # curved (approximated as open)
    'D': (1, 0, 1, 1, 1),   # index up, others closed
    'E': (1, 1, 1, 1, 1),   # all curled
    'F': (0, 1, 0, 0, 0),   # thumb+index touch (approximated)
    'G': (0, 0, 1, 1, 1),   # sideways - approximated
    'H': (1, 0, 0, 1, 1),   # sideways - approximated
    'I': (1, 1, 1, 1, 0),   # pinky up only
    'J': (1, 1, 1, 1, 0),   # like I (motion not possible)
    'K': (0, 0, 0, 1, 1),   # index+middle up, thumb between
    'L': (0, 0, 1, 1, 1),   # thumb+index L shape
    'M': (1, 1, 1, 1, 1),   # thumb under three fingers (approximated)
    'N': (1, 1, 1, 1, 1),   # thumb under two fingers (approximated)
    'O': (0, 1, 1, 1, 1),   # round shape (approximated)
    'P': (0, 0, 0, 1, 1),   # like K but downward (approximated)
    'Q': (0, 0, 1, 1, 1),   # like G but downward (approximated)
    'R': (1, 0, 0, 1, 1),   # crossed fingers (approximated)
    'S': (1, 1, 1, 1, 1),   # fist with thumb across
    'T': (1, 1, 1, 1, 1),   # thumb between index+middle (approximated)
    'U': (1, 0, 0, 1, 1),   # index+middle up together
    'V': (1, 0, 0, 1, 1),   # like U (spread not possible)
    'W': (1, 0, 0, 0, 1),   # three middle fingers up
    'X': (1, 1, 1, 1, 1),   # bent index (approximated as fist)
    'Y': (0, 1, 1, 1, 0),   # thumb+pinky out
    'Z': (1, 0, 1, 1, 1),   # like D (motion not possible)
}

def set_finger(i, state):
    """state: 0 = open, 1 = closed"""
    open_a, closed_a = RANGES[i]
    target = closed_a if state == 1 else open_a
    kit.servo[CHANNELS[i]].angle = target

def sign_letter(letter):
    letter = letter.upper()
    if letter not in ASL:
        return
    print(f"Signing: {letter}")
    pose = ASL[letter]
    for i in range(5):
        set_finger(i, pose[i])
    time.sleep(0.9)

def relax():
    for i in range(5):
        set_finger(i, 0)
    time.sleep(0.4)

def sign_word(word):
    for ch in word:
        if ch.isalpha():
            sign_letter(ch)
            relax()
        else:
            time.sleep(0.4)

def main():
    r = sr.Recognizer()
    mic = sr.Microphone()
    print("Calibrating microphone for ambient noise...")
    with mic as source:
        r.adjust_for_ambient_noise(source, duration=2)
    print("Ready. Speak a word.")
    relax()
    while True:
        try:
            with mic as source:
                print("Listening...")
                audio = r.listen(source, timeout=5, phrase_time_limit=5)
            text = r.recognize_google(audio)
            print(f"Heard: {text}")
            sign_word(text)
        except sr.WaitTimeoutError:
            continue
        except sr.UnknownValueError:
            print("Could not understand. Try again.")
        except KeyboardInterrupt:
            print("\\nExiting.")
            relax()
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()

`,
  },
  {
    part: 3,
    step: 7,
    title: 'Run the ASL hand script',
    description: 'Paste into your terminal.',
    content: `ashleypi@aslhand.local:~ $ python3 asl_hand.py
`,
  },
]
