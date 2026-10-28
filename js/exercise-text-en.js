// GainPath: exercise tips and instructions in English, plus the lookup helpers
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Always loaded. The Japanese and Korean
// text lives in exercise-text-ja.js / exercise-text-ko.js (loadExText in js/ui-core.js);
// the placeholders below keep every lookup working until that file has loaded.
var EX_NAMES_JA={},EX_NAMES_KO={},EX_TIPS_JA={},EX_TIPS_KO={},EX_INSTRUCTIONS_JA={},EX_INSTRUCTIONS_KO={};
// ═══ PER-EXERCISE REST-SCREEN TIPS ═══
const EX_TIPS={
  "Barbell front squat Olympic": [
    "Keep your elbows high and pointing forward the entire set — if they drop, the bar rolls forward.",
    "Rest the bar on your front delts, not your wrists; fingertips just keep it in place.",
    "Stay more upright than a back squat — think chest tall, torso vertical.",
    "Drive your knees forward and out over your toes as you descend.",
    "Brace your core hard before each rep; the front rack punishes a soft torso.",
    "If wrist mobility is limited, try a cross-arm grip while keeping elbows high."
  ],
  "Dumbbell goblet squat": [
    "Hug the dumbbell tight against your sternum with elbows pointing down.",
    "At the bottom, let your elbows brush the insides of your knees — that's your depth cue.",
    "Keep your heels planted; push the floor away to stand.",
    "Sit down between your hips, not back like a hinge.",
    "Keep your chest proud so the weight doesn't pull you forward.",
    "Perfect first squat — own this before loading a barbell."
  ],
  "Walking lunge": [
    "Take a long enough step that your front knee stays over your ankle.",
    "Lower the back knee toward the floor — don't just lean forward.",
    "Push through the front heel to step through into the next lunge.",
    "Keep your torso tall; the dumbbells hang quiet at your sides.",
    "Alternate legs every step — count total steps, not per leg.",
    "Shorter steps hit quads more; longer steps shift work to the glutes."
  ],
  "Dumbbell step-up": [
    "Put your whole foot on the box, not just the toes.",
    "Drive through the heel of the top leg — the floor leg only balances.",
    "Stand all the way up at the top before stepping down.",
    "Control the descent; don't drop off the box.",
    "Keep your torso tall — no diving forward over the box.",
    "Finish all reps on one leg before switching, or alternate consistently."
  ],
  "Barbell deadlift": [
    "The bar starts on the floor every rep — reset, don't bounce.",
    "Keep the bar dragging up your shins and thighs; distance from the body is wasted force.",
    "Hips and shoulders rise together — if hips shoot up first, the weight is too heavy.",
    "Lock out by squeezing your glutes, not leaning back.",
    "Brace your core like you're about to be punched before you pull.",
    "Arms are hooks: never bend your elbows to help the bar up."
  ],
  "Cable standing glute kickback": [
    "Hinge slightly forward and hold the tower so only the leg moves.",
    "Kick back and up in one line — squeeze the glute hard at the top.",
    "Keep your hips square; don't open them toward the working side.",
    "Don't arch the lower back to fake extra height.",
    "The knee stays nearly straight — bending it turns this into a leg curl.",
    "Slow negatives make a light stack feel heavy — control the return."
  ],
  "Landmine T-bar rows": [
    "Set your hinge at 45 degrees and freeze it there for the whole set.",
    "Pull the handle to your lower chest, elbows driving up and back.",
    "Squeeze your shoulder blades together for a beat at the top.",
    "Don't stand up to move the weight — that's momentum, not back.",
    "Keep a flat back; rounding under fatigue is the #1 injury risk here.",
    "Brace your legs — they're your platform, not your engine."
  ],
  "Machine assisted pull-up": [
    "The stack number is your assistance — progress means it goes DOWN over time.",
    "Start from a full dead hang; half reps build half a pull-up.",
    "Pull your elbows down and back rather than thinking about your chin.",
    "Keep your body vertical — no swinging or kipping on the pad.",
    "When you're down to a small assist, start testing bodyweight pull-ups.",
    "Control the way up AND the way down; the negative builds the most strength."
  ],
  "Single-arm lat pulldown": [
    "Let the working shoulder reach up for a full stretch at the top.",
    "Pull the elbow down toward your hip, not the handle to your chin.",
    "Keep your torso square — no twisting toward the cable.",
    "Match reps exactly on both sides; the weaker side sets the number.",
    "Pause a beat at the bottom with the shoulder blade pulled down.",
    "Lighter than your two-arm pulldown is correct — no cheating with lean."
  ],
  "Chest dips": [
    "Lean your torso forward about 30 degrees — upright dips hit triceps instead.",
    "Bend your knees and cross your ankles to keep the lean natural.",
    "Go down until your shoulders are near elbow level — deep, but pain-free.",
    "Let your elbows flare slightly out, unlike the tucked triceps version.",
    "Squeeze your chest to press back up; don't lock out harshly.",
    "If shoulders complain, reduce depth before reducing lean."
  ],
  "Barbell upright row": [
    "Take a grip at shoulder width — very narrow grips grind the wrists.",
    "Lead with your elbows; they stay above your wrists the whole way.",
    "Stop at upper-chest height — pulling to the chin strains the shoulders.",
    "Keep the bar close enough to almost brush your shirt.",
    "No lean-back or hip bump; strict and smooth wins here.",
    "If it pinches your shoulders, widen the grip or lower the top point."
  ],
  "Machine standing lateral raise": [
    "Push through your elbows into the pads, not your hands.",
    "Raise until your upper arms are parallel to the floor — no higher.",
    "Keep your shoulders pressed down; don't let your traps shrug in.",
    "Pause a moment at the top; the machine can't be cheated with swing.",
    "Lower slowly — the negative is half the exercise.",
    "Set the seat so the pivot lines up with your shoulder joint."
  ],
  "Barbell push press": [
    "Dip shallow — a quarter squat, torso perfectly vertical.",
    "Drive up hard with the legs and let the bar fly off your shoulders.",
    "Punch your head 'through the window' once the bar passes your face.",
    "Finish with the bar stacked over your mid-foot, ribs down.",
    "The dip goes straight down, never forward — a forward dip throws the bar out front.",
    "It's a leg-powered press: heavier than your strict press is the point."
  ],
  "EZ bar curl": [
    "Grip the angled sections — that slight wrist tilt is the whole reason for the bar.",
    "Pin your elbows to your ribs; only the forearms move.",
    "Curl to upper-chest height — higher just rolls your elbows forward.",
    "Lower in control for a slow count; don't let the bar drop.",
    "Stand tall — leaning back turns curls into a front raise.",
    "Keep your wrists straight; don't curl them at the top."
  ],
  "Dumbbell incline curl": [
    "Let your arms hang straight down and slightly behind you — that stretch is the point.",
    "Keep your elbows pointing at the floor as you curl; don't swing them forward.",
    "Keep your head and shoulders on the pad the whole set.",
    "Start lighter than your standing curl — the stretch position is unforgiving.",
    "Curl both arms together, smooth and controlled.",
    "Full stretch at the bottom of every rep; no half reps."
  ],
  "Dumbbell concentration curl": [
    "Brace the back of your elbow into your inner thigh and keep it welded there.",
    "Curl toward your shoulder, rotating your pinky slightly up at the top.",
    "Only the forearm moves — zero torso rock, zero shoulder lift.",
    "Squeeze hard for a full second at the top.",
    "Lower until your arm is completely straight every rep.",
    "This is a strict isolation lift — light weight, perfect reps."
  ],
  "EZ bar reverse curl": [
    "Palms down the whole set — the awkward grip is the exercise.",
    "Keep your wrists dead straight; don't let them buckle downward.",
    "Elbows pinned to your sides; curl only with the forearms.",
    "Expect to use much less weight than a normal curl — that's correct.",
    "Lower slowly; forearms grow on the negative.",
    "Grip the bar hard — crushing the bar recruits more forearm."
  ],
  "Machine seated plate-loaded preacher curl": [
    "Set the seat so your armpits hook snugly over the top of the pad.",
    "Keep your upper arms glued to the pad from full stretch to full squeeze.",
    "Extend almost fully at the bottom without slamming the stack.",
    "Don't lift your chest off the pad to grind out reps.",
    "Squeeze at the top, then take two full seconds down.",
    "The machine locks your form — use that to chase a deep burn safely."
  ],
  "EZ bar overhead tricep extension": [
    "Keep your upper arms vertical beside your ears; only elbows bend.",
    "Lower the bar well behind your head for the full long-head stretch.",
    "Keep your elbows narrow — flaring turns it into a press.",
    "Brace your core so your lower back doesn't arch off the pad.",
    "Press back up to a full lockout directly overhead.",
    "Go lighter than pushdowns; the stretch position is brutal."
  ],
  "Ab wheel rollout": [
    "Tuck your hips slightly and squeeze your glutes before you roll.",
    "Roll out only as far as you can keep your lower back from arching.",
    "Your abs pull you back — the arms just steer the wheel.",
    "Keep your arms straight; bending them turns it into a triceps exercise.",
    "Exhale as you pull back in; brace before you roll out.",
    "Add distance gradually — a full flat rollout is an advanced feat."
  ],
  "Elbow side plank": [
    "Stack your elbow directly under your shoulder before lifting.",
    "Lift your hips until you're one ruler-straight line from ankles to head.",
    "Squeeze the bottom-side waist the entire hold — don't just hang on the joint.",
    "Keep your neck long and gaze forward, not down.",
    "Sagging hips end the set: down means done, not 'hold it lower'.",
    "Match your time on both sides — the weaker side sets the clock."
  ],
  "Bicycle crunch": [
    "Touch fingertips to your temples — never yank your neck.",
    "Rotate your ribcage, not just your elbow — shoulder comes off the floor toward the knee.",
    "The extended leg hovers low without touching the floor.",
    "Slow pedaling beats fast flailing; two seconds per side.",
    "Keep your lower back pressed into the mat throughout.",
    "Exhale as each elbow drives toward the opposite knee."
  ],
  "Dumbbell farmer walk": [
    "Walk tall: ribs stacked over hips, shoulders back and down.",
    "Crush the handles — grip is the first thing that fails, and that's the point.",
    "Take short, quick, controlled steps; no waddling side to side.",
    "Keep the dumbbells dead level; don't let one side sag.",
    "Look ahead, not at the floor.",
    "Time or distance both work — just make the weight honestly heavy."
  ],
  "Barbell incline bench press": [
    "Set the bench between 30 and 45 degrees so you target upper chest, not shoulders.",
    "Plant your feet flat on the floor and drive them down for a stable base.",
    "Pull your shoulder blades back and down into the bench before unracking.",
    "Lower the bar to your upper chest, just below the collarbone.",
    "Keep a slight arch in your lower back without flaring your ribs up.",
    "Inhale on the way down and exhale forcefully as you press up.",
    "Avoid bouncing the bar off your chest to generate momentum.",
    "Keep your wrists stacked directly over your elbows throughout the press.",
    "Use a spotter or safety pins since incline presses are harder to bail out of.",
    "Think about pressing up and slightly back toward your face, not straight up.",
    "Use the warmup set to groove your bar path before adding heavier plates.",
    "Don't let your elbows flare past a 45 to 75 degree angle from your torso."
  ],
  "Dumbbell bench press": [
    "Plant your feet firmly on the floor for a stable base of leverage.",
    "Retract your shoulder blades and keep them pinned to the bench throughout.",
    "Lower the dumbbells until your upper arms are level with the bench, not lower.",
    "Press the dumbbells up and slightly inward without letting them touch.",
    "Keep your wrists straight and stacked over your elbows on every rep.",
    "Exhale as you press up and inhale as you lower the dumbbells.",
    "Avoid letting your elbows flare straight out to the sides.",
    "Squeeze your chest at the top instead of locking out and resting.",
    "Control the descent instead of letting the dumbbells drop quickly.",
    "Keep a slight, natural arch in your lower back, not an exaggerated one.",
    "Get the dumbbells into position with control, not by swinging them up.",
    "Use a spotter or lighter weight near failure since dumbbells can roll inward."
  ],
  "Dumbbell chest fly": [
    "Use lighter dumbbells than you'd press since flys load the shoulder joint differently.",
    "Keep a slight, fixed bend in your elbows throughout the entire movement.",
    "Lower the dumbbells out to the sides until your chest feels a deep stretch.",
    "Stop the descent once your upper arms are roughly level with the bench.",
    "Bring the dumbbells back up in an arc, not a straight press path.",
    "Squeeze your chest together at the top as if hugging a barrel.",
    "Avoid straightening your elbows, which shifts strain onto the joint.",
    "Inhale as you open into the stretch and exhale as you bring it together.",
    "Keep your shoulder blades retracted so the stretch loads your chest, not your shoulders.",
    "Avoid going so heavy that you lose control at the bottom stretch position.",
    "Move slowly and deliberately rather than using momentum to fly the weights up.",
    "Stop immediately if you feel pinching or sharp pain in the front of your shoulder."
  ],
  "Dumbbell incline bench press": [
    "Set the bench to a moderate 30 to 45 degree incline to bias the upper chest.",
    "Drive your feet into the floor and keep your shoulder blades pinned back.",
    "Lower the dumbbells to the sides of your upper chest, not your neck.",
    "Press the dumbbells up and slightly together at the top of each rep.",
    "Keep your wrists neutral and stacked over your elbows throughout the lift.",
    "Exhale as you press the dumbbells up and inhale as you lower them.",
    "Avoid arching excessively, which turns the lift into a flat-bench press.",
    "Control the dumbbells into starting position rather than kicking them up with your knees.",
    "Don't let your elbows drop below shoulder level at the bottom of the rep.",
    "Use the warmup set to find your groove before loading heavier dumbbells.",
    "Keep your head and upper back in contact with the bench the whole set.",
    "Avoid letting the dumbbells drift forward over your face on the press."
  ],
  "Barbell bench press": [
    "Set your grip slightly wider than shoulder width for a balanced bar path.",
    "Pull your shoulder blades back and down before you unrack the bar.",
    "Plant your feet flat on the floor and drive them down throughout the lift.",
    "Lower the bar to your mid-chest, not your neck or stomach.",
    "Keep your wrists stacked over your elbows rather than bent back.",
    "Inhale and brace your core before lowering the bar each rep.",
    "Exhale as you drive the bar up off your chest.",
    "Avoid bouncing the bar off your chest to add momentum.",
    "Keep your elbows tucked around 45 to 75 degrees, not flared to 90.",
    "Use the warmup set to lock in bar path before loading more weight.",
    "Always use a spotter or safety bars when attempting heavy or max sets.",
    "Keep your hips on the bench rather than driving them up to assist the press."
  ],
  "Dumbbell decline bench press": [
    "Secure your legs under the footpads before lowering into the decline position.",
    "Keep your head and shoulders firmly against the bench throughout the set.",
    "Lower the dumbbells to the sides of your lower chest, not your collarbone.",
    "Press up and slightly inward, stopping just short of the dumbbells touching.",
    "Keep your wrists neutral and stacked directly over your elbows.",
    "Exhale as you press up and inhale as you lower with control.",
    "Avoid letting the dumbbells drift toward your face at the top.",
    "Use lighter loads than flat pressing since blood rushes to your head on a decline.",
    "Have a spotter hand you the dumbbells since sitting up to start is awkward.",
    "Don't let your elbows flare past 45 to 75 degrees from your torso.",
    "Keep your core braced so your torso doesn't slide on the angled bench.",
    "Sit up slowly afterward to avoid dizziness from the inverted position."
  ],
  "Cable pec fly": [
    "Set both pulleys to roughly chest height for a straight-on fly path.",
    "Stand with a staggered stance and a slight forward lean for stability.",
    "Keep a soft, fixed bend in your elbows throughout the entire movement.",
    "Bring the handles together in front of your chest, not up near your face.",
    "Squeeze your chest at the center point and pause briefly before releasing.",
    "Exhale as you bring the handles together and inhale as you open back out.",
    "Avoid letting the weight yank your arms back into an overstretched position.",
    "Keep your shoulder blades retracted so your shoulders don't round forward.",
    "Step forward slightly to keep tension on your chest at the start of the rep.",
    "Avoid using your back or torso momentum to swing the handles together.",
    "Control the eccentric instead of letting the cables snap your arms back fast.",
    "Keep your elbows slightly below shoulder height rather than pressing them up high."
  ],
  "Machine chest press": [
    "Adjust the seat so the handles line up with the middle of your chest.",
    "Keep your back and head flat against the pad throughout the press.",
    "Plant your feet flat on the floor for a stable, grounded base.",
    "Press the handles forward without locking your elbows out hard at the top.",
    "Exhale as you press out and inhale as you return with control.",
    "Avoid letting the weight stack slam down between reps.",
    "Use the warmup set to find the right seat height and grip position.",
    "Keep your wrists straight rather than bending them around the handles.",
    "Don't let your shoulders roll forward off the back pad as you press.",
    "Squeeze your chest together at full extension instead of just pushing through.",
    "Avoid arching your back off the pad to grind out extra reps.",
    "Move through a full, controlled range rather than short, partial pulses."
  ],
  "Push-up": [
    "Keep your hands roughly shoulder-width apart with fingers spread for stability.",
    "Keep your body in a straight line from head to heels throughout.",
    "Avoid letting your hips sag or pike up out of plank position.",
    "Lower your chest until it nearly touches the floor for full range.",
    "Keep your elbows at roughly 45 degrees from your torso, not flared wide.",
    "Inhale as you lower down and exhale as you push back up.",
    "Tuck your chin slightly and keep your neck neutral, not craned forward.",
    "Brace your core and squeeze your glutes to keep your spine stable.",
    "Avoid flaring your elbows out to 90 degrees, which can strain your shoulders.",
    "Spread the load through your whole palm, not just your fingertips.",
    "Slow down the descent instead of dropping quickly toward the floor.",
    "Scale to an incline or your knees if you can't maintain full-body alignment."
  ],
  "Dumbbell pullover": [
    "Lie with only your upper back and head on the bench, hips lower.",
    "Hold one dumbbell with both hands, palms pressing against the inside plates.",
    "Keep a slight, fixed bend in your elbows throughout the whole movement.",
    "Lower the dumbbell behind your head until you feel a deep lat and chest stretch.",
    "Avoid lowering past the point where your shoulders start to pinch or strain.",
    "Inhale as you lower behind your head and exhale as you pull it back over.",
    "Keep your core braced so your lower back doesn't arch off the bench.",
    "Use a lighter weight than you'd expect since this is a stretch-focused movement.",
    "Pull the dumbbell back over in an arc, not a straight vertical lift.",
    "Keep your ribcage from flaring up as you reach back into the stretch.",
    "Move slowly and avoid using momentum to whip the dumbbell back to start.",
    "Stop the set if you feel any shoulder joint pain rather than pushing through."
  ],
  "Machine pulldown": [
    "Set the thigh pad snug so your hips stay locked during the warmup set and beyond.",
    "Grip the bar slightly wider than shoulder width with palms facing away from you.",
    "Lean back about 10 to 15 degrees and keep that angle fixed through the rep.",
    "Pull your elbows down and back, driving them toward your hips, not just down.",
    "Drive your chest up and out as the bar approaches your collarbone.",
    "Pause briefly at the bottom and squeeze your lats before letting the bar rise.",
    "Control the eccentric for two to three seconds instead of letting the weight yank you up.",
    "Avoid yanking the bar down with your arms before your shoulder blades engage.",
    "Don't let your shoulders shrug up toward your ears at the top of the stretch.",
    "Exhale as you pull the bar down and inhale as you let it rise.",
    "Think about pulling with your elbows, not gripping harder with your hands.",
    "Avoid swinging your torso backward to muscle the weight down."
  ],
  "Underhand pulldown": [
    "Grip the bar shoulder-width with palms facing you to bias the lower lats and biceps.",
    "Keep your chest tall and shoulders back before initiating the pull.",
    "Pull your elbows straight down toward your waist, brushing close to your torso.",
    "Squeeze your shoulder blades together as the bar reaches your upper chest.",
    "Lower the bar with control, resisting the stretch instead of letting it snap up.",
    "Avoid leaning back excessively to compensate for a weight that's too heavy.",
    "Keep your wrists neutral and avoid curling them to help pull the bar.",
    "Exhale on the pull down and inhale as you return to full stretch.",
    "Let your shoulder blades fully spread apart at the top for a complete stretch.",
    "Don't let your elbows flare out to the sides during the pull.",
    "Focus on driving your elbows past your ribcage rather than just bending your arms.",
    "Keep your feet flat and hips still under the pads throughout the set."
  ],
  "Machine seated cable row": [
    "Sit with knees slightly bent and feet braced firmly on the footplate.",
    "Start each rep with arms fully extended and a slight forward lean at the torso.",
    "Drive your elbows straight back past your ribs while keeping your spine neutral.",
    "Squeeze your shoulder blades together at the end of the pull and hold briefly.",
    "Avoid using momentum by rocking your torso backward to move the weight.",
    "Keep your chest up and avoid rounding your lower back during the stretch.",
    "Control the return phase so the weight doesn't pull your arms forward abruptly.",
    "Exhale as you row in and inhale as you extend back out.",
    "Keep your wrists straight and let your lats and mid-back do the pulling.",
    "Avoid shrugging your traps up; keep your shoulders pulled down and back.",
    "Pull the handle toward your lower ribs, not up toward your chest.",
    "Keep your elbows tucked close rather than flaring them wide on the pull."
  ],
  "Straight arm cable pulldown": [
    "Stand tall with a slight forward hip hinge and a soft bend in your elbows.",
    "Keep your arms straight throughout the movement, only moving from the shoulder joint.",
    "Pull the bar down in an arc toward your thighs, not straight down to the floor.",
    "Squeeze your lats hard at the bottom before letting the bar rise back up.",
    "Avoid bending your elbows more as the weight gets heavier; that shifts work to triceps.",
    "Keep your core braced so your lower back doesn't arch as you pull.",
    "Exhale as the bar travels down and inhale as it returns to the top.",
    "Control the ascent slowly to keep tension on your lats instead of resetting at the top.",
    "Avoid leaning your whole body back to assist the pull; let your lats do the work.",
    "Keep your shoulders down away from your ears throughout the set.",
    "Focus on the mind-muscle connection by visualizing your lats pulling your arms down.",
    "Don't let the cable yank your arms back up too quickly between reps."
  ],
  "Barbell bent over row": [
    "Set up with a firm warmup set to groove your hip hinge before adding weight.",
    "Hinge at the hips with a flat back and your torso roughly 45 degrees to the floor.",
    "Grip the bar just outside shoulder width and keep your arms relaxed at the bottom.",
    "Brace your core hard before each pull to protect your lower spine.",
    "Pull the bar toward your lower ribs or upper abdomen, not your chest.",
    "Drive your elbows back and squeeze your shoulder blades at the top of the row.",
    "Avoid jerking the bar up using lower back momentum; pull with your back muscles.",
    "Keep your neck in a neutral position, looking slightly down rather than craning up.",
    "Lower the bar under control instead of letting it drop freely.",
    "Avoid rounding your upper back, especially as fatigue sets in on later sets.",
    "Exhale forcefully as you row the bar up to your torso.",
    "Keep your knees softly bent and weight in your midfoot for a stable base."
  ],
  "Dumbbell single-arm row": [
    "Brace your free hand on the bench and keep your spine flat, not twisted.",
    "Let the dumbbell hang straight down for a full stretch at the bottom of each rep.",
    "Pull your elbow up and back along your side, brushing close to your ribs.",
    "Avoid rotating your torso to help heave the weight up on tough reps.",
    "Squeeze your shoulder blade toward your spine at the top of the pull.",
    "Keep your working-side hip square to the bench rather than rotating it upward.",
    "Lower the dumbbell slowly to maintain tension instead of dropping it.",
    "Exhale as you row the dumbbell up and inhale as you lower it.",
    "Avoid shrugging your shoulder up toward your ear as you pull.",
    "Keep your neck neutral and avoid turning your head to watch the weight.",
    "Focus on leading with your elbow rather than your hand or wrist.",
    "Switch sides only after matching reps to keep both lats developing evenly."
  ],
  "Chest-supported machine row": [
    "Adjust the chest pad height so it sits firmly against your sternum, not your throat.",
    "Press your chest into the pad throughout the set to stop your torso from moving.",
    "Pull the handles back by driving your elbows behind your torso, not just bending arms.",
    "Squeeze your shoulder blades together fully at the back of each rep.",
    "Let your arms extend completely at the front for a full stretch through your lats.",
    "Avoid yanking the handles with a jerky motion; keep the movement smooth and controlled.",
    "Exhale as you pull the handles back and inhale as you let them return.",
    "Keep your wrists neutral and avoid curling them to assist the pull.",
    "Don't let your shoulders round forward as you reach for the stretched position.",
    "Focus on squeezing your mid-back rather than just moving the handles.",
    "Avoid using your legs or feet to push yourself away from the pad.",
    "Keep your neck relaxed and your gaze forward, not straining upward."
  ],
  "Pull-ups": [
    "Grip the bar just outside shoulder width with your thumbs wrapped around it.",
    "Start from a full dead hang to use the complete range of motion.",
    "Pull your elbows down and back, leading with your chest toward the bar.",
    "Avoid kipping or swinging your legs to generate momentum on strict sets.",
    "Squeeze your shoulder blades together and drive your chest up at the top.",
    "Lower yourself under control instead of dropping quickly to the dead hang.",
    "Engage your core and glutes to stop your legs from swinging during reps.",
    "Exhale as you pull yourself up and inhale as you lower back down.",
    "Avoid shrugging your shoulders up toward your ears at the bottom of the hang.",
    "Think about pulling your body up to the bar rather than pulling the bar down.",
    "Keep your chin clearing the bar without craning your neck forward.",
    "If full reps are too hard, use a band or assisted machine to maintain full range."
  ],
  "Cable face pull": [
    "Set the cable at upper-chest to head height and start with a light warmup set.",
    "Grip the rope with thumbs pointing back and pull toward your face, not your chest.",
    "Flare your elbows high and wide, finishing level with or above your shoulders.",
    "Externally rotate your hands at the end of the pull so knuckles point behind you.",
    "Squeeze your rear delts and upper back hard at the peak of each rep.",
    "Keep your torso upright and avoid leaning back to heave the weight in.",
    "Avoid using heavy weight that forces your elbows to drop low and forward.",
    "Control the return to the start instead of letting the cable snap your arms forward.",
    "Exhale as you pull the rope apart and inhale as you extend back out.",
    "Keep your chest lifted and shoulder blades pulled down throughout the movement.",
    "Avoid shrugging your traps; let your rear delts and rotators drive the motion.",
    "Pause briefly at full contraction to maximize rear-delt engagement."
  ],
  "Dumbbell rear delt fly": [
    "Hinge forward at the hips until your torso is near parallel to the floor.",
    "Keep a soft bend in your elbows and maintain it throughout each rep.",
    "Raise the dumbbells out to the sides in an arc, leading with your elbows.",
    "Stop the raise around shoulder height rather than pulling the weights up high.",
    "Squeeze your shoulder blades together at the top before lowering with control.",
    "Avoid jerking the dumbbells up using momentum from your lower back.",
    "Keep your neck neutral and avoid craning it forward to see the weights.",
    "Use lighter dumbbells than you think you need to isolate the rear delts properly.",
    "Exhale as you raise the dumbbells and inhale as you lower them.",
    "Avoid letting your torso rise up as the weights get heavy or you fatigue.",
    "Keep your wrists relatively straight rather than bending them to swing the weight.",
    "Focus on squeezing your rear delts together rather than just lifting your arms."
  ],
  "Machine reverse fly": [
    "Adjust the seat so the handles align with your shoulders at the start position.",
    "Press your chest against the pad to keep your torso from rocking.",
    "Lead with your elbows as you pull the handles out and back.",
    "Squeeze your shoulder blades together at the end range of each rep.",
    "Avoid using your chest or arms to muscle the handles instead of your rear delts.",
    "Control the return phase so the weight stack doesn't slam down between reps.",
    "Keep a slight bend in your elbows and hold it constant through the set.",
    "Exhale as you pull the handles apart and inhale as you let them return.",
    "Avoid shrugging your shoulders up toward your ears during the movement.",
    "Stop the range of motion roughly level with your shoulders, not behind your back.",
    "Focus on the mind-muscle connection by picturing your rear delts pulling your elbows back.",
    "Keep your feet flat and core braced so your lower back stays still."
  ],
  "Dumbbell seated overhead press": [
    "Sit tall against the backrest and keep your lower back pressed flat, not arched.",
    "Start with the dumbbells at ear height before pressing overhead.",
    "Press the dumbbells up and slightly inward without clanking them together at the top.",
    "Exhale as you press up and inhale as you lower the dumbbells back down.",
    "Lower until your elbows are just below shoulder height, not lower.",
    "Don't lock your elbows out hard at the top to spare your joints.",
    "Use a lighter warmup set first to prime your rotator cuffs and shoulder joints.",
    "Keep your wrists stacked directly over your elbows through the whole rep.",
    "Avoid flaring your elbows too far forward, which shifts load off the delts.",
    "Brace your core to stop your ribcage from flaring up as you press.",
    "Focus on pushing through your palms, feeling the front and side delts drive the weight.",
    "Don't let the dumbbells drift behind your head, which strains the shoulder joint."
  ],
  "Dumbbell lateral raise": [
    "Stand tall with a soft bend in your knees and a slight forward lean.",
    "Raise the dumbbells out to the sides until your arms are roughly parallel to the floor.",
    "Lead with your elbows, not your hands, to keep tension on the side delts.",
    "Use a slight bend in your elbows throughout, never locking them straight.",
    "Avoid swinging the weights up using momentum from your hips or torso.",
    "Lower the dumbbells slowly under control instead of dropping them.",
    "Keep your shoulders down away from your ears, not shrugging as you lift.",
    "Stop the raise at shoulder height; going higher shifts work to your traps.",
    "Exhale as you raise the dumbbells and inhale as you lower them.",
    "Pick a weight light enough that your form stays clean for every rep.",
    "Picture pouring water from a jug to keep your pinkies slightly higher than your thumbs.",
    "Avoid using your traps to shrug the weight up; isolate the shoulder movement."
  ],
  "Dumbbell front raise": [
    "Stand with a neutral spine and your core braced before lifting.",
    "Raise the dumbbells straight out in front of you to about shoulder height.",
    "Keep a slight bend in your elbows throughout the entire range of motion.",
    "Lift one arm at a time or both together, but stay controlled either way.",
    "Avoid using momentum or leaning back to swing the weights upward.",
    "Lower the dumbbells slowly rather than letting gravity drop them.",
    "Keep your wrists neutral and avoid bending them as you raise the weight.",
    "Don't raise past shoulder height, which adds strain without extra delt benefit.",
    "Exhale on the way up and inhale as you lower back down.",
    "Focus on feeling the front of your shoulders do the lifting, not your traps.",
    "Use a palms-down or neutral grip depending on what feels comfortable in your shoulders.",
    "Choose a lighter weight here since front raises have less mechanical leverage."
  ],
  "Barbell overhead press": [
    "Grip the bar just outside shoulder width with your wrists stacked over your elbows.",
    "Start with the bar resting on your front shoulders, elbows slightly in front of the bar.",
    "Brace your core and squeeze your glutes to keep your lower back from arching.",
    "Press the bar straight up while moving your head back slightly to clear it.",
    "Finish with the bar over your head and your biceps near your ears.",
    "Exhale forcefully as you drive the bar overhead.",
    "Don't lean back excessively to press the weight up; keep your torso upright.",
    "Lower the bar back to your shoulders under control, not in free fall.",
    "Use a lighter warmup set to groove the bar path before loading up.",
    "Keep your feet planted shoulder-width apart for a stable base throughout the lift.",
    "Avoid flaring your elbows too wide at the bottom, which stresses the shoulder joint.",
    "Don't push the bar forward in an arc; keep the path as vertical as possible."
  ],
  "Machine overhand overhead press": [
    "Adjust the seat so the handles line up at shoulder height before starting.",
    "Keep your back flat against the pad throughout the entire set.",
    "Press the handles up without locking your elbows out aggressively at the top.",
    "Exhale as you press and inhale as you return the handles to the start.",
    "Lower the handles until your upper arms are roughly parallel to the floor.",
    "Avoid shrugging your shoulders up toward your ears during the press.",
    "Keep your wrists straight and avoid bending them against the handles.",
    "Use a controlled tempo rather than letting the machine's weight stack slam down.",
    "Focus on squeezing your shoulders at the top rather than just moving the handles.",
    "Don't flare your elbows out wider than the handle path allows.",
    "Keep your feet flat on the floor for a stable, balanced base.",
    "Check the handle grip width setting matches a comfortable shoulder position before loading weight."
  ],
  "Cable low single-arm lateral raise": [
    "Stand sideways to the cable stack so the pulley pulls your arm across your body.",
    "Set the pulley near the floor so the cable line of pull starts low.",
    "Raise your arm out to the side until it's roughly parallel to the floor.",
    "Keep a slight bend in your elbow throughout, not a locked-out arm.",
    "Lead with your elbow rather than pulling with your hand or wrist.",
    "Control the cable back down instead of letting the weight yank your arm down.",
    "Avoid twisting your torso to help lift the handle; isolate the shoulder.",
    "Keep tension on the cable through the bottom of the rep instead of resting.",
    "Exhale as you raise your arm and inhale as you lower it back.",
    "Switch sides evenly so each shoulder gets the same constant-tension benefit.",
    "Don't shrug your shoulder up toward your ear as you raise the handle.",
    "Stand far enough from the machine that the cable stays at an angle, not straight down."
  ],
  "Dumbbell Arnold press": [
    "Start seated with the dumbbells in front of your shoulders, palms facing you.",
    "Rotate your palms outward as you press the dumbbells overhead.",
    "Keep your back flat against the bench to avoid excess lumbar arching.",
    "Reverse the rotation smoothly as you lower the dumbbells back to the start.",
    "Exhale as you press and rotate, inhale as you lower and rotate back.",
    "Avoid rushing the rotation; let it happen gradually through the full range.",
    "Keep your core braced so your torso doesn't twist along with your wrists.",
    "Don't let the dumbbells drift behind your head at the top of the press.",
    "Use a lighter weight than a standard press since the rotation adds difficulty.",
    "Keep your elbows tracking slightly in front of your body, not flared out wide.",
    "Focus on feeling all three deltoid heads work through the rotating path.",
    "Lower under control rather than letting the dumbbells drop back to the start position."
  ],
  "Dumbbell shrug": [
    "Stand tall with a dumbbell in each hand at your sides, arms straight.",
    "Lift your shoulders straight up toward your ears without bending your elbows.",
    "Avoid rolling your shoulders forward or backward; keep the motion vertical.",
    "Pause briefly at the top and squeeze your traps before lowering.",
    "Lower the dumbbells slowly instead of letting them drop on the way down.",
    "Keep your neck relaxed and avoid craning it forward to help the lift.",
    "Use a firm grip or straps if your hands give out before your traps do.",
    "Avoid using your legs or hips to bounce the weight upward.",
    "Exhale as you shrug up and inhale as you lower back down.",
    "Keep your arms straight and let your traps do all the work, not your biceps.",
    "Stand with a stable, shoulder-width stance to avoid swaying during heavier sets.",
    "Don't overload the weight to the point your form breaks down into jerky reps."
  ],
  "Barbell shrug": [
    "Grip the bar just outside your hips with a stable, even grip.",
    "Stand tall with your chest up and shoulders back before you start the lift.",
    "Shrug your shoulders straight up toward your ears, keeping your elbows straight.",
    "Avoid rolling your shoulders in circles; stick to a strict up-and-down path.",
    "Pause and squeeze at the top of the shrug for a full trap contraction.",
    "Lower the bar under control rather than dropping it quickly.",
    "Use chalk or straps if your grip fails before your traps fatigue.",
    "Keep the bar close to your body throughout the entire movement.",
    "Avoid using your knees or hips to heave the bar upward.",
    "Exhale as you shrug up and inhale as you return to the start.",
    "Keep your neck neutral and avoid tilting your head to assist the lift.",
    "Don't overarch your lower back trying to shrug heavier loads than you can control."
  ],
  "Cable bar pushdown": [
    "Pin your elbows to your sides and keep them locked there the entire set.",
    "Use a light warmup set to groove the elbow position before loading the bar.",
    "Lean slightly forward from the hips, not the shoulders, to keep tension on triceps.",
    "Push the bar down until your arms are fully straight without locking out violently.",
    "Let the bar rise only until your forearms reach about parallel to the floor.",
    "Exhale as you press down, inhale as you control the bar back up.",
    "Avoid using your body weight or a torso lean to muscle the weight down.",
    "Squeeze and pause briefly at full elbow extension to maximize triceps contraction.",
    "Keep your wrists firm and straight instead of letting them flex on the bar.",
    "Resist the urge to let the bar snap back up; control the eccentric phase.",
    "Set the cable pulley at the top so the starting angle stresses your elbows minimally.",
    "Stand close to the cable stack so the cable path stays vertical, not angled."
  ],
  "Cable rope pushdown": [
    "Split the rope ends apart at the bottom to fully contract each triceps head.",
    "Keep your upper arms glued to your ribcage throughout the movement.",
    "Extend until your elbows are straight, then squeeze before reversing the motion.",
    "Avoid flaring your elbows outward as you push the rope down.",
    "Control the rope back up slowly instead of letting the weight pull your arms.",
    "Breathe out on the push, in as you let your forearms rise back up.",
    "Keep a slight forward torso lean instead of standing bolt upright.",
    "Don't shrug your shoulders up toward your ears as you push down.",
    "Rotate your wrists slightly outward at the bottom to emphasize the lateral head.",
    "Stand with a staggered stance for stability rather than locking your knees.",
    "Keep your core braced so your lower back doesn't arch during the push.",
    "Stop the rope just above thigh height instead of slamming into your legs."
  ],
  "Dumbbell curl": [
    "Start with a light warmup set to prep your elbows before adding weight.",
    "Keep your elbows tucked at your sides instead of drifting them forward.",
    "Curl the dumbbell up without swinging your torso or hips for momentum.",
    "Lower the weight all the way down until your arms are fully straight.",
    "Exhale as you curl up, inhale as you lower the dumbbell back down.",
    "Squeeze your biceps hard at the top instead of just lifting and dropping.",
    "Avoid letting your shoulders roll forward as the weight gets heavier.",
    "Control the descent for two to three seconds instead of dropping the weight fast.",
    "Keep your wrists straight rather than curling them inward at the top.",
    "Alternate arms or curl together, but keep elbows stationary either way.",
    "Stand with a slight knee bend instead of locking your legs straight.",
    "Avoid hyperextending your elbows at the bottom of each rep."
  ],
  "Dumbbell hammer curl": [
    "Keep your palms facing each other throughout the entire curl.",
    "Pin your elbows to your sides instead of letting them swing outward.",
    "Curl with a controlled tempo rather than jerking the dumbbells upward.",
    "Lower the dumbbells fully to feel a stretch in your forearms and biceps.",
    "Avoid rotating your wrists toward a regular curl grip during the lift.",
    "Squeeze your forearm and brachialis muscles at the top of each rep.",
    "Exhale on the lift, inhale as you lower the dumbbells with control.",
    "Keep your torso upright instead of leaning back to assist the curl.",
    "Move each arm independently or together, but avoid uneven shoulder shrugging.",
    "Avoid letting momentum carry the weight past your natural range of motion.",
    "Keep your shoulders pulled back and down, not rounded forward.",
    "Stop the descent just short of locking out hard on your elbows."
  ],
  "Dumbbell skull crusher": [
    "Use a light warmup set to find a safe, comfortable elbow path first.",
    "Keep your upper arms pointed straight up and perfectly still throughout the set.",
    "Lower the dumbbells toward your forehead or just behind your head, not your chest.",
    "Bend only at the elbow; don't let your shoulders move during the rep.",
    "Inhale as you lower the weight, exhale forcefully as you extend your arms.",
    "Avoid flaring your elbows outward as the dumbbells descend.",
    "Use a slow, controlled lowering phase to protect your elbow joints.",
    "Keep a firm grip and tight wrists so the dumbbells don't tilt unexpectedly.",
    "Stop the descent if you feel any elbow joint pinching or strain.",
    "Squeeze your triceps fully at the top without slamming your elbows straight.",
    "Keep your feet flat and core braced to stabilize your body on the bench.",
    "Choose a lighter load than you'd guess, since this exercise stresses the elbows."
  ],
  "Dumbbell single-arm overhead tricep extension": [
    "Keep your upper arm close to your head and pointed straight up.",
    "Lower the dumbbell behind your head until you feel a deep triceps stretch.",
    "Use your free hand to support your working elbow for added stability.",
    "Extend your arm fully overhead without locking out aggressively at the top.",
    "Avoid letting your elbow drift outward away from your head during the rep.",
    "Exhale as you press up, inhale as you lower the dumbbell behind your head.",
    "Keep your core tight and ribs down to avoid arching your lower back.",
    "Move slowly on the way down to keep constant tension on the triceps.",
    "Avoid twisting your torso to help lift the weight on heavier reps.",
    "Keep your wrist straight and firm instead of letting it bend backward.",
    "Sit or stand tall instead of leaning to one side during the extension.",
    "Switch arms only after completing full controlled reps on the working side."
  ],
  "Cable bar curl": [
    "Stand far enough from the machine to keep constant cable tension throughout.",
    "Keep your elbows fixed at your sides instead of drifting forward as you curl.",
    "Curl the bar up using only your forearms, not your shoulders or back.",
    "Lower the bar under control until your arms are nearly fully extended.",
    "Squeeze your biceps at the top instead of just reaching the top position.",
    "Avoid leaning back to use momentum when the weight feels heavy.",
    "Exhale as you curl up, inhale as you let the cable pull your arms down.",
    "Keep your wrists neutral rather than bending them to assist the curl.",
    "Stand with a slight forward lean rather than locking your knees out straight.",
    "Avoid letting the cable yank your arms down too quickly between reps.",
    "Keep your shoulders pulled back and chest up throughout the set.",
    "Use a full range of motion instead of doing short, partial curls."
  ],
  "Barbell curl": [
    "Keep your elbows pinned to your sides throughout the entire curl.",
    "Avoid swinging your hips or leaning back to heave the bar up.",
    "Lower the bar fully until your arms are straight before the next rep.",
    "Squeeze your biceps hard at the top instead of bouncing into the next rep.",
    "Exhale as you curl the bar up, inhale as you lower it back down.",
    "Keep your wrists straight rather than curling them up toward your forearms.",
    "Use a grip width that keeps your wrists and elbows comfortable, not strained.",
    "Avoid letting your elbows drift forward as the weight gets challenging.",
    "Keep your shoulders back and chest up instead of rounding forward.",
    "Stand with knees slightly soft instead of locking them out completely.",
    "Control the eccentric phase instead of letting the bar drop quickly.",
    "Keep your head neutral instead of jutting your chin forward to curl."
  ],
  "EZ bar preacher curl": [
    "Rest the back of your upper arms fully on the pad before starting.",
    "Avoid lifting your elbows off the pad as you curl the weight up.",
    "Lower the bar until your arms are nearly straight for a full stretch.",
    "Avoid locking your elbows out hard at the bottom of each rep.",
    "Squeeze your biceps at the top instead of rushing into the next rep.",
    "Exhale as you curl up, inhale as you lower the bar back down.",
    "Keep your wrists firm and straight rather than letting them bend backward.",
    "Use a slower tempo since the preacher position removes momentum assistance.",
    "Keep your chest against the pad instead of leaning back during heavy reps.",
    "Avoid using your shoulders to heave the weight when your biceps fatigue.",
    "Choose a lighter load than standing curls since leverage is less forgiving here.",
    "Keep your feet flat on the floor for a stable base throughout the set."
  ],
  "Cable rope hammer curl": [
    "Keep your palms facing each other on the rope throughout the curl.",
    "Pin your elbows to your sides instead of letting them swing forward.",
    "Curl the rope up using only your forearms, not your shoulders.",
    "Lower the rope under control until your arms are nearly fully extended.",
    "Squeeze your forearms and biceps at the top of every rep.",
    "Avoid leaning back to use momentum when the weight feels heavy.",
    "Exhale as you curl up, inhale as you let the cable lower your arms.",
    "Keep your wrists neutral instead of rotating them during the curl.",
    "Stand with a stable, slightly staggered stance rather than locking your knees.",
    "Avoid letting the cable yank your arms down too fast between reps.",
    "Keep your shoulders back and chest up throughout the movement.",
    "Use a full range of motion instead of short, partial pulls."
  ],
  "Barbell close-grip bench press": [
    "Grip the bar slightly narrower than shoulder width to target your triceps.",
    "Keep your elbows tucked close to your torso as you lower the bar.",
    "Lower the bar to your lower chest instead of flaring it to your upper chest.",
    "Avoid gripping too narrow, which can strain your wrists and elbows.",
    "Inhale as you lower the bar, exhale forcefully as you press it up.",
    "Keep your shoulder blades pulled back and pinned to the bench.",
    "Avoid bouncing the bar off your chest to generate momentum.",
    "Keep your feet flat on the floor to drive stability through your press.",
    "Press the bar in a straight line back toward the rack position.",
    "Use a spotter or safety bars when pushing close to your max weight.",
    "Keep your wrists stacked directly above your elbows, not bent backward.",
    "Squeeze the bar hard and engage your triceps at full lockout."
  ],
  "Dumbbell tricep kickback": [
    "Hinge at your hips and keep your back flat, not rounded, throughout.",
    "Keep your upper arm parallel to the floor and pinned to your side.",
    "Extend only at the elbow; avoid swinging your upper arm to lift the weight.",
    "Squeeze your triceps hard at full extension before lowering back down.",
    "Avoid using momentum or a hip thrust to swing the dumbbell upward.",
    "Exhale as you extend your arm back, inhale as you bend it back in.",
    "Keep your neck neutral instead of craning it to look at the weight.",
    "Support yourself with your free hand on a bench for added stability.",
    "Use a lighter weight than you'd expect, since leverage here is unforgiving.",
    "Keep your elbow bent at roughly a right angle at the start of each rep.",
    "Avoid letting your shoulder rise or rotate as you kick the weight back.",
    "Control the lowering phase instead of letting your forearm drop quickly."
  ],
  "Parallel bar dips": [
    "Keep your elbows tracking straight back instead of flaring out to the sides.",
    "Lower your body until your upper arms are about parallel to the floor.",
    "Keep your torso upright to emphasize triceps over chest involvement.",
    "Avoid shrugging your shoulders up toward your ears as you descend.",
    "Inhale as you lower yourself, exhale as you press back up.",
    "Stop your descent if you feel any pinching in your shoulder joints.",
    "Keep your core tight so your hips don't sag away from the bench.",
    "Press through your palms evenly instead of leaning to one side.",
    "Add weight or bend your knees more once bodyweight reps feel too easy.",
    "Avoid locking your elbows out aggressively at the top of each rep.",
    "Keep your wrists positioned directly under your shoulders, not flared outward.",
    "Move with control instead of bouncing quickly at the bottom of the dip."
  ],
  "Cable rope overhead tricep extension": [
    "Face away from the cable machine with the pulley set near the floor.",
    "Keep your upper arms close to your head and steady throughout the set.",
    "Extend your forearms forward and up until your arms are fully straight.",
    "Avoid letting your elbows flare outward as you extend against the cable.",
    "Lean your torso forward slightly to keep tension off your lower back.",
    "Exhale as you extend your arms, inhale as you let them bend back.",
    "Keep your core braced so your back doesn't arch under the cable pull.",
    "Squeeze your triceps fully at extension instead of stopping short.",
    "Use a rope attachment and split the ends for added triceps contraction.",
    "Avoid jerking the cable to start the rep; initiate the move smoothly.",
    "Keep your wrists firm and straight rather than letting them bend back.",
    "Control the stretch position instead of letting the cable yank your arms back."
  ],
  "Machine hack squat": [
    "Set your shoulders snug under the pads and your back flat against the support.",
    "Place feet shoulder-width on the platform, mid-foot under the load path.",
    "Lower until your thighs are just past parallel without your heels lifting.",
    "Drive through your whole foot, favoring your heels over your toes.",
    "Inhale on the way down, brace your core, exhale as you push up.",
    "Keep your knees tracking in line with your toes, not caving inward.",
    "Avoid locking your knees out hard at the top of each rep.",
    "Use a lighter warmup set to groove depth before adding plates.",
    "Don't let your lower back round away from the pad at the bottom.",
    "Focus on feeling your quads stretch and contract through the full range.",
    "Control the descent for two to three seconds instead of dropping fast.",
    "Keep the safety catches engaged until you're set and ready to lift."
  ],
  "Machine hamstring curl": [
    "Adjust the ankle pad to sit just above your heels, not your calves.",
    "Keep your hips pressed flat into the bench throughout the movement.",
    "Curl your heels toward your glutes through a full, slow range of motion.",
    "Avoid yanking the weight up using momentum from your lower back.",
    "Squeeze and pause briefly at peak contraction before lowering.",
    "Exhale as you curl up, inhale as you lower the pad back down.",
    "Don't let your hips pop up off the pad as the weight gets heavy.",
    "Use a light warmup set to wake up the hamstrings before loading up.",
    "Point your toes slightly to bias the hamstrings over the calves.",
    "Lower the pad under control instead of letting it snap back.",
    "Keep your grip on the handles light, not yanking your upper body around.",
    "Focus on feeling the stretch in your hamstrings at full extension."
  ],
  "Dumbbell forward lunge": [
    "Keep your torso upright and your core braced through each step.",
    "Step far enough forward that your front shin stays roughly vertical.",
    "Lower until your back knee lightly grazes the floor, not slams it.",
    "Keep your front knee tracking over your foot, not drifting inward.",
    "Inhale as you lower, exhale as you drive back up.",
    "Avoid letting your front heel lift off the ground during the descent.",
    "Push through your front heel to stand back up, not your toes.",
    "Keep the dumbbells close to your sides instead of swinging them.",
    "Don't let your back round forward as you lean into the lunge.",
    "Focus on feeling your front-leg quad and glute do the work.",
    "Take shorter, controlled steps if walking to avoid losing balance.",
    "Keep your head and chest up rather than staring down at your feet."
  ],
  "Machine hip adduction": [
    "Sit fully back in the seat with your spine against the pad.",
    "Set the pads against your inner thighs just above the knee.",
    "Squeeze your legs together slowly rather than slamming the pads shut.",
    "Avoid using your hands on your knees to assist the movement.",
    "Exhale as you bring your legs together, inhale as you release.",
    "Pause briefly at full inner-thigh contraction before opening back up.",
    "Don't let the weight yank your legs open too fast on the return.",
    "Use a light warmup set to test the range before loading heavier.",
    "Keep your back flat against the pad, not arching forward.",
    "Focus on feeling the squeeze in your inner thighs, not your hips.",
    "Set the starting width so you feel a stretch without straining.",
    "Keep movements smooth and controlled in both directions."
  ],
  "Machine hip abduction": [
    "Sit back fully with your hips square and spine against the pad.",
    "Position the pads on the outside of your knees, not your shins.",
    "Push your legs apart slowly, leading with your outer hips.",
    "Avoid jerking the weight open using your lower back for momentum.",
    "Exhale as you push outward, inhale as you bring legs back in.",
    "Pause at the widest point to feel your glute medius engage.",
    "Don't let the pads slam back together under uncontrolled weight.",
    "Use a light warmup set to find a comfortable starting range.",
    "Keep your shoulders relaxed and avoid gripping the handles too hard.",
    "Focus on feeling the outer hip and glute work, not your quads.",
    "Avoid rounding your lower back away from the pad mid-rep.",
    "Keep the tempo even rather than bouncing in and out."
  ],
  "Machine leg press": [
    "Place your feet shoulder-width on the platform, flat from heel to toe.",
    "Keep your lower back pressed into the seat throughout every rep.",
    "Lower the platform until your knees reach about ninety degrees.",
    "Avoid letting your knees cave inward as you press the weight up.",
    "Inhale as the platform lowers, exhale as you press it away.",
    "Don't lock your knees out completely or bounce them at the top.",
    "Use the warmup set to confirm seat position before going heavy.",
    "Keep your hips glued to the seat, not rounding off it at depth.",
    "Avoid letting your heels lift off the platform during the press.",
    "Focus on driving through your whole foot, not just your toes.",
    "Control the negative instead of letting the platform drop quickly.",
    "Keep your head and shoulders relaxed against the backrest."
  ],
  "Machine horizontal leg press calf raise": [
    "Place only the balls of your feet on the lower edge of the platform.",
    "Keep your knees softly locked and stationary throughout the set.",
    "Lower your heels as far as the platform allows for a full stretch.",
    "Press through your forefoot to extend your ankles fully at the top.",
    "Pause briefly at full plantarflexion before lowering back down.",
    "Exhale as you press up, inhale as you lower your heels.",
    "Avoid bending your knees to help drive the weight up.",
    "Use the warmup set to find a safe foot position on the plate.",
    "Don't bounce out of the bottom stretch; control it instead.",
    "Keep the range of motion full rather than using short pulses.",
    "Focus on feeling the stretch and squeeze in your calves, not your quads.",
    "Keep your feet from sliding by checking your footing each rep."
  ],
  "Machine leg extension": [
    "Align the machine's pivot point with your knee joint before starting.",
    "Set the ankle pad just above your feet, resting on your shins.",
    "Extend your legs until they're straight without snapping your knees locked.",
    "Avoid using momentum or swinging your torso to help lift the weight.",
    "Exhale as you extend, inhale as you lower back down.",
    "Pause briefly at full extension to maximize quad contraction.",
    "Lower the weight slowly instead of letting it drop fast.",
    "Use a light warmup set to gauge knee comfort before adding load.",
    "Keep your back flat against the pad, not arching off it.",
    "Focus on squeezing your quads hard at the top of each rep.",
    "Grip the side handles lightly instead of yanking on them.",
    "Stop short of full lockout if you feel any knee discomfort."
  ],
  "Barbell squat": [
    "Set the bar across your traps, not resting on your neck bones.",
    "Brace your core and take a deep breath before unracking the bar.",
    "Keep your chest up and spine neutral throughout the descent.",
    "Sit your hips back and down until thighs are at least parallel.",
    "Keep your knees tracking over your toes, not collapsing inward.",
    "Drive through your whole foot, not just your toes, to stand up.",
    "Avoid letting your lower back round at the bottom of the squat.",
    "Use a light warmup set to dial in bar position and depth.",
    "Exhale forcefully past the hardest part of the rep, not at the bottom.",
    "Keep the bar path vertical over your mid-foot the entire rep.",
    "Don't let your heels rise off the floor as you descend.",
    "Use safety pins or a spotter when attempting heavier loads."
  ],
  "Bulgarian split squat": [
    "Rest the top of your rear foot on the bench, laces down.",
    "Keep most of your weight on your front heel, not the back leg.",
    "Lower straight down until your front thigh is roughly parallel to the floor.",
    "Keep your torso upright with a slight forward lean from the hips.",
    "Avoid letting your front knee drift past your toes excessively.",
    "Inhale as you lower, exhale as you drive back up.",
    "Don't push off your rear foot to assist the lift.",
    "Keep the dumbbells at your sides rather than swinging for momentum.",
    "Focus on feeling your front glute and quad doing the work.",
    "Set your front foot far enough forward to keep your shin vertical.",
    "Avoid letting your hips rotate or tilt sideways mid-rep.",
    "Use a wall or bench for balance until your stability improves."
  ],
  "Machine seated leg curl": [
    "Align the machine's pivot with your knee joint before adjusting pads.",
    "Set the thigh pad snug to keep your hips from rising during curls.",
    "Curl your heels down and back through a full range of motion.",
    "Avoid jerking the weight using your hips or upper body.",
    "Exhale as you curl down, inhale as you return to the start.",
    "Pause briefly at peak contraction to maximize hamstring engagement.",
    "Lower the weight slowly instead of letting it snap back up.",
    "Use a light warmup set to find a comfortable pad position.",
    "Keep your back flat against the seat, not arching forward.",
    "Point your toes slightly to emphasize the hamstrings over the calves.",
    "Focus on feeling the stretch at the top of each rep.",
    "Keep your grip on the handles relaxed, not white-knuckled."
  ],
  "Barbell Romanian deadlift": [
    "Keep the bar close to your shins and thighs throughout the lift.",
    "Hinge at your hips, pushing them back as your torso tilts forward.",
    "Keep a soft bend in your knees rather than locking them straight.",
    "Maintain a flat, neutral spine from setup through lockout.",
    "Lower the bar only until you feel a deep hamstring stretch.",
    "Avoid rounding your lower back to chase a lower bar position.",
    "Inhale and brace before the descent, exhale as you stand tall.",
    "Drive your hips forward to finish, not your lower back.",
    "Keep your shoulders back and chest proud throughout the movement.",
    "Avoid yanking the bar off the floor; start the pull smoothly.",
    "Focus on feeling tension build in your hamstrings, not your low back.",
    "Use a double-overhand or mixed grip and chalk if grip starts slipping."
  ],
  "Machine seated calf raises": [
    "Set the knee pad snugly against your thighs before starting.",
    "Place the balls of your feet on the platform, heels hanging free.",
    "Lower your heels as far as possible for a deep calf stretch.",
    "Press through your forefeet to rise onto your toes fully.",
    "Pause briefly at the top to squeeze your calves hard.",
    "Exhale as you raise, inhale as you lower back down.",
    "Avoid bouncing out of the bottom stretch position.",
    "Control the descent slowly instead of letting the pad drop.",
    "Keep your knees still and bent at the same angle throughout.",
    "Focus on feeling the stretch and contraction in your calves only.",
    "Don't let your feet roll inward or outward during the rep.",
    "Use a full range of motion rather than short, partial pulses."
  ],
  "Machine plate-loaded calf raise": [
    "Set your shoulders under the pads with a slight knee bend, not locked.",
    "Place the balls of your feet on the platform, heels hanging off the edge.",
    "Lower your heels as deep as possible to feel a full calf stretch.",
    "Press up through your forefoot until you're fully on your toes.",
    "Pause at the top and squeeze your calves before lowering.",
    "Exhale as you rise, inhale as you lower your heels down.",
    "Avoid bouncing at the bottom; control the stretch instead.",
    "Use the warmup set to check footing and balance before loading heavy.",
    "Keep your torso upright rather than leaning into the shoulder pads.",
    "Don't let your knees bend and unbend to help drive the weight.",
    "Focus on feeling the burn in your calves, not your shins.",
    "Keep your feet from sliding outward by checking placement each set."
  ],
  "Machine crunch": [
    "Set the seat height so the chest pad lines up with your upper chest, not your neck.",
    "Start with a light warmup set to find your range before loading the stack.",
    "Curl your spine forward by contracting your abs, not by yanking with your arms.",
    "Exhale fully as you crunch down to deepen the abdominal contraction.",
    "Keep your feet flat and anchored so your hips stay still through the movement.",
    "Pause briefly at full contraction and squeeze your abs instead of bouncing.",
    "Control the return to the start position instead of letting the weight snap back.",
    "Avoid yanking the handles with your shoulders to fake extra range of motion.",
    "Keep your neck relaxed and let your abs do the pulling, not your chin.",
    "Use a moderate weight that lets you feel your abs working through the full set.",
    "Don't lock your elbows rigidly; let your arms transmit force, not generate it.",
    "Focus on rounding your lower back into the pad to fully engage your core."
  ],
  "Hanging leg raise": [
    "Press your forearms firmly into the pads and keep your back flat against the support.",
    "Brace your core before lifting so your lower back doesn't arch off the pad.",
    "Raise your knees or legs by curling your pelvis up, not just swinging your hips.",
    "Exhale as you lift your legs and inhale as you lower them with control.",
    "Lower your legs slowly instead of letting gravity drop them at the bottom.",
    "Avoid using momentum or swinging to throw your legs upward.",
    "Stop the descent before your lower back arches away from the pad.",
    "Keep your shoulders pressed down and avoid shrugging into your ears.",
    "Raise your knees toward your chest to target your lower abs more directly.",
    "Squeeze your abs hard at the top instead of just reaching a height goal.",
    "Keep your grip relaxed on the handles so your abs do the work, not your arms.",
    "Straighten your legs for a harder variation only once form stays controlled."
  ],
  "Decline sit-ups": [
    "Hook your feet securely under the pads before lowering into the decline bench.",
    "Cross your arms over your chest or behind your head, not pulling on your neck.",
    "Curl your chin slightly toward your chest to avoid straining your neck.",
    "Exhale as you rise up and inhale as you lower back down.",
    "Lower yourself with control instead of dropping fast to the bottom of the bench.",
    "Avoid yanking your head and neck to generate momentum upward.",
    "Engage your abs first before your hip flexors take over the movement.",
    "Don't fully relax your spine at the bottom; keep light tension in your core.",
    "Start at a shallow decline angle until your core strength supports a steeper one.",
    "Keep your lower back from rounding excessively past your natural curve at the top.",
    "Squeeze your abs at the top rather than rushing straight back down.",
    "Avoid arching your lower back hard against the bench at the bottom of the rep."
  ],
  "Laying leg raises": [
    "Use a firm overhand or hanging grip and let your shoulders fully engage before lifting.",
    "Brace your abs before raising your legs to avoid swinging on the bar.",
    "Lift your legs by tilting your pelvis up, not just by flexing your hips.",
    "Exhale as you raise your legs and inhale as you lower them slowly.",
    "Lower your legs under control instead of letting them drop and swing.",
    "Avoid using momentum from your shoulders to swing your legs upward.",
    "Stop your legs before your lower back arches forward excessively.",
    "Keep a slight bend in your knees if straight-leg raises strain your lower back.",
    "Squeeze your lower abs at the top instead of just touching the bar height.",
    "Keep your shoulder blades engaged and avoid hanging passively from the joints.",
    "Avoid rocking your torso to build swinging momentum for the next rep.",
    "Build up from bent-knee raises before progressing to straight-leg hanging raises."
  ],
  "Forearm plank": [
    "Stack your shoulders directly over your elbows for stable forearm positioning.",
    "Brace your core like you're about to be punched in the stomach.",
    "Squeeze your glutes to keep your hips from sagging toward the floor.",
    "Keep your body in one straight line from head to heels.",
    "Breathe steadily and evenly instead of holding your breath during the hold.",
    "Avoid letting your hips pike up into an inverted-V position.",
    "Avoid letting your lower back sag, which strains your spine over time.",
    "Keep your neck neutral by looking at the floor, not straight ahead.",
    "Press your forearms into the floor to keep your upper back engaged.",
    "Quit the hold once your form breaks rather than fighting through a sagging plank.",
    "Keep your feet hip-width apart for a stable, balanced base.",
    "Focus on quality time under tension rather than chasing a longer hold time."
  ],
  "Cable rope kneeling crunch": [
    "Kneel far enough from the pulley that the cable stays taut throughout the rep.",
    "Hold the rope by your temples or ears, not gripping it with your hands.",
    "Hinge from your hips so your hips stay still and your spine does the curling.",
    "Round your spine downward by contracting your abs, not by pulling with your arms.",
    "Exhale forcefully as you crunch down toward your knees.",
    "Keep your hips locked in place instead of sitting back onto your heels.",
    "Avoid yanking the rope with your shoulders to muscle the weight down.",
    "Return to the start slowly instead of letting the cable snap you back up.",
    "Keep slight tension on your abs at the top instead of fully relaxing.",
    "Focus on curling your ribcage toward your pelvis for a deeper contraction.",
    "Choose a weight that lets you feel the crunch in your abs, not your arms.",
    "Keep your neck relaxed and avoid pulling your head down with your hands."
  ],
  "Barbell hip thrust": [
    "Set the bench so your shoulder blades rest at mid-bench height when you slide under.",
    "Plant your feet hip-width apart with toes slightly out and knees tracking over your toes.",
    "Drive through your heels and squeeze your glutes to raise your hips to parallel.",
    "Pause and hold the contraction at the top for one count before lowering.",
    "Keep your chin tucked to avoid overextending your lower back at the top.",
    "Brace your core throughout so your ribs don't flare as you extend your hips."
  ],
  "Barbell skull crusher": [
    "Grip the bar just inside shoulder width and point your elbows straight up at the ceiling.",
    "Keep your upper arms vertical and completely stationary — only your forearms move.",
    "Lower the bar toward your forehead or just behind your head for a full stretch.",
    "Press back up by extending at the elbow only, without flaring or swinging your arms.",
    "Control the descent slowly — the bar is close to your face and momentum is dangerous.",
    "Use a spotter or slightly lighter weight when going close to failure for safety."
  ],
  "Dead hang": [
    "Grip the bar slightly wider than shoulder width with palms facing away from you.",
    "Let your body hang fully and allow your spine to decompress and lengthen naturally.",
    "Breathe steadily and let your shoulders rise above your ears — don't fight it.",
    "Keep your feet off the ground and avoid swinging or using momentum to hold on.",
    "Build hang duration gradually — try adding 10 seconds at a time across sessions.",
    "Use this to improve grip strength and shoulder mobility; it pairs well between heavy sets."
  ],
  "Diamond push-ups": [
    "Place your index fingers and thumbs together in a diamond shape directly under your sternum.",
    "Keep your elbows tracking backward and close to your sides — not flaring outward.",
    "Maintain a rigid plank line from head to heels by bracing your core and glutes.",
    "Lower your chest toward the diamond without letting your hips sag toward the floor.",
    "Press through the diamond and fully extend your arms at the top of each rep.",
    "If too hard, elevate your hands on a bench; if too easy, elevate your feet instead."
  ],
  "Dumbbell Romanian deadlift": [
    "Hold the dumbbells in front of your thighs with a neutral grip, palms facing your body.",
    "Hinge at the hips by pushing them backward — don't simply bend your knees.",
    "Lower the dumbbells along your legs as close to your shins as possible throughout.",
    "Stop when your hamstrings reach their limit and before your lower back begins to round.",
    "Squeeze your glutes and drive your hips forward to return to standing.",
    "Keep a slight, soft bend in your knees throughout — this is a hip hinge, not a squat."
  ],
  "Dumbbell hip thrust": [
    "Rest your upper back across a bench with knees bent and feet flat on the floor.",
    "Place the dumbbells across your hips and hold them firmly in place with both hands.",
    "Drive through your heels and squeeze your glutes to raise your hips to parallel.",
    "Pause and hold the contraction at the top for one count before lowering with control.",
    "Keep your chin tucked so your gaze stays forward, not at the ceiling above you.",
    "Avoid arching your lower back — stop at the point your torso forms a straight line."
  ],
  "Dumbbell wrist extension": [
    "Rest your forearms on your thighs or a bench with your palms facing downward.",
    "Let the dumbbells roll slightly toward your fingertips for a full starting stretch.",
    "Curl your wrists upward slowly, contracting the extensors along the top of your forearm.",
    "Lower back to the start with control on every rep — don't just let the weight drop.",
    "Use light weight; the forearm extensors fatigue quickly and are prone to strain.",
    "Keep your forearms flat on the support and avoid lifting your elbows during the movement."
  ],
  "Dumbbell wrist curl": [
    "Rest your forearms on your thighs or a bench with palms facing upward.",
    "Let the dumbbells roll down toward your fingertips for a full range of motion on each rep.",
    "Curl your wrists upward by contracting your forearm flexors.",
    "Squeeze hard at the top then lower slowly back to the fully stretched position.",
    "Use a light weight and higher reps — this is an isolation movement for small muscles.",
    "Keep your elbows and forearms still against the surface — only your wrists should move."
  ],
  "Glute bridge": [
    "Lie flat with your knees bent, feet flat on the floor hip-width apart.",
    "Press your arms into the floor at your sides to help stabilize the movement.",
    "Drive through your heels and squeeze your glutes to lift your hips off the floor.",
    "Hold the top position for one to two counts and contract your glutes as hard as you can.",
    "Lower your hips until they are just above the floor before the next rep — don't fully rest.",
    "Push your knees slightly outward to keep them tracking directly over your feet."
  ],
  "Dumbbell laying rear delt fly": [
    "Set the bench to a 30-45 degree incline and lie face-down with your chest against the pad.",
    "Let the dumbbells hang straight down below your shoulders with a neutral grip.",
    "Raise your arms out to the sides in a wide arc until they are level with your shoulders.",
    "Focus on squeezing your rear deltoids — avoid shrugging your traps to help lift the weight.",
    "Lower the dumbbells back down slowly under control to maintain tension throughout.",
    "Keep a slight bend in your elbows throughout to reduce stress on the elbow joint."
  ],
  "Machine pec fly": [
    "Adjust the seat height so the handles align with the middle of your chest when seated.",
    "Set the arms to a position that provides a full chest stretch without pain in your shoulder.",
    "Keep your back pressed firmly against the pad throughout every rep.",
    "Bring the pads together in a wide arc and squeeze your chest at the center.",
    "Resist the weight on the way back — don't let the pads swing open uncontrolled.",
    "Stop just before the pads touch at the center to maintain constant tension on your chest."
  ],
  "Machine hip thrust": [
    "Adjust the seat and shoulder pad so your hips can fully extend at the top of the movement.",
    "Position both feet flat on the footplate, hip-width apart with toes slightly out.",
    "Drive through your heels and squeeze your glutes hard to push your hips forward.",
    "Pause for a full count at the top of each rep before controlling the weight back down.",
    "Avoid rolling your lower back — the movement should come from your hips only.",
    "Keep your core braced throughout to prevent your lower back from hyperextending at the top."
  ],
  "Mountain climber": [
    "Start in a push-up plank with hands under your shoulders and your body in a straight line.",
    "Brace your core hard before you begin and maintain that brace throughout the movement.",
    "Drive one knee toward your chest while keeping your hips level — don't let them rise.",
    "Alternate legs in a controlled running motion rather than just rushing through reps.",
    "Keep your hips from bouncing up and down — stay low and maintain the plank position.",
    "Breathe rhythmically and avoid holding your breath as the pace and intensity increase."
  ],
  "Bodyweight pike press": [
    "Start in a downward-dog position with your hips raised high and body forming an inverted V.",
    "Walk your hands closer to your feet to increase the shoulder angle and challenge.",
    "Lower your head toward the floor between your hands by bending your elbows.",
    "Keep your elbows angling slightly inward — don't flare them wide to the sides.",
    "Press back up until your arms are fully extended to return to the inverted-V start position.",
    "Keep your legs as straight as possible throughout to preserve the pike angle."
  ],
  "Bodyweight Russian twist": [
    "Sit with your knees bent and lean your torso back to roughly 45 degrees.",
    "Lift your feet slightly off the floor to increase core engagement and difficulty.",
    "Rotate your torso fully side to side — the movement comes from your core, not your arms.",
    "Touch the weight or your hands down to the floor on each side to get the full range.",
    "Breathe steadily throughout and avoid holding your breath during the twisting motion.",
    "Keep your lower back from rounding by maintaining the 45-degree lean on both sides."
  ],
  "Smith machine bench press": [
    "Position the bench so the bar traces a natural path over your mid-chest when pressing.",
    "The fixed bar path differs from free-weight bench — adjust your grip width if needed.",
    "Plant your feet flat on the floor and keep your shoulder blades retracted and depressed.",
    "Lower the bar to your mid-chest under control and press back up in a straight line.",
    "Unrack by rotating the bar out of the safety hooks, not by pressing straight upward.",
    "Rack safely by twisting the bar back into the hooks at the end of each set."
  ],
  "Smith machine hip thrust": [
    "Set the Smith bar at a height that rests comfortably across your hips when seated on the floor.",
    "Use a barbell pad or foam roll to cushion the bar across your hips.",
    "Drive through your heels to push your hips up until your body is in a straight line.",
    "Squeeze your glutes hard at the top and hold for one full count before lowering.",
    "Lower your hips under control — don't let the bar drop or crash down onto you.",
    "Keep your feet flat and your knees tracking directly over your toes throughout."
  ],
  "Smith machine inverted row": [
    "Set the bar at hip height or lower — the closer to the floor, the harder the movement.",
    "Hang under the bar with your body in a straight line, gripping shoulder-width apart.",
    "Pull your chest up to the bar by squeezing your shoulder blades together.",
    "Keep your body rigid from head to heels — your hips must not sag toward the floor.",
    "Lower yourself back down slowly with control until your arms are fully extended.",
    "Elevate your feet on a bench to significantly increase the difficulty once bodyweight rows feel easy."
  ],
  "Smith machine Romanian deadlift": [
    "Set the bar at mid-thigh height to match a standard Romanian deadlift starting position.",
    "Position your feet slightly forward of the bar to compensate for the fixed vertical path.",
    "Push your hips back as you lower the bar along your legs — not straight down.",
    "Stop when your hamstrings reach their limit and before your lower back begins to round.",
    "Drive your hips forward and squeeze your glutes to stand, pressing through your heels.",
    "Keep the bar tracking close to your body throughout — it should skim your legs on the way down."
  ],
  "Smith machine seated overhead press": [
    "Set the bench upright at 90 degrees and position it so the bar starts at chin height.",
    "Grip the bar slightly wider than shoulder width to reduce shoulder joint stress.",
    "Press the bar straight up along the fixed vertical path — no need to arc around your face.",
    "Lower the bar to your upper chest level — not behind your neck.",
    "Keep your lower back in contact with the bench pad and avoid excessive arching.",
    "Brace your core to prevent your lower back from overextending under heavy loads."
  ],
  "Smith machine shrug": [
    "Stand upright with the bar resting in front of your thighs, arms fully extended down.",
    "Shrug your shoulders straight up toward your ears in a controlled, vertical motion.",
    "Hold the contraction at the top for one count to fully engage your traps.",
    "Lower your shoulders slowly back to the start — don't just drop the weight.",
    "Keep your arms straight throughout — shrugs are a trap exercise, not a bicep curl.",
    "Avoid rolling your shoulders in circles, which can stress the shoulder joint over time."
  ],
  "Smith machine squat": [
    "Position your feet slightly forward of the bar to account for its fixed vertical path.",
    "Keep feet shoulder-width apart with toes pointed slightly outward.",
    "Squat until your thighs are at least parallel to the floor before driving back up.",
    "Drive through your heels and keep your chest tall and upright throughout the lift.",
    "Set the safety hooks at the correct height in case you need to bail out of the set.",
    "The Smith machine removes the need to balance, so focus entirely on depth and control."
  ],
  "Smith machine calf raise": [
    "Place the bar across your upper traps and position the balls of your feet on a raised platform.",
    "Let your heels hang off the edge to get a full stretch at the bottom of each rep.",
    "Lower your heels as far as possible before each rep to maximize the stretch.",
    "Drive up onto the balls of your feet and squeeze your calves hard at the top.",
    "Pause briefly at the top and bottom of each rep to eliminate bounce momentum.",
    "Keep your legs fully straight throughout — bending your knees shifts work to your soleus."
  ],
  "Chin-ups": [
    "Don't kip or swing your hips to get over the bar — use strict pulling strength the whole way up.",
    "Initiate each rep by depressing your shoulder blades first; starting from a passive shrug puts unnecessary strain on the shoulder capsule.",
    "Drive your elbows down and toward your hips, not just straight back — this keeps your lats engaged rather than just your biceps.",
    "Lower all the way to a full arm extension on every rep; partial reps cut your range and limit lat development.",
    "Avoid jutting your head forward to fake clearing the bar — your chin must genuinely pass above it.",
    "If your forearms fatigue before your back, focus on initiating the pull from your shoulder blades, not your hands."
  ],
  "Wide-grip cable row": [
    "Don't round your lower back to reach farther forward at the start — additional stretch should come from protracting your shoulder blades, not bending your spine.",
    "Flare your elbows outward as you pull; elbows tucking to your sides narrows the grip effect and turns it into a regular row.",
    "Keep your torso upright throughout — rocking backward to move the weight removes the back's job and risks lower-back strain.",
    "Focus the squeeze at the end of the pull on your upper back and rear delts, not just your lats — that's the purpose of the wide grip.",
    "Control the return slowly; the eccentric phase is where upper-back development happens."
  ],
  "Cable tricep kickback": [
    "Your upper arm must stay parallel to the floor for the entire set — if it drops, you lose mechanical advantage and the tricep barely works.",
    "Don't swing your torso upright to assist the weight; the movement is a pure elbow hinge.",
    "Extend your arm all the way at the top — a partial lockout shortchanges the peak contraction.",
    "Use a light enough weight to maintain a stationary upper arm; this is one of the exercises most often ruined by going too heavy.",
    "Brace your core in the hinged position to protect your lower back throughout the set."
  ],
  "Dumbbell sumo squat": [
    "Keep your knees tracking over your toes throughout — with toes pointed wide, that means actively pushing your knees outward, not letting them cave in.",
    "Keep your chest tall and torso as upright as possible — forward lean shifts load away from your quads and inner thighs.",
    "Don't bounce at the bottom; control the descent and use your muscles to reverse direction.",
    "The dumbbell hangs freely between your legs — don't press it against your body, which changes the movement pattern.",
    "Drive through your full foot, not just the balls of your feet, to maintain balance and power."
  ],
  "Cable standing single-arm chest fly": [
    "Maintain a fixed slight bend in your elbow throughout — that angle should never change between the start and finish of the arc.",
    "All movement comes from your shoulder joint; your elbow angle is locked. If your elbow bends more as you pull, you're turning it into a row.",
    "Don't let the cable yank your arm back at the end of the return — control the full stretch.",
    "Keep your torso still; rotating your body toward the cable to get more range shifts load off your chest.",
    "Stagger your feet for a stable base — without it, you'll compensate with your torso rather than your chest doing the work."
  ],
  "EZ bar front raise": [
    "Keep your arms almost fully straight — bending your elbows to help lift the bar turns it into a partial curl, not a front raise.",
    "Don't use momentum; if you need to rock your torso to swing the bar up, reduce the weight.",
    "Stop at shoulder height — raising higher than parallel shifts load onto your traps rather than your front deltoids.",
    "Lower the bar slowly under control; the eccentric phase builds the front deltoid just as much as the lift.",
    "Keep your wrists neutral throughout — the angled EZ bar grip reduces wrist strain compared to a straight bar."
  ],
  "Hack squat calf raise": [
    "Keep your legs fully extended throughout — bending your knees shifts load from the gastrocnemius to the soleus and reduces the training effect.",
    "Use the full range of motion: heels as far below the platform edge as possible at the bottom, as high as possible at the top.",
    "Pause briefly at both ends to eliminate the stretch reflex bounce and force your calves to produce genuine force.",
    "Engage the safety handles before stepping off the machine — never leave a loaded sled unsecured.",
    "Position only the balls of your feet on the platform edge; if your heels are resting on the surface, you cannot achieve a full calf stretch."
  ],
  "Back extension": [
    "Stop when your body reaches horizontal — hyperextending past a straight line compresses your lumbar discs without adding benefit.",
    "Control the descent; letting your torso drop quickly is wasted range and can strain your lower back.",
    "Squeeze your glutes at the top to stabilize your pelvis — this also shifts some load from your lumbar to your glutes, reducing spinal stress.",
    "Maintain a neutral spine throughout — don't round your upper back as you lower down.",
    "Secure your feet firmly under the ankle rollers before beginning; a foot that slips mid-rep is a fall risk."
  ]
,
  "Dumbbell calf raise": [
    "Hold onto something stable with your free hand — this is a balance exercise as much as a calf exercise.",
    "Let your heel drop as low as the step allows before each rep for a full stretch.",
    "Press through the ball of your foot and rise as high onto your toes as possible at the top.",
    "Pause briefly at the top and squeeze your calf hard before lowering.",
    "Keep your knee soft and still — the movement should come from your ankle, not a knee bend.",
    "Finish all reps on one side before switching, or alternate evenly so neither calf gets shorted."
  ],
  "Barbell decline bench press": [
    "Hook your ankles securely under the rollers before you unrack — that's your anchor for the whole set.",
    "Lower the bar to your lower chest, not your upper chest like a flat press.",
    "Keep your shoulder blades pinned back and down against the bench throughout.",
    "The decline angle shortens the range of motion — don't rush it, still control the descent.",
    "Have a spotter or use a rack with safeties; decline setups are the hardest to bail out of.",
    "Elbows track at roughly 45 degrees from your torso, not flared to 90."
  ],
  "Barbell floor press": [
    "Let your upper arms rest fully on the floor at the bottom — that's your depth cue, not your chest.",
    "The pause on the floor kills momentum, so drive back up deliberately rather than bouncing.",
    "Keep your feet flat and glutes relaxed; this isn't a leg-drive lift like a full bench press.",
    "Great for locking out triceps strength since the floor removes the bottom third of a normal press.",
    "Set your grip just outside shoulder width — too wide strains the shoulders with no leg drive to help.",
    "Take a breath and brace before each rep; there's no bounce to help you out of the bottom."
  ],
  "Barbell pullover": [
    "Keep only your upper back and shoulders on the bench — hips low, like a bridge.",
    "Elbows stay soft and fixed throughout; this is a shoulder-hinge, not an elbow-bend movement.",
    "Lower the bar behind your head until you feel a real stretch through your lats and chest, not your shoulders straining.",
    "Go lighter than you think — this is a stretch-and-contract exercise, not a strength builder.",
    "Exhale as the bar arcs back up over your chest.",
    "Keep your ribs down; flaring them to chase range of motion strains the lower back."
  ],
  "Dumbbell incline chest fly": [
    "Keep a slight, fixed bend in your elbows the whole set — don't let them straighten or collapse.",
    "Lower until you feel a stretch across the upper chest, not until the dumbbells drop below your shoulders.",
    "Think about hugging a barrel, not pressing — the arc comes from your shoulders.",
    "Squeeze your chest at the top like you're closing a book, don't just tap the dumbbells together.",
    "Keep your shoulder blades pinned to the bench; letting them roll forward turns this into a shoulder exercise.",
    "Go lighter than your flat fly weight — the incline angle adds strain at the bottom."
  ],
  "Dumbbell decline chest fly": [
    "Set the bench to a shallow decline — too steep makes the setup awkward and unstable.",
    "Keep elbows softly bent and fixed throughout, same as any fly.",
    "Lower to chest level, not below — the decline angle already shortens the safe range.",
    "Squeeze at the top rather than banging the dumbbells together.",
    "This targets the lower chest fibers — pair it with an incline movement for full coverage.",
    "Have a spotter hand you the dumbbells at the start; getting into position solo on a decline is awkward."
  ],
  "Dumbbell floor press": [
    "Let your triceps touch the floor at the bottom — that's your stopping point, not a target to avoid.",
    "Keep your feet flat and core braced; there's no leg drive here to bail you out.",
    "This is a great shoulder-friendly alternative to a full bench press since the floor limits the range.",
    "Press the dumbbells slightly up and in toward each other at the top for a full chest squeeze.",
    "Get the dumbbells into position by curling them up to your chest first, then rolling back — don't muscle them up from the floor.",
    "Control the lowering; dropping your elbows onto the floor defeats the purpose."
  ],
  "Dumbbell neutral bench press": [
    "Keep your palms facing each other for the entire rep — no rotation like a standard dumbbell press.",
    "This grip is easier on the shoulders, so it's a good option if a regular press bothers your joints.",
    "Bring the dumbbells down until your upper arms are roughly level with the bench, elbows tucked closer than a standard press.",
    "Press up and slightly in so the dumbbells nearly touch at the top.",
    "Keep your feet planted and glutes engaged for a stable base.",
    "The neutral grip also hits the triceps a bit harder than a pronated press."
  ],
  "Smith machine incline bench press": [
    "Set the bench under the bar before loading weight so the bar path lines up with your upper chest.",
    "Since the bar path is fixed, focus your effort on controlling the descent rather than stabilizing.",
    "Lower to your upper chest/collarbone area — that's what the incline angle targets.",
    "Keep your feet flat and shoulder blades pinned throughout.",
    "Twist to unlock the bar only once you're set and braced, not before.",
    "Don't flare your elbows past 45-60 degrees even though the machine feels more stable."
  ],
  "Machine assisted parallel bar dips": [
    "More weight on the stack means more assistance — start heavier on the assist and work down over time.",
    "Kneel centered on the platform so the machine doesn't tip or rock mid-set.",
    "Lean forward slightly for chest emphasis, stay upright for more triceps.",
    "Lower until your upper arms are roughly parallel to the floor — don't sink deeper if your shoulders complain.",
    "Press back up without locking out aggressively at the top.",
    "As you get stronger, reduce the assist weight so your bodyweight does more of the work."
  ],
  "Cable decline chest fly": [
    "Start with a slight forward lean and a soft bend in your elbows, fixed for the whole set.",
    "Sweep your hands down and together in an arc — think hugging a tree, not pressing straight down.",
    "Cross your hands slightly at the bottom for a full chest squeeze, then reset.",
    "Keep your feet staggered for a stable base as you lean into the cables.",
    "Control the return; don't let the weight stacks slam you back to the start position.",
    "Both pulleys must match in height — check the pin on each side before you start."
  ],
  "Cable incline chest fly": [
    "Start with the pulleys low and your hands beginning down by your hips.",
    "Sweep your arms up and in, finishing with your hands meeting above chest height.",
    "This angle targets the upper chest fibers, opposite of the high-to-low crossover.",
    "Keep a slight, fixed elbow bend throughout — don't turn it into a press.",
    "Lean your torso forward slightly as you sweep up to keep tension on the chest, not the shoulders.",
    "Squeeze and pause briefly at the top before controlling the return."
  ],
  "Decline push-up": [
    "Elevate your feet on a sturdy box or bench — the higher the feet, the more upper-chest and shoulder emphasis.",
    "Keep your body in a straight line from head to heels; don't let your hips sag or pike up.",
    "Lower until your chest nearly touches the floor, elbows at roughly 45 degrees.",
    "This is harder than a standard push-up since more of your bodyweight loads the upper body — regress to flat push-ups if your form breaks down.",
    "Keep your core braced throughout to protect your lower back.",
    "Press through your whole palm, not just your fingers, to protect your wrists."
  ],
  "Wide-grip push-ups": [
    "Place your hands noticeably wider than shoulder width, fingers pointing slightly out.",
    "Expect a shorter range of motion than a standard push-up — that's normal with a wide grip.",
    "Let your elbows flare out more than usual; this variation intentionally emphasizes the chest over the triceps.",
    "Keep your body rigid in a straight line — a wide grip makes it easier to let your hips sag, so brace your core.",
    "Lower under control rather than dropping quickly; the wider grip adds shoulder strain if you go too fast.",
    "If your shoulders complain, narrow the grip slightly rather than pushing through pain."
  ],
  "Barbell pronated Pendlay row": [
    "The bar rests on the floor at the bottom of every single rep — no hovering, no bouncing.",
    "Set your back flat and roughly parallel to the floor before you pull, and keep it there the whole set.",
    "Pull explosively from the floor, driving your elbows up and back.",
    "This is meant to be done for lower reps with a dead stop each rep — don't turn it into a touch-and-go row.",
    "Keep your head in a neutral position; craning your neck up strains it for no benefit.",
    "Brace your core hard before every pull since there's no momentum carrying you into the next rep."
  ],
  "Barbell rack pull": [
    "Set the pins at knee height (or wherever you want the partial range to start) before loading the bar.",
    "This lets you overload the top half of a deadlift with more weight than you could pull from the floor.",
    "Keep the bar close to your shins and thighs the entire pull.",
    "Drive your hips through to full lockout, squeezing your glutes rather than leaning back.",
    "Don't turn this into a shrug at the top — stop once your hips and knees are fully extended.",
    "Because the range is shorter, it's easy to overload the bar too much — build up gradually."
  ],
  "Yates row": [
    "Grip the bar underhand (palms facing you) — this is what separates it from a standard barbell row.",
    "Stay more upright than a Pendlay row, around a 45-degree torso angle.",
    "Pull the bar toward your lower ribs/waist, elbows driving down and back.",
    "The underhand grip naturally recruits more biceps, so expect to feel it there too.",
    "Keep your core braced to protect your lower back at this more upright angle.",
    "Control the lowering rather than letting the bar drop and yank your shoulders."
  ],
  "Dumbbell laying incline row": [
    "Set the bench low enough that your chest rests flat against the pad with your arms hanging free.",
    "Because your torso is locked in place, all the work comes from your back — no cheating with body English.",
    "Row the dumbbells up toward your hips, elbows driving back and slightly out.",
    "Squeeze your shoulder blades together at the top before lowering with control.",
    "Keep your neck relaxed and head in line with your spine rather than craning up.",
    "Go heavier here than a standing row since your lower back has zero involvement."
  ],
  "Incline dumbbell row": [
    "Set the bench to a steep incline and lie face-down with your chest supported.",
    "Let the dumbbells hang straight down at the start for a full stretch.",
    "Row up toward your hips, keeping your elbows close to your body rather than flared wide.",
    "This angle takes momentum completely out of the equation — feel the difference from a standing row.",
    "Keep your forehead resting on the pad or looking down to keep your neck neutral.",
    "Lower under control instead of letting the weights drop between reps."
  ],
  "Kroc row": [
    "Brace one knee and hand on a bench for support, and let the other arm hang free holding a heavy dumbbell.",
    "This is meant to be heavier and less strict than a standard single-arm row — a little hip and torso rotation is normal.",
    "Drive the dumbbell up powerfully toward your hip, using your legs and hips to help initiate the pull.",
    "Keep your lower back braced throughout since this variation puts more load through the spine.",
    "Don't let your shoulder shrug up toward your ear at the top — keep it pulled down and back.",
    "Build up in weight gradually; the momentum involved makes this easy to overdo too soon."
  ],
  "Machine high row": [
    "Set the seat height so the handles line up with your upper chest, not your stomach.",
    "Pull the handles back and down toward your upper chest, driving your elbows up and out.",
    "Squeeze your shoulder blades together hard at the back of the movement.",
    "This angle emphasizes the upper back and rear delts more than a standard mid-back row.",
    "Keep your chest pressed against the pad throughout — don't let it lift off to cheat extra range.",
    "Control the return rather than letting the weight stack yank your arms forward."
  ],
  "Machine pullover": [
    "Set the seat so the pivot point of the machine's arm lines up with your shoulders.",
    "Keep a slight, fixed bend in your elbows — this is a lat stretch-and-pull, not a triceps press.",
    "Let the arm rise until you feel a full stretch through your lats before pulling back down.",
    "Pull down and back using your lats, not your arms — imagine driving your elbows toward your hips.",
    "Keep your chest against the back pad and avoid arching to add extra range.",
    "This machine is a good option if barbell or cable pullovers bother your shoulders."
  ],
  "Cable rope pullover": [
    "Set the pulley high and step or kneel a comfortable distance from the tower.",
    "Keep your elbows slightly bent and fixed throughout, arcing down like the barbell version.",
    "Pull the bar down to about thigh height, focusing on driving with your lats, not your arms.",
    "Keep your ribs down and core braced instead of arching your lower back to reach further.",
    "The constant cable tension makes this a good lat finisher after heavier rows or pulldowns.",
    "Control the return back up to the stretched position rather than letting the weight yank you forward."
  ],
  "Inverted row": [
    "Set the bar at a height where you can keep your body in a straight line with a challenging lean-back angle.",
    "The lower the bar, the harder the row — raise it to make this easier, lower it to make it harder.",
    "Keep your body rigid from head to heels; don't let your hips sag toward the floor.",
    "Pull your chest to the bar, driving your elbows back rather than just bending your arms.",
    "Squeeze your shoulder blades together at the top before lowering under control.",
    "This is a great bodyweight alternative to a cable row when no machine is free."
  ],
  "Supermans": [
    "Lift your arms, chest, and legs off the floor at the same time — not just your upper or lower body alone.",
    "Reach long through your fingertips and toes rather than just arching hard.",
    "Hold briefly at the top, squeezing your glutes and lower back, then lower with control.",
    "Keep your neck neutral — look at the floor a few feet in front of you, not straight ahead.",
    "This is a light, low-load exercise — don't expect to add weight, just add reps or hold time.",
    "Breathe normally through the hold rather than holding your breath."
  ],
  "Scapular pull-ups": [
    "Hang with your arms fully straight — this is not a bent-elbow pulling movement.",
    "All the motion comes from your shoulder blades pulling down and together, not your arms bending.",
    "You'll only move a few inches — that's correct, don't try to turn it into a full pull-up.",
    "Great as a warm-up before pull-ups or as a beginner regression to build shoulder control first.",
    "Keep your core braced so you're not swinging as you shrug down.",
    "Pause for a moment at the bottom of the shrug before returning to a relaxed hang."
  ],
  "Landmine overhead press": [
    "Anchor the empty end of the bar in a landmine attachment or a sturdy corner before loading plates.",
    "The bar naturally arcs up and forward as you press — don't fight the path, follow it.",
    "A staggered stance gives you a more stable base than standing square.",
    "This angle is easier on the shoulders than a straight overhead press, making it a good option if overhead pressing bothers you.",
    "Press through the whole hand and keep your wrist stacked over your elbow.",
    "You can press with one or both hands on the bar — start with two hands to learn the path."
  ],
  "Barbell seated shoulder press": [
    "Sit on a bench with back support if your gym has one — it removes leg drive and isolates the shoulders more.",
    "Start with the bar at your upper chest/collarbone, not lower.",
    "Press straight up rather than forward, finishing with the bar over the crown of your head.",
    "Keep your core braced; without leg drive, your torso does the stabilizing.",
    "Lower under control to the same starting position each rep.",
    "If you feel pinching at the top, stop just short of full lockout rather than forcing it."
  ],
  "Dumbbell scaption raise": [
    "Raise the dumbbells along a diagonal line, roughly 30 degrees in front of your body — not straight out to the side.",
    "Lead with your thumbs slightly up throughout the raise.",
    "This angle is often more shoulder-friendly than a standard lateral raise since it avoids the impingement zone.",
    "Raise only to shoulder height; going higher adds no benefit and adds strain.",
    "Use lighter weight than a lateral raise — the diagonal path is less mechanically efficient.",
    "Keep a slight bend in your elbows and avoid using momentum to swing the weights up."
  ],
  "Cable Y-raise": [
    "Cross the cables behind you at the low pulleys before you start, so they pull diagonally.",
    "Raise your arms up and out to form a wide \"Y\" shape overhead, thumbs leading.",
    "Keep a slight bend in your elbows throughout rather than locking them straight.",
    "This trains the lower traps and rear delts together — a great posture-focused finisher.",
    "Use light weight; this is a control-and-positioning exercise, not a heavy lift.",
    "Avoid shrugging your shoulders up toward your ears as you raise your arms."
  ],
  "Cable bar front raise": [
    "Set the pulley low and stand facing away from the tower.",
    "Raise your arm(s) straight out in front to shoulder height, palm(s) down.",
    "The constant cable tension makes this harder at the top than a dumbbell front raise, where gravity helps at the top.",
    "Keep your torso still; don't lean back to help the weight up.",
    "Lower under control rather than letting the cable snap your arm back down.",
    "Alternate arms or do them together, whichever keeps your form cleaner."
  ],
  "Plate-loaded shoulder press": [
    "Set the seat height so the handles start level with your shoulders.",
    "Press the handles up along the machine's fixed path — no need to balance the weight yourself.",
    "Keep your back flat against the pad throughout the press.",
    "Because the path is fixed, this is a good option for building pressing strength safely as a beginner.",
    "Don't lock your elbows out aggressively at the top; stop just short.",
    "Lower under control back to the start rather than letting the weight drop."
  ],
  "Barbell drag curl": [
    "Keep the bar in contact with your body as it travels up — dragging up your torso, not arcing away from it.",
    "Let your elbows travel backward behind your torso as the bar rises, unlike a standard curl.",
    "This shifts more emphasis onto the rear of the biceps and less onto the front delts.",
    "Use a lighter weight than your standard curl — the strength curve is different and harder at the top.",
    "Keep your wrists straight throughout rather than curling them to compensate.",
    "Lower with control, letting the bar drag back down along the same path."
  ],
  "21s barbell curl": [
    "Break the rep range into thirds: 7 bottom-half partials, 7 top-half partials, then 7 full reps.",
    "Bottom-half reps go from full extension to elbow at 90 degrees.",
    "Top-half reps go from elbow at 90 degrees to full contraction.",
    "Keep your elbows pinned at your sides through all three phases — don't let them drift forward.",
    "Use lighter weight than your usual curl; the constant tension adds up fast.",
    "Save this for the end of an arm day — it's a finisher, not a strength-building exercise."
  ],
  "Wide-grip barbell curl": [
    "Grip the bar noticeably wider than shoulder width.",
    "This grip shifts emphasis toward the inner (short) head of the biceps.",
    "Keep your elbows tucked at your sides even though the grip is wide.",
    "Expect a slightly shorter, more restricted range of motion than a standard curl.",
    "Don't let your elbows drift forward as the weight gets heavy — that's momentum taking over.",
    "Control the lowering just as carefully as the lift."
  ],
  "Dumbbell Zottman curl": [
    "Curl up with a normal underhand grip, palms facing up.",
    "At the very top, rotate your wrists so your palms face down before lowering.",
    "Lower slowly with the palms-down grip — this is what makes the exercise unique, hitting the forearms hard on the way down.",
    "Rotate back to palms-up only once you reach the bottom, ready for the next rep.",
    "Use less weight than a standard curl since the reversed lowering grip is noticeably harder.",
    "Keep your elbows pinned at your sides through both the curl and the reverse lowering."
  ],
  "Dumbbell spider curl": [
    "Drape your torso face-down over a steep incline bench so your arms hang freely in front.",
    "Keep your upper arms glued to the bench pad throughout — no swinging.",
    "This position removes all momentum, making it a strict biceps isolation move.",
    "Curl all the way up until your biceps are fully contracted.",
    "Lower slowly and fully — the dead-hang bottom position adds a strong stretch.",
    "Use lighter weight than a standing curl; strict form here is unforgiving of ego lifting."
  ],
  "Cross-body hammer curl": [
    "Use a neutral grip (palms facing in) throughout, same as a standard hammer curl.",
    "Curl the dumbbell diagonally across your body toward the opposite shoulder, not straight up.",
    "This angle emphasizes the brachialis and forearm slightly differently than a straight hammer curl.",
    "Keep your elbow relatively fixed at your side rather than letting it drift across your body.",
    "Alternate arms with control rather than rushing through both sides.",
    "Lower back along the same diagonal path you curled up."
  ],
  "Machine bicep curl": [
    "Rest your upper arms fully on the angled pad before you start each set.",
    "Curl using only your forearms — the pad locks your upper arms in place so you can't cheat with body swing.",
    "Squeeze hard at the top of each rep since the machine removes any momentum.",
    "Lower under control rather than letting the plates drop and yank your arms straight.",
    "This is a good finisher exercise since strict form is easy to maintain even when fatigued.",
    "Adjust the seat so your elbows line up with the machine's pivot point."
  ],
  "Cable spider curl": [
    "Set the pulley low and drape yourself face-down over a steep incline bench facing the tower.",
    "Keep your upper arms pinned to the bench pad, same as the dumbbell spider curl.",
    "The cable keeps constant tension throughout, unlike dumbbells which go slack at the bottom.",
    "Curl all the way up to a full contraction, then lower with control.",
    "Use lighter weight than you'd expect — the constant tension makes this harder than it looks.",
    "Keep your neck relaxed, resting your head to the side or looking down."
  ],
  "Dumbbell close-grip floor press": [
    "Hold the dumbbells close together, closer than a standard floor press.",
    "Keep your elbows tucked tight to your ribs as you lower, not flared out.",
    "Let your triceps touch the floor at the bottom — that's your depth cue.",
    "This variation shifts more of the work onto the triceps compared to a regular floor press.",
    "Press the dumbbells up and slightly together at the top for a full triceps squeeze.",
    "Keep your wrists stacked directly over your elbows throughout to avoid strain."
  ],
  "Seated machine tricep extension": [
    "Adjust the seat so your upper arms are braced vertically by the pads before you start.",
    "Extend your arms fully, focusing on squeezing the triceps at the top.",
    "Keep your upper arms pinned in place throughout — only your forearms should move.",
    "Lower under control back to a full stretch rather than letting the weight drop.",
    "This machine is a safe option for isolating triceps if overhead extensions bother your elbows.",
    "Don't shrug your shoulders up as the weight gets heavier — keep them relaxed and down."
  ],
  "Bench dips": [
    "Keep your hands gripping the bench edge directly behind your hips, fingers pointing forward.",
    "Lower straight down, keeping your elbows pointing behind you rather than flaring out.",
    "Stop once your upper arms are roughly parallel to the floor — going deeper stresses the shoulders.",
    "Keep your hips close to the bench throughout; walking your feet too far out increases shoulder strain.",
    "Add a plate on your lap once bodyweight reps feel easy.",
    "If you feel shoulder pinching, reduce your range of motion rather than pushing through it."
  ],
  "Close-grip push-ups": [
    "Place your hands close together under your chest, thumbs and index fingers nearly touching.",
    "Keep your elbows tucked tight to your ribs as you lower — this is what shifts emphasis onto the triceps.",
    "Keep your body in a straight line from head to heels throughout.",
    "This is harder on the wrists than a standard push-up — keep them straight, not bent back.",
    "Lower until your chest is just above your hands, then press back up fully.",
    "Regress to a wider grip if your elbows or wrists start to complain."
  ],
  "Barbell reverse curl": [
    "Grip the bar with your palms facing down (overhand), the opposite of a standard curl.",
    "This grip shifts the work onto your forearms and brachialis more than a regular curl.",
    "Expect to use noticeably less weight than your standard curl — this grip is much weaker.",
    "Keep your wrists firm and straight throughout; don't let them bend back under the load.",
    "Keep your elbows pinned at your sides as you curl.",
    "Lower with control since the overhand grip makes the descent harder to control than it looks."
  ],
  "Dumbbell finger curl": [
    "Rest your forearms on your thighs while seated, wrists hanging just past your knees.",
    "Let the dumbbell roll down into your fingertips until it's barely held on.",
    "Curl your fingers closed around the handle, then open them again — the wrist stays still throughout.",
    "This targets grip strength specifically, distinct from a wrist curl which moves the wrist.",
    "Use light weight; grip and finger flexors fatigue quickly.",
    "Great to pair with farmers carries or dead hangs for well-rounded grip training."
  ],
  "Cable wrist curl": [
    "Rest your forearms on your thighs while seated, wrists hanging just past your knees.",
    "Curl your wrists up as far as comfortable, then lower with control.",
    "Keep your forearms pinned to your thighs throughout — only your wrists should move.",
    "The cable's constant tension makes this different from a dumbbell wrist curl, which goes slack at the top.",
    "Use light weight and higher reps; forearms respond well to volume.",
    "Don't let the weight yank your wrists down quickly between reps."
  ],
  "Cable wrist extension": [
    "Grip the bar with your palms facing down throughout.",
    "Rest your forearms on your thighs, wrists hanging just past your knees.",
    "Extend your wrists upward (back of the hand lifting), then lower with control.",
    "This targets the top of the forearm, the opposite side from a regular wrist curl.",
    "Use lighter weight than the regular wrist curl — this direction is noticeably weaker.",
    "Keep your forearms still throughout; only your wrists move."
  ],
  "Dumbbell seated rear delt fly": [
    "Sit facing the raised incline pad with your chest pressed against it.",
    "Raise your arms out to the sides with a slight bend in your elbows, squeezing your shoulder blades together at the top.",
    "The chest support removes all momentum, making this a strict rear-delt isolation move.",
    "Keep your head resting against the pad or looking down to avoid straining your neck.",
    "Use lighter weight than you'd expect — rear delts are a small muscle group.",
    "Lower with control rather than letting the dumbbells drop."
  ],
  "Prone dumbbell Y-raise": [
    "Lie face-down on an incline bench with your arms hanging straight down.",
    "Raise your arms up and out to form a \"Y\" shape, thumbs leading.",
    "Keep the weight light — this is a control and positioning exercise, not a strength builder.",
    "Squeeze your shoulder blades down and together at the top of the raise.",
    "Keep your neck relaxed and in line with your spine.",
    "Lower with control rather than letting your arms drop back down."
  ],
  "Cable high reverse fly": [
    "Cross the cables in front of you, gripping the opposite tower's handle with each hand.",
    "Sweep your arms outward and back, squeezing your shoulder blades together.",
    "Keep a slight bend in your elbows throughout rather than locking them straight.",
    "The crossed cable path gives constant tension across a wide range, different from dumbbells.",
    "Use light weight; rear delts fatigue quickly and don't need heavy loads.",
    "Control the return to the crossed starting position rather than letting the stack yank you forward."
  ],
  "Cross-cable reverse fly": [
    "Hinge forward at the hips to roughly 45 degrees before you start, and hold that angle throughout.",
    "Reach across your body to grip the opposite tower's handle with each hand.",
    "Sweep your arms out and back, squeezing your shoulder blades together at the top.",
    "The forward lean shifts more emphasis onto the rear delts compared to standing upright.",
    "Keep your core braced to protect your lower back at this hinged angle.",
    "Use light weight and control the tempo rather than swinging through the movement."
  ],
  "Barbell high pull": [
    "Start with the bar at your thighs, knees soft, hips slightly hinged — an athletic ready position.",
    "Pull the bar up close to your body, letting your elbows lead and rise above your hands.",
    "This is a shrug-and-pull combination, not a curl — don't bend your elbows to help the bar up.",
    "Extend up onto your toes as the bar reaches its highest point for a full-body pull.",
    "Use moderate weight; the explosive nature of this pull rewards speed over heavy loads.",
    "Keep the bar close to your torso throughout — letting it drift away strains your lower back."
  ],
  "Dumbbell high pull": [
    "Start with the dumbbells at your thighs in an athletic, knees-soft stance.",
    "Pull the dumbbells up close to your body, elbows leading and rising above your hands.",
    "Same shrug-and-pull mechanics as the barbell version, just with dumbbells for a more natural hand path.",
    "Extend through your hips and up onto your toes as you pull.",
    "Keep the dumbbells close to your torso rather than swinging them out and away.",
    "Use moderate weight and focus on speed rather than maxing out the load."
  ],
  "Cable shrug": [
    "Stand facing the tower, holding the low-pulley handle or bar with straight arms.",
    "Shrug your shoulders straight up toward your ears, keeping your arms locked straight throughout.",
    "The cable's constant tension makes this feel different from a dumbbell or barbell shrug.",
    "Hold briefly at the top before lowering with control.",
    "Don't roll your shoulders — shrug straight up and straight down.",
    "Keep your knees soft and core braced rather than using your legs to help."
  ],
  "Machine standing shrug": [
    "Stand within the machine frame and grip the side handles with straight arms.",
    "Shrug straight up, letting the machine's loaded arms rise with your shoulders.",
    "The fixed path means you can focus entirely on the shrug without worrying about balancing free weight.",
    "Hold briefly at the top, then lower with control.",
    "This lets you load heavier than most people can safely hold with dumbbells.",
    "Keep your head neutral rather than tilting it forward or back during the shrug."
  ],
  "Barbell walking lunge": [
    "Rack the bar across your upper back like a back squat, not your neck.",
    "Take a controlled step forward, letting your back knee drop toward the floor without touching.",
    "Push off your front heel to stand and step directly into the next lunge — don't reset your feet between steps.",
    "Keep your torso upright throughout; leaning forward with a bar on your back is a balance risk.",
    "Use a wide enough training space since this is a traveling exercise.",
    "Start lighter than your stationary lunge weight until your balance and control are dialed in."
  ],
  "Barbell step-up": [
    "Rack the bar across your upper back before stepping up.",
    "Choose a box height where your knee doesn't pass much beyond 90 degrees at the bottom of the step.",
    "Drive through the heel of your stepping foot, not your back leg pushing off the floor.",
    "Stand all the way up on the box before stepping back down.",
    "Keep your torso tall throughout — don't lean forward to generate momentum.",
    "Step down under control rather than dropping off the box."
  ],
  "Box squat": [
    "Set the box at a height that puts your thighs at or slightly below parallel when you sit on it.",
    "Squat down and actually sit on the box, briefly relaxing your hips at the bottom before driving back up.",
    "Keep your shins relatively vertical as you sit back toward the box.",
    "Don't bounce off the box — pause, then drive up under control.",
    "This teaches you to sit your hips back and builds strength out of a dead stop.",
    "Keep your core braced through the pause since there's no stretch reflex to help you."
  ],
  "Dumbbell front rack squat": [
    "Hold the dumbbells upright at your shoulders, ends resting on your front delts.",
    "Keep your elbows up and pointing forward throughout, like a barbell front squat.",
    "Squat down keeping your torso more upright than a back squat.",
    "Drive your knees forward and out as you descend, tracking over your toes.",
    "This is a good way to train the front squat pattern if a barbell rack isn't free.",
    "Brace your core hard; the front-loaded weight punishes a soft torso."
  ],
  "Dumbbell reverse lunge": [
    "Step backward into the lunge rather than forward — this is easier on the knees than a forward lunge.",
    "Lower your back knee toward the floor without letting it slam down.",
    "Keep most of your weight on your front leg throughout the step back.",
    "Push off your front foot to return to standing rather than pushing off the back foot.",
    "Keep your torso upright; leaning forward shifts stress away from where you want it.",
    "This is often a good starting variation if forward lunges bother your knees."
  ],
  "Dumbbell heels-up goblet squat": [
    "Place a small wedge or a couple of weight plates under your heels before you start.",
    "The elevation lets you sit more upright and get your knees further forward, emphasizing the quads.",
    "Keep your stance narrower than a standard squat since the heel lift changes your mechanics.",
    "This is a good option if ankle mobility limits your depth in a regular squat.",
    "Descend until your thighs are at or below parallel, torso staying tall throughout.",
    "Drive up through your whole foot even though your heels are elevated."
  ],
  "Machine belt squat": [
    "Clip the hip belt on and stand tall on the platform before unracking any load.",
    "Since the load hangs from your hips, your spine is completely unloaded — a great option if back squats bother your lower back.",
    "Keep your hands free or lightly resting on the side rails, not gripping and pulling on them.",
    "Squat down keeping your torso upright, letting the belt's load travel between your legs.",
    "Drive through your whole foot to stand back up.",
    "This is a good way to keep training legs hard while managing a cranky lower back."
  ],
  "Machine pendulum squat": [
    "Position your shoulders under the pads before you start, feet on the angled platform.",
    "The pivoting arm means the resistance changes through the range — it gets harder as you descend.",
    "Keep your back flat against the pad throughout the squat.",
    "This machine allows a very controlled, joint-friendly squat pattern since the path is fixed.",
    "Descend under control; the machine's resistance curve rewards a slow, deliberate lowering phase.",
    "Drive back up through your whole foot to complete the arc."
  ],
  "Vertical leg press": [
    "Lie on your back with your knees pulled toward your chest and feet on the platform overhead.",
    "Press the platform straight up until your legs are extended, stopping just short of locking your knees.",
    "This angle puts more of your bodyweight into the resistance than a 45-degree leg press.",
    "Keep your lower back pressed into the pad throughout — don't let it round up off the pad.",
    "Control the platform back down to a full range rather than letting it crash toward your chest.",
    "Start with lighter weight than a standard leg press since the vertical angle feels heavier."
  ],
  "Bodyweight squat": [
    "Reach your arms forward as you descend to counterbalance your weight.",
    "Sit your hips back and down, keeping your chest up and heels flat.",
    "Go as deep as your mobility comfortably allows — full depth if you can keep good form.",
    "This is the foundation movement for every other squat variation — own it before adding weight.",
    "Push the floor away through your whole foot to stand back up.",
    "Use this as a warm-up or high-rep finisher, not just a beginner-only movement."
  ],
  "Jump squats": [
    "Load into a quarter squat, swinging your arms back before you jump.",
    "Explode upward as hard as you can, swinging your arms forward and up.",
    "Land softly with bent knees, absorbing the impact rather than landing stiff-legged.",
    "Reset fully between reps rather than bouncing straight into the next jump if you're building power.",
    "This is a power and conditioning exercise — keep the reps moderate and quality high.",
    "Land on a surface with some give if possible; concrete floors are hard on the joints."
  ],
  "Wall sit": [
    "Slide your back down a wall until your thighs are roughly parallel to the floor.",
    "Keep your knees stacked directly over your ankles, not pushed forward past your toes.",
    "Press your entire back flat against the wall throughout the hold.",
    "Breathe normally through the hold instead of holding your breath.",
    "This is a static isometric hold — track time held rather than reps.",
    "Add a light dumbbell on your lap once bodyweight holds feel easy."
  ],
  "Barbell high-bar good morning": [
    "Rack the bar across your upper back like a squat, not your neck.",
    "Hinge at your hips, pushing them back as your torso lowers toward parallel with the floor.",
    "Keep a soft, fixed bend in your knees throughout — this is a hip hinge, not a squat.",
    "Keep your back flat the entire time; a rounding back with a bar on it is a real injury risk.",
    "Start very light — this exercise is unforgiving of ego lifting and heavily loads the lower back and hamstrings.",
    "Stop your descent once your torso reaches parallel to the floor, or sooner if your hamstrings are tight."
  ],
  "Barbell sumo deadlift": [
    "Take a wide stance with your toes turned out, and grip the bar with your hands inside your knees.",
    "Push your knees out over your toes as you set your position before pulling.",
    "This stance is more upright than a conventional deadlift, so it tends to load the quads and inner thighs more.",
    "Drive your hips and shoulders up together as the bar leaves the floor.",
    "Keep the bar close to your body throughout the pull.",
    "Squeeze your glutes to finish at the top rather than leaning back."
  ],
  "Barbell stiff-leg deadlifts": [
    "Keep your legs almost completely straight throughout — only a very slight knee bend.",
    "Hinge forward from your hips, letting the bar slide down close to your legs.",
    "Stop once you feel a strong stretch in your hamstrings, usually around shin height.",
    "Keep your back flat; this variation puts more strain on the lower back if it rounds.",
    "This targets the hamstrings harder than a Romanian deadlift since the knees barely bend.",
    "Use lighter weight than a regular deadlift — the straight-leg position is a mechanical disadvantage."
  ],
  "Dumbbell single-leg stiff-leg deadlift": [
    "Stand tall on one leg with a dumbbell in each hand before you start.",
    "Hinge forward at your hips while your free leg extends straight back, forming a \"T\" shape with your torso.",
    "Keep a slight bend in your standing knee throughout, not locked straight.",
    "Keep your hips square to the floor — don't let them rotate open as you hinge.",
    "This is as much a balance exercise as a strength one — expect some wobble while you learn it.",
    "Lower the dumbbells only as far as your hamstring flexibility and balance allow."
  ],
  "Dumbbell sumo deadlift": [
    "Grip a single dumbbell vertically with both hands between your legs.",
    "Take a wide stance with toes turned out, same as a sumo deadlift.",
    "Keep the dumbbell close to your body as you stand up.",
    "Drive through your whole foot and squeeze your glutes to finish at the top.",
    "Keep your back flat throughout; don't round over to reach the dumbbell.",
    "This is a good sumo-pattern option when a barbell setup isn't available."
  ],
  "Machine standing hamstring curl": [
    "Lean into the chest pad for support before you start curling.",
    "Curl your heel up toward your glute, keeping your hips still throughout.",
    "This standing position lets you train one leg at a time with strict form.",
    "Squeeze at the top of the curl before lowering with control.",
    "Keep your standing leg soft, not locked out, for stability.",
    "Don't let your hips shift back to help the curl — that's momentum taking over."
  ],
  "Cable pull-through": [
    "Set the pulley low and face away from the tower, straddling the cable with the rope between your legs.",
    "Hinge forward at your hips, letting the rope pull your hands back between your legs.",
    "Keep your back flat and knees softly bent throughout — this is a hip hinge, not a squat.",
    "Drive your hips forward powerfully to stand up, squeezing your glutes at the top.",
    "Keep the rope close to your body as it swings through.",
    "This is a great way to learn the hip hinge pattern before loading a deadlift."
  ],
  "B-stance barbell hip thrust": [
    "Rest your upper back against a bench with the bar across your hips, and stagger your feet.",
    "Keep most of your weight on the flat-planted foot; the other foot is just there for light balance.",
    "Drive through the working leg to full hip extension, squeezing that glute hard at the top.",
    "This lets you address side-to-side strength differences without going fully single-leg.",
    "Keep your chin tucked slightly and avoid hyperextending your neck at the top.",
    "Lower under control back to the start rather than dropping your hips."
  ],
  "Barbell glute bridge": [
    "Lie on your back on the floor with the bar across your hips and knees bent.",
    "Drive your hips straight up, squeezing your glutes hard at the top.",
    "Keep your upper back and head resting on the floor throughout — this is what separates it from a hip thrust.",
    "Because the range is shorter than a hip thrust, this is a good option if you don't have a bench available.",
    "Keep your chin tucked and avoid overextending your lower back at the top.",
    "Lower with control rather than dropping your hips back to the floor."
  ],
  "Curtsy lunge": [
    "Step one leg diagonally back and across behind your other leg, like a curtsy.",
    "Keep most of your weight on your front leg as you lower.",
    "This angle hits the glutes, particularly the glute medius, differently than a standard lunge.",
    "Keep your torso upright and hips facing forward throughout the movement.",
    "Push through your front heel to return to standing.",
    "Expect some balance challenge at first — this is a less natural movement pattern than a straight lunge."
  ],
  "Dumbbell single-leg hip thrust": [
    "Rest your upper back against a bench with a single dumbbell resting on your hips.",
    "Plant one foot flat on the floor and extend the other leg straight out, unweighted.",
    "Drive through the planted foot to full hip extension, keeping the free leg straight throughout.",
    "This isolates one glute at a time and exposes any left-right strength imbalance.",
    "Keep your hips level — don't let the free-leg side dip or rotate.",
    "Use lighter weight than the two-leg version since you're working one side at a time."
  ],
  "Machine 45-degree back extension": [
    "Position your hips at the top edge of the pad with your ankles secured under the rollers.",
    "Hinge down until you feel a stretch in your hamstrings, keeping your back flat, not rounded.",
    "Rise back up until your body forms a straight line from shoulders to ankles — don't hyperextend past that.",
    "Cross your arms over your chest for a bodyweight-only version, or hold a plate to add load.",
    "Squeeze your glutes at the top of each rep rather than just using your lower back.",
    "This is a great glute and hamstring builder that's easy on the knees."
  ],
  "Machine glute kickback": [
    "Brace yourself on the machine's frame with one foot planted on the loaded platform.",
    "Drive the working leg back and up in a straight line, squeezing the glute hard at the top.",
    "Keep your torso stable and only slightly hinged — don't let it swing to help the kick.",
    "Keep your hips square rather than opening them toward the working side.",
    "Lower with control back to the start rather than letting the weight stack drop you.",
    "This lets you load heavier than the cable version of the same movement."
  ],
  "Single-leg glute bridge": [
    "Lie on your back, one knee bent with the foot flat, the other leg extended straight.",
    "Drive your hips up through the planted foot, keeping the extended leg straight and steady.",
    "Squeeze the glute of your working leg hard at the top.",
    "Keep your hips level throughout — don't let the free-leg side dip.",
    "This is a great way to build single-leg glute strength with no equipment at all.",
    "Lower with control rather than dropping your hips back down."
  ],
  "Frog pump": [
    "Lie on your back with the soles of your feet pressed together and knees splayed wide.",
    "Drive your hips up while keeping your knees wide and feet together the whole time.",
    "This position emphasizes the glutes intensely due to the externally rotated hip angle.",
    "Squeeze hard at the top for a full glute contraction rather than rushing through reps.",
    "This exercise responds well to higher rep ranges since the range of motion is short.",
    "Keep your lower back from overarching at the top of each rep."
  ],
  "Donkey kicks": [
    "Start on your hands and knees with your back flat, not sagging or arched.",
    "Keep your knee bent at a fixed 90-degree angle as you kick your foot up toward the ceiling.",
    "Drive through your heel rather than pointing your toes.",
    "Squeeze your glute at the top of each kick, avoiding lower-back arching to gain extra height.",
    "Keep your hips square to the floor throughout — don't let them rotate open.",
    "This is a low-load exercise; focus on the mind-muscle connection rather than speed."
  ],
  "Barbell calf raises": [
    "Rack the bar across your upper back like a squat before stepping onto the block.",
    "Stand with the balls of your feet on a small block, heels hanging off the back.",
    "Lower your heels below the block for a full stretch before rising.",
    "Rise up onto your toes as high as you can, squeezing your calves hard at the top.",
    "Keep your legs relatively straight throughout — this isn't a squat.",
    "Pause briefly at the top of each rep rather than bouncing straight back down."
  ],
  "Dumbbell single-leg calf raise": [
    "Hold a dumbbell in one hand and lightly touch a wall or rack with the other for balance.",
    "Stand on one foot on a small block with your heel hanging off the back edge.",
    "Lower your heel below the block for a full stretch before rising.",
    "Rise up onto your toes as high as possible, squeezing your calf at the top.",
    "Single-leg work exposes and corrects any left-right calf strength imbalance.",
    "Keep the non-working leg lifted clear of the floor throughout the set."
  ],
  "Dumbbell seated calf raise": [
    "Sit on a bench with your feet on a small block and a dumbbell balanced upright on each knee.",
    "Lower your heels below the block for a full stretch before rising.",
    "Rise up onto your toes, keeping the dumbbells balanced and steady on your knees.",
    "The seated angle shifts emphasis onto the soleus rather than the larger calf muscle worked when standing.",
    "Use your hands to keep the dumbbells from tipping rather than to help lift them.",
    "Pause briefly at the top of each rep for a full contraction."
  ],
  "Machine donkey calf raise": [
    "Bend forward at the hips and brace your waist under the machine's loaded pad.",
    "Place the balls of your feet on the platform with your heels hanging off the edge.",
    "Lower your heels for a full stretch before rising onto your toes.",
    "This bent-over position is considered one of the most effective calf-building angles due to the stretch it creates.",
    "Keep your legs relatively straight and let your ankles do the work.",
    "Hold the support bar for balance, not to help lift the weight."
  ],
  "Calf raises": [
    "Stand on the edge of a small step with the balls of your feet planted and heels hanging off.",
    "Lower your heels below the step for a deep stretch before rising.",
    "Rise up onto your toes as high as you can, pausing briefly at the top.",
    "Lightly touch a wall for balance if needed, without using your hands to help lift.",
    "This is a great warm-up or high-rep finisher requiring no equipment at all.",
    "Slow the tempo down if bodyweight reps start feeling too easy, rather than adding load right away."
  ],
  "Bodyweight single-leg calf raise": [
    "Stand on one foot on the edge of a small step, heel hanging off the back.",
    "Lower your heel for a full stretch, then rise up onto your toes as high as possible.",
    "Keep your non-working foot lifted clear of the floor the whole set.",
    "This is noticeably harder than the two-leg version since you're lifting your full bodyweight on one calf.",
    "Lightly touch a wall for balance rather than gripping it to assist the lift.",
    "Add a dumbbell in one hand once bodyweight reps feel too easy."
  ],
  "Side-lying dumbbell hip adduction": [
    "Lie on your side with your top leg bent, foot planted in front of your bottom leg.",
    "Rest a light dumbbell on the ankle of your straight, bottom leg.",
    "Lift the bottom leg straight up toward the bent top leg — that's the working motion.",
    "Keep the lifting leg straight throughout rather than letting the knee bend.",
    "This targets your inner thigh (adductors), a muscle group most training plans neglect.",
    "Use light weight; the adductors are a smaller muscle group than the quads or hamstrings."
  ],
  "Cable standing hip adduction": [
    "Attach the ankle cuff to the leg farther from the tower and stand sideways to it.",
    "Start with that leg raised out to the side, crossing your body's midline.",
    "Sweep the leg inward, across your body, past your standing leg.",
    "Hold the machine frame for balance rather than using momentum to swing the leg.",
    "Keep your torso upright throughout rather than leaning to help the leg move.",
    "Switch sides and match the reps to keep both legs balanced."
  ],
  "Sumo squat hold": [
    "Take a wide stance with your toes turned out before lowering into the squat.",
    "Sink down until your thighs are parallel to the floor, then hold that position.",
    "Keep your knees tracking out over your toes throughout the hold.",
    "Keep your torso upright and chest tall rather than leaning forward.",
    "Hold a single dumbbell at your chest to add difficulty once the bodyweight hold feels easy.",
    "Breathe normally through the hold rather than holding your breath."
  ],
  "Cable standing hip abduction": [
    "Attach the ankle cuff to the leg closer to the tower and stand sideways to it.",
    "Start with that leg crossed slightly in front of your standing leg.",
    "Sweep the leg outward, away from your body, as far as comfortable.",
    "Hold the machine frame for balance rather than leaning your torso to help.",
    "This targets your outer hip (abductors), important for hip stability during walking and running.",
    "Switch sides and match the reps to keep both hips balanced."
  ],
  "Abductor leg raise side lying": [
    "Lie on your side with your legs stacked and straight.",
    "Lift your top leg straight up, keeping it in line with your body rather than swinging it forward.",
    "Keep your hips stacked vertically — don't let them roll backward as you lift.",
    "Lower with control rather than dropping the leg back down.",
    "This is a great equipment-free way to target the outer hip.",
    "Add an ankle weight once bodyweight reps feel too easy."
  ],
  "Clamshells": [
    "Lie on your side with your knees bent and stacked, feet together.",
    "Keep your feet touching throughout as you open your top knee upward like a hinge.",
    "Keep your hips stacked and still — rolling your hips back to fake extra range is the most common mistake.",
    "This targets the glute medius specifically, a muscle that's easy to neglect.",
    "Add a light resistance band around your thighs once bodyweight reps feel too easy.",
    "Move slowly and with control rather than snapping the knee open."
  ],
  "Bodyweight hip abduction": [
    "Stand tall, lightly holding a wall or chair for balance.",
    "Lift one leg straight out to the side, keeping it fully extended.",
    "Keep your torso upright throughout — don't lean away from the raised leg to cheat extra height.",
    "Lower with control rather than dropping the leg back down.",
    "Add a light ankle band once bodyweight reps feel too easy.",
    "This is a convenient option for hip stability work anywhere, no equipment required."
  ],
  "Dumbbell side bend": [
    "Hold a single dumbbell in one hand, letting it hang at your side.",
    "Bend directly sideways toward the dumbbell, keeping the motion in one plane — no twisting or leaning forward.",
    "Feel the stretch on the opposite side of your torso at the bottom of the bend.",
    "This targets your obliques on the working side.",
    "Keep your core braced throughout rather than letting your lower back do the work.",
    "Switch hands and match the reps to train both sides evenly."
  ],
  "Plate sit-up": [
    "Hold a single dumbbell or plate against your chest with both hands throughout the movement.",
    "Keep the weight clamped tight to your chest — letting it drift forward adds strain to your lower back.",
    "Curl your torso all the way up to a seated position, driven by your abs, not momentum.",
    "Keep your feet flat on the floor or anchored under something stable.",
    "Lower with control rather than dropping back down quickly.",
    "Only add weight once bodyweight sit-ups feel too easy to challenge you."
  ],
  "Cable wood chopper": [
    "Set the pulley high and stand sideways to the tower, gripping the handle with both hands near one shoulder.",
    "Rotate your torso and pull the handle diagonally down and across your body toward the opposite hip.",
    "Let your hips rotate along with your torso — this is a full rotational movement, not just an arm pull.",
    "Keep your arms relatively straight throughout; the power comes from your core rotating, not your arms pulling.",
    "Control the return to the starting position rather than letting the cable snap you back.",
    "Switch sides and match the reps to train rotation evenly in both directions."
  ],
  "Captains chair leg raise": [
    "Rest your forearms on the padded armrests and press your back into the pad.",
    "Raise your legs up in front of you, bending your knees toward your chest or keeping them straight for a harder version.",
    "Keep your torso still and braced against the pad throughout — don't swing to generate momentum.",
    "Lower with control rather than letting your legs drop.",
    "This is a great option if hanging leg raises are too hard on your grip.",
    "Curl your pelvis slightly at the top of each rep for a fuller ab contraction."
  ],
  "Hollow hold": [
    "Lie on your back, then lift your shoulders and legs off the floor at the same time.",
    "Extend your arms overhead and your legs straight, forming a shallow curved shape.",
    "Keep your lower back pressed into the floor throughout the hold — that's your main checkpoint.",
    "Lower your legs closer to the floor to make it harder, or bend your knees to make it easier.",
    "Breathe normally through the hold instead of holding your breath.",
    "This is a foundational gymnastics core position — track hold time rather than reps."
  ],
  "V-ups": [
    "Lie flat with your arms extended overhead and legs straight.",
    "Simultaneously fold your torso and legs upward, reaching your hands toward your toes.",
    "Keep both your arms and legs relatively straight throughout the fold.",
    "Only your hips should touch the floor at the top of the movement.",
    "Lower back down with control rather than dropping quickly.",
    "Bend your knees slightly to regress this if a full straight-leg V-up is too difficult at first."
  ],
  "Kettlebell swing": [
    "The swing is a hip hinge, not a squat: push your hips back and keep your shins nearly vertical.",
    "Snap your hips forward hard; your arms only guide the bell, they don't lift it.",
    "Let the kettlebell float to chest height on its own, then let it fall back.",
    "Keep your back flat and your eyes on a spot a few meters ahead on the floor.",
    "Squeeze your glutes and brace your abs at the top so you stand tall without leaning back.",
    "On the way down, wait until your arms touch your body before you hinge."
  ],
  "Kettlebell goblet squat": [
    "Hold the kettlebell by the horns, tight against your chest, elbows pointing down.",
    "Sit down between your hips and keep your chest tall.",
    "At the bottom your elbows should slide inside your knees.",
    "Keep your heels flat and push your knees out over your toes.",
    "Don't let the bell drift away from your chest; it pulls you forward.",
    "Push the floor away and breathe out as you stand."
  ],
  "Kettlebell Romanian deadlift": [
    "Push your hips straight back as if closing a door with them.",
    "Keep only a slight bend in your knees; this is a hinge, not a squat.",
    "Keep the kettlebell close to your legs the whole way down.",
    "Stop when you feel a strong stretch in your hamstrings or your back starts to round.",
    "Keep your shoulders pulled back and your back flat.",
    "Squeeze your glutes to stand; don't lean back at the top."
  ],
  "Kettlebell sumo deadlift": [
    "Take a wide stance with your toes turned out and the kettlebell between your feet.",
    "Push your knees out in line with your toes as you go down.",
    "Keep your chest up and your back flat; don't round to reach the handle.",
    "Push the floor apart with your feet to stand.",
    "Keep your arms straight like ropes; your legs and hips do the lifting.",
    "Lower under control and let the bell touch the floor softly each rep."
  ],
  "Kettlebell single-arm row": [
    "Rest your free forearm on your front thigh to support your lower back.",
    "Pull your elbow toward your hip, not straight up.",
    "Keep your shoulders level; don't twist your torso to lift the bell.",
    "Let your shoulder blade stretch forward at the bottom, then pull it back first.",
    "Pause for a moment with the kettlebell beside your lower ribs.",
    "Keep your back flat and your neck in line with your spine."
  ],
  "Kettlebell floor press": [
    "Let each bell rest on the back of your forearm with your wrist straight.",
    "Keep your elbows about 45 degrees from your sides, not flared straight out.",
    "Touch your upper arms to the floor softly; don't bounce off it.",
    "Press straight up until the bells are above your shoulders.",
    "Keep your shoulder blades pinched together on the floor.",
    "The floor stops your elbows early, which makes this easier on the shoulders."
  ],
  "Kettlebell single-arm press": [
    "Brace your abs so your torso doesn't roll toward the loaded side.",
    "Keep your free arm flat on the floor for balance.",
    "Let the bell rest on the back of your forearm with a straight wrist.",
    "Touch your upper arm to the floor softly on every rep.",
    "Press straight up until the bell is above your shoulder.",
    "Keep both shoulder blades and both hips on the floor."
  ],
  "Kettlebell upright row": [
    "Lead with your elbows; they stay higher than your hands the whole way.",
    "Keep the kettlebell close to your body as it travels up.",
    "Stop at chest height if pulling to the chin bothers your shoulders.",
    "Don't lean back or swing your hips to move the bell.",
    "Lower slowly; the way down builds the muscle too.",
    "Keep your shoulders away from your ears at the start of each rep."
  ],
  "Kettlebell curl": [
    "Hold the kettlebell by the sides of its handle with both hands.",
    "Pin your elbows to your sides; only your forearms move.",
    "Don't swing your hips or lean back to finish the rep.",
    "Squeeze your biceps hard at the top.",
    "Lower for a slow count of two or three.",
    "Straighten your arms fully at the bottom of every rep."
  ],
  "Kettlebell overhead tricep extension": [
    "Hold the kettlebell upside-down by the horns so the ball hangs behind your head.",
    "Keep your elbows pointing up and close to your ears.",
    "Only your forearms move; your upper arms stay still.",
    "Lower until you feel a deep stretch in your triceps.",
    "Keep your ribs down; don't arch your lower back.",
    "Straighten your arms fully at the top without slamming your elbows."
  ],
  "Kettlebell deadlift single": [
    "Stand with the kettlebell between your feet, handle in line with your ankles.",
    "Push your hips back first, then bend your knees to reach the handle.",
    "Keep your back flat from the first pull to the lockout.",
    "Push the floor away with your legs; don't yank with your arms.",
    "Stand tall at the top and squeeze your glutes without leaning back.",
    "Put the bell down the same way you picked it up: hips back, chest up."
  ],
  "Kettlebell suitcase deadlift": [
    "The kettlebell sits just outside one foot, like a suitcase you are about to pick up.",
    "Keep your shoulders and hips level; don't lean toward the weight.",
    "Brace your abs hard; resisting the side bend is the point of this lift.",
    "Keep your back flat and chest up as you reach down.",
    "Stand up by pushing through both feet evenly.",
    "Do the same number of reps on each side."
  ],
  "Kettlebell single-leg deadlift": [
    "Your torso and back leg move together like a seesaw.",
    "Keep your hips square to the floor; don't let the free hip open up.",
    "Keep a soft bend in the standing knee.",
    "Reach your back heel toward the wall behind you.",
    "Go only as low as you can with a flat back.",
    "Start light; balance limits this lift before strength does."
  ],
  "Kettlebell box squat": [
    "Reach back with your hips to find the box; don't just drop onto it.",
    "Sit lightly and stay tight; don't relax on the box.",
    "Keep your shins close to vertical.",
    "Hold the kettlebell tight to your chest so it doesn't pull you forward.",
    "Drive up through your heels without rocking forward.",
    "Use a lower box as your mobility improves."
  ],
  "Kettlebell front rack squat": [
    "Rack the bells with your fists under your chin and elbows tucked down.",
    "Keep your wrists straight and let each ball rest on your forearm and shoulder.",
    "Stay upright; the front load punishes leaning forward.",
    "Brace your abs before every rep, as if someone were about to poke your belly.",
    "Push your knees out and keep your heels down.",
    "Breathe in at the top, hold it on the way down, and breathe out as you stand."
  ],
  "Kettlebell cossack squat": [
    "Start with a stance much wider than a normal squat.",
    "Keep the heel of the bending leg flat on the floor.",
    "Let the toes of the straight leg point up to the ceiling.",
    "Hold the kettlebell at your chest as a counterweight; it helps you sit deeper.",
    "Go only as deep as your hips and ankles allow, and build depth over time.",
    "Keep your chest up and move slowly from side to side."
  ],
  "Kettlebell reverse lunge": [
    "Step back far enough that your front shin stays close to vertical.",
    "Keep most of your weight on the front foot; the back foot is for balance.",
    "Lower your back knee until it is just above the floor.",
    "Keep your torso upright and the kettlebell tight to your chest.",
    "Push through the front heel to stand.",
    "Stepping back is easier on the knees than stepping forward."
  ],
  "Kettlebell lateral lunge": [
    "Step out wide and sit your hips back over the bent knee.",
    "Keep the trailing leg straight with that foot flat on the floor.",
    "Keep both feet pointing forward.",
    "Keep your chest up; the kettlebell at your chest helps you balance.",
    "Push off the bent leg hard to come back to standing.",
    "You should feel a stretch along the inner thigh of the straight leg."
  ],
  "Kettlebell step-up": [
    "Place your whole foot on the box, heel included.",
    "Push through the top leg; don't jump off the floor with the bottom one.",
    "Lean forward slightly from the hips as you start the step.",
    "Stand fully tall on the box before coming down.",
    "Step down slowly; the lowering is half the exercise.",
    "Use a box that puts your thigh about parallel to the floor."
  ],
  "Kettlebell calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly; don't bounce out of the bottom.",
    "Keep your knees straight but not locked hard.",
    "Keep your weight over your big toes so your ankles don't roll outward.",
    "Stand on a plate or step if you want a deeper stretch at the bottom."
  ],
  "Kettlebell glute bridge": [
    "Rest the kettlebell on your lower belly and hold it steady with both hands.",
    "Push through your heels, not your toes.",
    "Squeeze your glutes at the top for a full second.",
    "Stop when your knees, hips and shoulders form a straight line; don't arch your lower back.",
    "Keep your ribs down and your chin slightly tucked.",
    "Move your feet closer to your hips if you feel it mostly in your hamstrings."
  ],
  "Kettlebell hip thrust": [
    "Set the bottom of your shoulder blades on the edge of the bench.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Your shins should be vertical at the top.",
    "Lock out with your glutes, not by arching your lower back.",
    "Hold the kettlebell on your hips so it doesn't roll.",
    "Pause for a second at the top of every rep."
  ],
  "Kettlebell bench press": [
    "Let each bell rest on the back of your forearm with a straight wrist.",
    "Pull your shoulder blades together and down before you start.",
    "Lower with your elbows about 45 degrees from your sides.",
    "Press up and slightly in so the bells finish above your shoulders.",
    "Keep your feet flat and your hips on the bench.",
    "The offset weight makes the bells wobble; start lighter than with dumbbells."
  ],
  "Kettlebell incline bench press": [
    "Set the bench to about 30 degrees; steeper turns it into a shoulder press.",
    "Keep your shoulder blades pinned back against the pad.",
    "Lower the bells to the sides of your upper chest.",
    "Press straight up, not forward toward your feet.",
    "Keep your wrists straight with each bell resting on your forearm.",
    "Don't let your lower back lift far off the pad."
  ],
  "Kettlebell floor fly": [
    "Keep a slight, fixed bend in your elbows the whole time.",
    "Open your arms in a wide arc as if hugging a big tree.",
    "Stop when your upper arms touch the floor lightly.",
    "Squeeze your chest to bring the bells back together.",
    "Go light; a fly is a stretch-and-squeeze move, not a heavy press.",
    "Keep your wrists straight so the bells stay on your forearms."
  ],
  "Kettlebell pullover": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Lower the bell behind your head until you feel a stretch in your lats and chest.",
    "Keep your ribs down; don't let your lower back arch off the bench.",
    "Pull with your lats, as if dragging your elbows toward your hips.",
    "Stop the bell above your chest, not above your belly.",
    "Grip the horns firmly; the bell passes over your face."
  ],
  "Kettlebell seated overhead press": [
    "Sit tall with your feet flat and your abs braced.",
    "Start from the rack with your elbows tucked, not flared wide.",
    "Press until your arms are straight and your biceps are beside your ears.",
    "Don't lean back as the bells go up.",
    "Keep your wrists straight under the weight.",
    "Lower all the way back to the rack on every rep."
  ],
  "Kettlebell push press": [
    "Dip straight down a few centimeters; keep your torso upright and heels flat.",
    "Drive up fast with your legs and let that push start the bells moving.",
    "Finish the press with your arms once the bells pass your forehead.",
    "Lock out with your biceps beside your ears.",
    "Catch the bells back in the rack with soft knees.",
    "The dip is short and quick, not a squat."
  ],
  "Kettlebell Z press": [
    "Sit tall on the floor with your legs straight; don't lean back.",
    "Spread your legs a little for a wider base.",
    "Brace your abs hard; with no back support your core does the stabilizing.",
    "Press straight up and finish with your arms beside your ears.",
    "Use much less weight than you press standing.",
    "Bend your knees slightly if tight hamstrings round your lower back."
  ],
  "Kettlebell front raise": [
    "Raise with straight arms to shoulder height and no higher.",
    "Don't lean back or swing; if you have to, the bell is too heavy.",
    "Keep your shoulders down, away from your ears.",
    "Lower for a slow count of three.",
    "Brace your abs so your lower back doesn't arch.",
    "Let the bell hang below your hands; don't try to tilt it up."
  ],
  "Kettlebell single-arm floor press": [
    "Brace your abs so your torso doesn't roll toward the loaded side.",
    "Keep your free arm flat on the floor for balance.",
    "Let the bell rest on the back of your forearm with a straight wrist.",
    "Touch your upper arm to the floor softly on every rep.",
    "Press straight up until the bell is above your shoulder.",
    "Keep both shoulder blades and both hips on the floor."
  ],
  "Kettlebell single-arm chest press": [
    "Plant both feet hard; the single weight tries to tip you off the bench.",
    "Keep your hips and shoulders square to the ceiling.",
    "Lower the bell to the side of your chest, elbow about 45 degrees out.",
    "Press up until your arm is vertical above your chest.",
    "Rest your free hand on your stomach to feel your abs working.",
    "Start lighter than your two-arm press."
  ],
  "Kettlebell pec fly": [
    "Keep the same slight bend in your elbows from start to finish.",
    "Lower until your arms are level with the bench and your chest is stretched.",
    "Don't go deeper than your shoulders allow comfortably.",
    "Bring the bells together in an arc, as if hugging a barrel.",
    "Keep your shoulder blades pinched and your chest high.",
    "Use light bells; control matters more than load here."
  ],
  "Kettlebell single-arm lateral raise": [
    "Lead with your elbow, not your hand.",
    "Stop at shoulder height; higher shifts the work to your traps.",
    "Keep your shoulders level; don't lean away from the working arm.",
    "Keep a slight bend in your elbow.",
    "Lower slowly for a count of three.",
    "Use your lightest kettlebell; this is a small muscle."
  ],
  "Kettlebell shrug": [
    "Lift your shoulders straight up toward your ears; don't roll them.",
    "Keep your arms straight; your elbows don't bend.",
    "Hold the top for a full second.",
    "Keep your head level; don't push your chin forward.",
    "Lower slowly and let your traps stretch at the bottom.",
    "Use straps or a lighter bell if your grip gives out first."
  ],
  "Kettlebell row": [
    "Hinge to about 45 degrees and hold that angle; don't stand up as you pull.",
    "Pull your elbows back toward your hips.",
    "Squeeze your shoulder blades together at the top.",
    "Keep your back flat and your abs braced.",
    "Don't jerk the bells up with your lower back.",
    "Let your arms hang fully straight between reps."
  ],
  "Kettlebell gorilla row": [
    "Push the resting bell into the floor while you row the other one.",
    "Keep your hips and shoulders square; don't twist as you pull.",
    "Keep your back flat and your torso close to parallel with the floor.",
    "Pull your elbow toward your hip, close to your body.",
    "Set each bell down fully before rowing the other side.",
    "Take a wide stance so the bells fit between your feet."
  ],
  "Kettlebell rear delt row": [
    "Flare your elbows out wide, level with your shoulders.",
    "Pull the bell toward your chest, not your belly.",
    "Think about pulling your elbows apart, not lifting the bell.",
    "Keep your torso angle fixed for the whole set.",
    "Pause at the top and feel the back of your shoulders.",
    "Go lighter than a normal row; the rear delts are small."
  ],
  "Kettlebell single-arm rear delt fly": [
    "Brace your free hand on your thigh to take load off your lower back.",
    "Sweep your arm out to the side, not back toward your hip.",
    "Keep a slight, fixed bend in your elbow.",
    "Stop when your arm is level with your shoulder.",
    "Don't rotate your torso to get the bell higher.",
    "Use a very light bell and slow reps."
  ],
  "Kettlebell drag curl": [
    "Drag the bell up your body; it should touch your torso the whole way.",
    "Pull your elbows straight back behind you as the bell rises.",
    "Keep your shoulders down; don't shrug.",
    "Stop at your lower chest and squeeze your biceps.",
    "Stand tall without leaning back.",
    "Lower along the same path, still touching your body."
  ],
  "Kettlebell concentration curl": [
    "Brace the back of your upper arm against your inner thigh and keep it there.",
    "Only your forearm moves; your shoulder stays still.",
    "Curl toward your chest and squeeze hard at the top.",
    "Lower until your arm is fully straight.",
    "Don't lean back to help the bell up.",
    "Turn your little finger up slightly at the top for a stronger squeeze."
  ],
  "Kettlebell preacher curl": [
    "Keep the backs of your upper arms flat on the pad the whole time.",
    "Don't fully lock your elbows at the bottom; stop just short.",
    "Lower slowly; the stretched position is where this lift is hardest.",
    "Don't lift your elbows off the pad to finish the curl.",
    "Keep your wrists straight.",
    "Start light; the pad removes all momentum."
  ],
  "Kettlebell reverse curl": [
    "Grip the handle overhand, knuckles facing forward.",
    "Keep your wrists straight; don't let them bend back at the top.",
    "Pin your elbows to your sides.",
    "Expect to use less weight than a normal curl.",
    "Lower slowly to work the top of your forearms.",
    "Keep your thumbs wrapped around the handle."
  ],
  "Kettlebell goblet curl": [
    "Stay in the deep squat for the whole set.",
    "Rest your elbows on the insides of your knees and keep them there.",
    "Keep your heels flat and your chest up.",
    "Curl without rocking your body.",
    "Lower until your arms are fully extended between your knees.",
    "If you can't hold the squat, raise your heels on a plate."
  ],
  "Kettlebell skull crusher": [
    "Keep your elbows pointing at the ceiling; don't let them flare out.",
    "Only your forearms move.",
    "Lower the bell just behind the top of your head for a deeper stretch.",
    "Grip the horns firmly; the bell passes over your face.",
    "Straighten your arms without locking out hard.",
    "Lower slowly for a count of three."
  ],
  "Kettlebell Tate press": [
    "Flare your elbows straight out to the sides and keep them high.",
    "Lower the bells inward toward the middle of your chest.",
    "Your upper arms stay still; only your forearms fold in.",
    "Touch your chest lightly; don't rest the weight there.",
    "Press back up by straightening your elbows, not by moving your shoulders.",
    "Go light; this puts a lot of load on the elbows."
  ],
  "Kettlebell wrist curl": [
    "Keep your forearm flat on your thigh; only your wrist moves.",
    "Hold your forearm down with your free hand.",
    "Let the bell roll down toward your fingertips for a longer range.",
    "Curl your wrist up as high as it goes and squeeze.",
    "Use slow reps; forearms respond to control.",
    "Use your lightest kettlebell."
  ],
  "Kettlebell wrist extension": [
    "Palm faces down; your knuckles lift toward the ceiling.",
    "Keep your forearm pressed onto your thigh.",
    "This muscle is weak; use the lightest bell you have.",
    "Lift as high as your wrist allows and pause.",
    "Lower slowly until your knuckles point at the floor.",
    "Keep your grip firm so the handle doesn't slip."
  ],
  "Kettlebell farmers carry": [
    "Stand tall with your shoulders back and down.",
    "Take short, quick steps; don't let the bells swing.",
    "Squeeze the handles as hard as you can.",
    "Keep your abs braced and your ribs down.",
    "Look straight ahead, not at the floor.",
    "Count each step as a rep, or walk a set distance."
  ],
  "Kettlebell Russian twist": [
    "Rotate your shoulders and ribs, not just your arms.",
    "Keep your back straight as you lean back; don't slump.",
    "Move the bell from hip to hip under control.",
    "Keep your heels lightly on the floor until you are strong enough to lift them.",
    "Breathe out on each twist.",
    "Follow the bell with your eyes to help your torso turn."
  ],
  "Kettlebell sit-up": [
    "Hold the kettlebell tight to your chest so it doesn't pull on your neck.",
    "Curl up one vertebra at a time; don't jerk.",
    "Keep your feet flat; hook them under something only if they lift.",
    "Breathe out as you sit up.",
    "Lower slowly; don't drop back onto the floor.",
    "Keep your chin slightly tucked."
  ],
  "Kettlebell windmill": [
    "Keep your eyes on the kettlebell the whole time.",
    "Push your hip out toward the side of the raised arm.",
    "Keep the overhead arm locked and vertical.",
    "Slide your free hand down the inside of your front leg.",
    "Go only as low as you can with a straight back leg and a long spine.",
    "Learn it without weight first, then with a light bell."
  ],
  "Kettlebell wood chopper": [
    "Rotate through your hips and torso; your arms only carry the bell.",
    "Pivot your back foot so your knee and hip can turn.",
    "Keep your arms nearly straight the whole way.",
    "Move in a smooth diagonal from outside the knee to above the opposite shoulder.",
    "Control the way down; don't let the bell pull you.",
    "Keep your back flat when you reach low."
  ],
  "Kettlebell hollow hold": [
    "Press your lower back into the floor; that is the whole exercise.",
    "If your lower back lifts, raise your legs higher or bend your knees.",
    "Keep your arms straight beside your ears.",
    "Keep your chin slightly tucked.",
    "Breathe in short, steady breaths while you hold.",
    "Master the bodyweight hollow hold before adding the bell."
  ],
  "Kettlebell thruster": [
    "Squat and press are one movement: use the drive out of the squat to launch the bells.",
    "Keep the bells racked and your elbows tucked while you squat.",
    "Stay upright; don't let your elbows drop onto your knees.",
    "Start pressing as your hips finish extending.",
    "Lock out overhead with your biceps beside your ears.",
    "Lower the bells to the rack as you drop into the next squat."
  ],
  "Kettlebell clean and press": [
    "The clean comes from your hips; the bells should feel weightless on the way up.",
    "Keep the bells close and let them roll around your wrists; don't let them flip and bang your forearms.",
    "Catch in the rack with your elbows tucked and wrists straight.",
    "Pause in the rack before you press.",
    "Press to a full lockout with your glutes and abs tight.",
    "Lower to the rack first, then swing the bells back down between your legs."
  ],
  "Kettlebell single-arm swing": [
    "Keep your shoulders square; don't let the bell twist you.",
    "Let your free arm swing alongside for balance.",
    "Power comes from the hip snap, exactly like the two-hand swing.",
    "Keep the working shoulder packed down, away from your ear.",
    "Let the bell float to chest height and no higher.",
    "Switch hands every set, or every few reps once you are confident."
  ],
  "Kettlebell single-arm snatch": [
    "Drive with your hips, then pull the bell up close to your body with a high elbow.",
    "Punch your hand up through the handle at the top so the bell rolls softly onto your forearm.",
    "Don't let the bell flip over and slam your wrist.",
    "Lock your arm out overhead with your biceps beside your ear.",
    "Bring the bell down close to your body, not in a wide arc.",
    "Own the swing and the clean before learning this."
  ],
  "Kettlebell goblet good morning": [
    "Push your hips straight back; your knees bend only slightly.",
    "Keep the kettlebell tight against your upper chest.",
    "Keep your back flat from your hips to your head.",
    "Stop when your hamstrings are fully stretched, even if you are not parallel yet.",
    "Squeeze your glutes to stand up.",
    "Start light; this loads the lower back more than a deadlift."
  ],
  "Kettlebell staggered deadlift": [
    "Keep about 80% of your weight on the front leg; the back toes are a kickstand.",
    "Push your hips straight back, not down.",
    "Keep your hips square; don't let the back hip open.",
    "Lower the bells along the front leg with a flat back.",
    "Feel the front hamstring stretch, then squeeze that glute to stand.",
    "Do the same number of reps on each side."
  ],
  "Kettlebell bottoms-up overhead press": [
    "Crush the handles; a tight grip is what keeps the bells balanced.",
    "Keep each ball directly above its fist the whole way up.",
    "Keep your forearms vertical and your wrists straight.",
    "Press slowly; speed makes the bells tip.",
    "Use far less weight than a normal press.",
    "If a bell tips, let it fall away from you and reset; don't fight it over your head."
  ],
  "Kettlebell bottoms-up single-arm overhead press": [
    "Squeeze the handle as hard as you can before you press.",
    "Make a fist with your free hand too; it helps your whole body tighten.",
    "Keep your forearm vertical under the bell.",
    "Watch the bell as it goes up.",
    "Press slowly and stop if it starts to wobble.",
    "A great drill for learning a straight, stacked press."
  ],
  "Kettlebell kneeling bottoms-up overhead press": [
    "Press with the arm on the same side as the knee that is down.",
    "Squeeze the glute of the down leg to lock your hips in place.",
    "Stay tall; don't lean back or to the side.",
    "Grip the handle hard and keep the ball above your fist.",
    "Keep your front knee over your ankle.",
    "Put a pad under your knee if the floor is hard."
  ],
  "Kettlebell single-arm Z press": [
    "Sit tall and resist leaning away from the working arm.",
    "Rest your free hand on your thigh; don't prop yourself on the floor.",
    "Brace your abs before each press.",
    "Press straight up to a full lockout beside your ear.",
    "Use less weight than your standing single-arm overhead press.",
    "Bend your knees slightly if your lower back rounds."
  ],
  "Kettlebell alternating Z press": [
    "Keep the resting bell tight in the rack while the other one goes up.",
    "Don't rock from side to side as you switch arms.",
    "Sit tall with your abs braced.",
    "Lock out each press fully before lowering.",
    "Lower one bell completely before pressing the other.",
    "Count one press per arm as one rep."
  ],
  "Kettlebell single-arm push press": [
    "Dip straight down with your torso upright; don't lean forward.",
    "Explode up with your legs and let the bell ride that push.",
    "Finish with your arm locked and your biceps beside your ear.",
    "Keep your free arm out to the side for balance.",
    "Catch the bell in the rack with soft knees on the way down.",
    "Keep the dip short and fast."
  ],
  "Kettlebell long-lever lateral raise": [
    "Point the ball away from your body so it sticks out past your fist, in line with your arm.",
    "The longer lever makes a light bell feel heavy; go lighter than a normal raise.",
    "Keep your wrist firm so the bell doesn't droop.",
    "Raise to shoulder height and no higher.",
    "Keep your shoulders level with your free hand on your hip.",
    "Lower slowly; don't let the bell drop."
  ],
  "Kettlebell incline shrug": [
    "Keep your chest on the pad; don't lift it to help.",
    "Pull your shoulder blades back and together, not just up toward your ears.",
    "Keep your arms straight; this is not a row.",
    "Hold the squeeze for a second.",
    "Let your shoulder blades spread fully at the bottom.",
    "This angle hits the middle and lower traps."
  ],
  "Kettlebell shrug single": [
    "Hold one bell with both hands in front of your thighs.",
    "Shrug straight up; don't roll your shoulders.",
    "Keep your arms straight and relaxed, like hooks.",
    "Pause for a second at the top.",
    "Keep your chin level and your neck long.",
    "Lower all the way for a full stretch."
  ],
  "Kettlebell silverback shrug": [
    "Lean forward about 30 degrees and hold that angle.",
    "Pull your shoulder blades back and up, like a shrug and a row combined.",
    "Keep your arms straight.",
    "Keep your back flat and your abs braced.",
    "Squeeze for a second at the top.",
    "Let your shoulders drop forward fully at the bottom."
  ],
  "Kettlebell upright row single": [
    "Lead with your elbow; it finishes higher than your hand.",
    "Keep the bell close to your body.",
    "Stop at chest height; you don't need to pull to your chin.",
    "Keep your shoulders level; don't hike the working side.",
    "Keep your free hand on your hip so you don't twist.",
    "Lower slowly to a straight arm."
  ],
  "Kettlebell single-arm Pendlay row": [
    "Every rep starts from a dead stop on the floor.",
    "Keep your torso close to parallel with the floor.",
    "Pull hard and fast, then lower under control.",
    "Rest your free hand on your knee for support.",
    "Don't lift your chest to help the bell up.",
    "Let the bell settle fully before the next rep."
  ],
  "Kettlebell single-arm row on bench": [
    "Keep your back flat like a table from hips to shoulders.",
    "Pull your elbow toward your hip in a slight arc.",
    "Don't rotate your chest open at the top.",
    "Let your shoulder blade stretch forward at the bottom.",
    "Keep your supporting arm straight and strong.",
    "Squeeze for a moment with the bell beside your ribs."
  ],
  "Kettlebell alternating row": [
    "Hold your torso angle; don't bob up and down between sides.",
    "Keep your shoulders square as you pull each side.",
    "Keep the resting arm fully straight.",
    "Pull your elbow back toward your hip.",
    "Brace your abs to resist twisting.",
    "Count one pull per arm as one rep."
  ],
  "Kettlebell row single": [
    "Grip one bell with both hands and pull it to your stomach.",
    "Keep your elbows close to your sides as they travel back.",
    "Hold a flat back and a fixed torso angle.",
    "Squeeze your shoulder blades together at the top.",
    "Don't stand up to finish the pull.",
    "Lower until your arms are fully straight."
  ],
  "Kettlebell rear delt row double": [
    "Flare both elbows out wide, level with your shoulders.",
    "Pull toward your chest, not your hips.",
    "Think of spreading your elbows apart.",
    "Keep your torso angle fixed.",
    "Pause at the top and squeeze the back of your shoulders.",
    "Use lighter bells than for a normal row."
  ],
  "Kettlebell single-arm rear delt row": [
    "Brace your free hand on your thigh.",
    "Flare your elbow out to the side, level with your shoulder.",
    "Pull the bell beside your chest, not your waist.",
    "Keep your chest facing the floor; don't twist open.",
    "Pause at the top.",
    "Use a light bell and slow reps."
  ],
  "Kettlebell single-arm curl": [
    "Pin your elbow to your side.",
    "The bell hangs below your hand, so it pulls hardest at the top; squeeze there.",
    "Keep your wrist straight; don't let the bell bend it back.",
    "Don't lean or twist to lift the bell.",
    "Lower slowly to a straight arm.",
    "Do the same reps on both sides, weaker arm first."
  ],
  "Kettlebell single-arm reverse curl": [
    "Grip overhand with your knuckles facing forward.",
    "Keep your wrist straight and firm the whole way.",
    "Pin your elbow to your side.",
    "Use much less weight than a regular curl.",
    "Lower slowly; the forearm works hardest on the way down.",
    "Wrap your thumb around the handle."
  ],
  "Kettlebell decline skull crusher": [
    "Hook your shins firmly under the pads before you pick up the bell.",
    "The decline keeps tension on your triceps at the top.",
    "Keep your elbows pointing up and close together.",
    "Lower the bell just behind the top of your head.",
    "Grip the horns tightly; the bell is above your face.",
    "Hand the bell off or set it on your chest before sitting up."
  ],
  "Kettlebell Larsen press": [
    "Keep your legs straight and off the floor for the whole set.",
    "With no leg drive, your upper body and core do all the work; use less weight.",
    "Squeeze your glutes and abs to stay steady on the bench.",
    "Keep your shoulder blades pinched back.",
    "Lower slowly so the bells don't rock you.",
    "Bend your knees and put your feet down before you set the bells aside."
  ],
  "Kettlebell single-arm Larsen press": [
    "One bell and no feet on the floor: your core has to stop you rolling off.",
    "Start very light until you can stay centered.",
    "Keep your hips level and your legs together.",
    "Rest your free hand on your stomach.",
    "Press slowly and straight up.",
    "Stop the set if you start to tip."
  ],
  "Kettlebell guillotine bench press": [
    "Flare your elbows straight out to the sides, in line with your shoulders.",
    "Lower the bells toward your collarbones, not your lower chest.",
    "Use much less weight than a normal press; this position is hard on the shoulders.",
    "Stop lowering as soon as you feel a strong stretch across your upper chest.",
    "Move slowly and never bounce.",
    "Skip this one if your shoulders complain."
  ],
  "Kettlebell high incline bench press": [
    "At 60 degrees this works your front shoulders and upper chest together.",
    "Keep your back and head against the pad.",
    "Lower the bells to the sides of your upper chest.",
    "Press up and slightly back so the bells finish above your shoulders.",
    "Keep your elbows a little in front of your body, not flared straight out.",
    "Keep your wrists straight with each bell on your forearm."
  ],
  "Kettlebell single-arm incline chest press": [
    "Keep both shoulder blades on the pad; don't roll toward the working arm.",
    "Plant your feet wide for balance.",
    "Lower the bell to the side of your upper chest.",
    "Press straight up above your shoulder.",
    "Rest your free hand on your stomach.",
    "Start with your weaker side."
  ],
  "Kettlebell single-arm floor fly": [
    "Keep your free arm on the floor to stop your body rolling.",
    "Keep a slight, fixed bend in the working elbow.",
    "Open your arm slowly until your upper arm touches the floor.",
    "Squeeze your chest to bring the bell back up.",
    "Keep both shoulders on the floor.",
    "Use a light bell."
  ],
  "Kettlebell single-arm chest fly": [
    "Plant your feet wide; the single bell tries to roll you off the bench.",
    "Keep a slight bend in your elbow that doesn't change.",
    "Lower until your arm is level with the bench, no deeper.",
    "Bring the bell back in a wide arc above your chest.",
    "Keep your hips and shoulders square.",
    "Go lighter than your two-arm fly."
  ],
  "Kettlebell single-arm pullover": [
    "Keep a slight bend in your elbow and hold it.",
    "Lower only as far as your shoulder moves comfortably.",
    "Keep your ribs down so your lower back stays on the bench.",
    "Pull with your lat, as if dragging your elbow toward your hip.",
    "Grip the handle firmly; the bell passes over your face.",
    "Use a light bell and a slow tempo."
  ],
  "Kettlebell bench wrist curl": [
    "Keep both forearms flat on the bench; only your wrists move.",
    "Let your wrists hang just past the edge of the bench.",
    "Lower the bell as far as your wrists allow, then curl up high.",
    "Squeeze for a second at the top.",
    "Don't let your elbows lift off the bench.",
    "Use slow, full reps."
  ],
  "Kettlebell bench wrist extension": [
    "Palms face down; lift your knuckles toward the ceiling.",
    "Keep your forearms pressed flat on the bench.",
    "Use a lighter bell than for the wrist curl.",
    "Pause at the top of each rep.",
    "Lower slowly until your knuckles point at the floor.",
    "Grip firmly so the handle doesn't roll out of your fingers."
  ],
  "Kettlebell alternating curtsy lunge": [
    "Step back and across, as if doing a curtsy.",
    "Keep your hips and chest facing forward; don't twist.",
    "Keep your front knee tracking over your toes.",
    "Hold the kettlebell tight to your chest.",
    "Lower until your back knee is just above the floor.",
    "Push through the front heel to return."
  ],
  "Kettlebell alternating forward lunge": [
    "Take a long enough step that your front knee stays over your ankle.",
    "Lower straight down; don't let your torso tip forward.",
    "Push off the front foot hard to return.",
    "Keep the bells still at your sides.",
    "Keep your feet hip-width apart, as if on train tracks, for balance.",
    "Alternate legs every rep."
  ],
  "Kettlebell alternating lateral lunge": [
    "Step wide and sit your hips back over the bent knee.",
    "Keep the other leg straight with its foot flat.",
    "Push back to the middle with one strong drive.",
    "Keep both feet pointing forward.",
    "Keep your chest up and the bell at your chest.",
    "Alternate sides every rep."
  ],
  "Kettlebell alternating reverse lunge": [
    "Step straight back, not behind your other foot.",
    "Keep your weight on the front foot.",
    "Lower until the back knee is just above the floor.",
    "Keep your torso upright and the bells at your sides.",
    "Drive through the front heel to stand.",
    "Alternate legs every rep."
  ],
  "Kettlebell alternating single-arm thruster": [
    "Squat with both bells racked, then press one arm as you stand.",
    "Keep the other bell tight in the rack.",
    "Use the drive out of the squat to start the press.",
    "Stay upright in the squat with your elbows tucked.",
    "Switch the pressing arm every rep.",
    "Brace your abs so you don't lean away from the pressing side."
  ],
  "Kettlebell alternating swing": [
    "Switch hands at the top, when the bell is weightless.",
    "Keep your eyes on the handle as you change hands.",
    "Hinge and snap your hips exactly like a normal swing.",
    "Keep the bell at chest height for the switch, not higher.",
    "Keep your shoulders square to the front.",
    "Master the single arm swing first."
  ],
  "Kettlebell assisted Bulgarian split squat": [
    "Hold the support lightly; it is for balance, not for pulling yourself up.",
    "Keep most of your weight on the front leg.",
    "Stand far enough from the bench that your front shin stays near vertical.",
    "Lower straight down until your front thigh is parallel to the floor.",
    "Keep your torso upright or leaning slightly forward.",
    "Push through the whole front foot to stand."
  ],
  "Kettlebell chest press single": [
    "Hold one bell by the horns with both hands above your chest.",
    "Keep your elbows tucked close to your ribs.",
    "Squeeze your hands toward each other on the handle to fire up your chest.",
    "Lower until the bell is just above your chest.",
    "Press straight up to full arm extension.",
    "A good option when you only have one kettlebell."
  ],
  "Kettlebell clean and jerk": [
    "Clean the bells to the rack with your hips, not your arms.",
    "For the jerk, dip, drive, then drop under the bells and catch them with straight arms.",
    "The second dip is what separates a jerk from a push press.",
    "Stand up fully with the bells locked out before lowering.",
    "Keep your heels down during both dips.",
    "Learn the clean and the push press separately first."
  ],
  "Kettlebell conventional deadlift double": [
    "Set one bell just outside each foot, handles in line with your ankles.",
    "Push your hips back and keep your chest up as you reach down.",
    "Keep your back flat from start to finish.",
    "Push the floor away with your legs.",
    "Stand tall at the top with the bells at your sides.",
    "Lower both bells to the floor at the same time."
  ],
  "Kettlebell deficit reverse lunge": [
    "Standing on a low platform lets your back knee travel lower for a deeper stretch.",
    "Keep your front foot flat on the platform, heel down.",
    "Step back and down under control; don't drop.",
    "Keep your torso upright with the bell at your chest.",
    "Drive through the front heel to climb back up.",
    "Start with a platform only a few centimeters high."
  ],
  "Kettlebell farmers march": [
    "March in place, lifting each knee to hip height.",
    "Stay tall; don't lean back as your knee comes up.",
    "Keep the bells still at your sides.",
    "Pause for a moment on one leg at the top of each step.",
    "Keep your shoulders level.",
    "Count each knee lift as one rep."
  ],
  "Kettlebell figure-four hip thrust": [
    "Cross one ankle over the opposite knee; the planted leg does the work.",
    "Keep your hips level; don't let the crossed side drop.",
    "Push through the heel of the planted foot.",
    "Squeeze the working glute hard at the top.",
    "Keep your chin tucked and your ribs down.",
    "Start with bodyweight before adding the bell."
  ],
  "Kettlebell forward lunge double": [
    "Step far enough that your front knee stays over your ankle.",
    "Lower straight down with your torso upright.",
    "Keep the bells hanging still at your sides.",
    "Push hard off the front foot to return in one step.",
    "Keep your front heel down.",
    "Finish all reps on one leg before switching."
  ],
  "Kettlebell front rack cossack squat": [
    "Keep both bells racked tight with your elbows tucked.",
    "Sit deep over one foot with that heel flat.",
    "Let the toes of the straight leg point up.",
    "Stay as upright as you can; the racked bells punish a forward lean.",
    "Move slowly from side to side.",
    "Master the goblet version first."
  ],
  "Kettlebell front rack curtsy lunge double": [
    "Keep the bells racked and your elbows tucked the whole time.",
    "Step back and across behind your front leg.",
    "Keep your hips and chest square to the front.",
    "Lower until your back knee is just above the floor.",
    "Stay tall; don't fold forward under the bells.",
    "Push through the front heel to stand."
  ],
  "Kettlebell front rack deficit reverse lunge": [
    "The platform adds depth; the racked bells add a core challenge.",
    "Keep your elbows tucked and your chest up.",
    "Step back and down with control.",
    "Keep your front heel flat on the platform.",
    "Drive through the front leg to climb back up.",
    "Use lighter bells than for a floor-level lunge."
  ],
  "Kettlebell front rack forward lunge double": [
    "Keep the bells racked with your wrists straight.",
    "Stay upright as you step; don't let the bells pull you forward.",
    "Land softly and lower straight down.",
    "Push hard off the front foot to return.",
    "Brace your abs before each step.",
    "Keep your front knee in line with your toes."
  ],
  "Kettlebell front rack lateral lunge double": [
    "Keep both bells racked and your chest up.",
    "Step wide and sit your hips back.",
    "Keep the trailing leg straight with its foot flat.",
    "Don't let your elbows drop onto your thigh.",
    "Push off the bent leg to return.",
    "Keep both feet pointing forward."
  ],
  "Kettlebell front rack reverse lunge double": [
    "Keep the bells racked tight against your chest and shoulders.",
    "Step straight back and lower under control.",
    "Keep your torso upright; brace your abs against the front load.",
    "Keep your weight on the front foot.",
    "Push through the front heel to stand.",
    "Breathe in at the top and hold it on the way down."
  ],
  "Kettlebell front rack single-arm lateral lunge": [
    "Rack one bell and keep your shoulders level against the uneven load.",
    "Step wide and sit your hips back over the bent knee.",
    "Keep the straight leg's foot flat on the floor.",
    "Keep your racked elbow tucked.",
    "Push off the bent leg to return to standing.",
    "Do both directions with the bell on each side over time."
  ],
  "Kettlebell front rack step-up": [
    "Keep both bells racked and your torso tall.",
    "Put your whole foot on the box.",
    "Push through the top leg; don't bounce off the bottom foot.",
    "Stand fully upright on the box before stepping down.",
    "Step down slowly.",
    "Use a lower box until your balance is solid."
  ],
  "Kettlebell front rack step-up knee drive": [
    "Finish each rep on one leg with the other knee at hip height.",
    "Hold the top for a moment to prove your balance.",
    "Keep the bells racked and your torso tall.",
    "Push through the whole foot on the box.",
    "Lower the free leg back to the floor slowly.",
    "Squeeze the glute of the standing leg at the top."
  ],
  "Kettlebell full swing": [
    "Your hips still do the work; your arms only guide the bell overhead.",
    "Finish with your arms beside your ears and your ribs down, not leaning back.",
    "Use a lighter bell than for a chest-height swing.",
    "Keep a firm grip; the bell is above your head.",
    "Let the bell fall back down the same arc and hinge late.",
    "Stick to chest-height swings if your shoulders can't reach overhead comfortably."
  ],
  "Kettlebell goblet calf raise": [
    "Hold the bell tight to your chest so it doesn't pull you forward.",
    "Rise straight up onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly until your heels touch the floor.",
    "Keep your knees straight.",
    "Stand near a wall if you lose balance."
  ],
  "Kettlebell goblet cossack squat": [
    "Hold the bell by the horns at your chest as a counterweight.",
    "Sit deep over one foot with that heel flat on the floor.",
    "Keep the other leg straight, toes pointing up.",
    "Keep your chest up and your back long.",
    "Move slowly; pause at the bottom of each side.",
    "Reduce the depth if your heel lifts."
  ],
  "Kettlebell half-kneeling goblet Romanian deadlift": [
    "Push your hips back toward your rear heel; the movement is all at the hips.",
    "Keep your back flat as your torso tilts forward.",
    "Keep the front shin vertical.",
    "Hold the bell tight to your chest.",
    "Squeeze the glute of the kneeling leg to come back up tall.",
    "A good drill for learning the hinge without balance problems."
  ],
  "Kettlebell half-kneeling Romanian deadlift": [
    "Hinge at the hips; don't round your back to reach the floor.",
    "Let the bells travel down on either side of your front foot.",
    "Keep your arms long and relaxed.",
    "Push your hips back toward your rear heel.",
    "Keep the front shin vertical.",
    "Squeeze your glutes to return to tall kneeling."
  ],
  "Kettlebell hang clean and jerk": [
    "Start each rep from the hang, bells just above your knees; they never touch the floor.",
    "Use a short, sharp hip drive to clean the bells to the rack.",
    "Settle in the rack before the jerk.",
    "Dip, drive, then drop under and catch with straight arms.",
    "Stand up fully before lowering.",
    "Lower to the rack, then back to the hang."
  ],
  "Kettlebell hang clean and press": [
    "Start from the hang with the bells just above your knees.",
    "Clean with a quick hip snap and keep the bells close to your body.",
    "Catch softly in the rack with your wrists straight.",
    "Press without using your legs; this is a strict press.",
    "Lock out with your biceps beside your ears.",
    "Return to the rack, then to the hang, under control."
  ],
  "Kettlebell hang squat clean and jerk": [
    "From the hang, pull the bells up and drop into a full squat to catch them in the rack.",
    "Keep your elbows tucked and chest up at the bottom of the squat.",
    "Stand up out of the squat before you start the jerk.",
    "Dip, drive and punch the bells overhead.",
    "Keep your heels down in the squat and in the dip.",
    "This is an advanced lift; learn each part separately first."
  ],
  "Kettlebell heels-up goblet squat": [
    "Raising your heels lets your knees travel forward and puts more work on your quads.",
    "Stay upright; let your knees move over your toes.",
    "Keep your heels pressed on the wedge.",
    "Squat as deep as you can with a tall chest.",
    "Hold the bell tight to your chest.",
    "Drive up through the middle of your feet."
  ],
  "Kettlebell incline guillotine bench press": [
    "Flare your elbows straight out, in line with your shoulders.",
    "Lower the bells toward your collarbones and neck.",
    "Use very light bells; this is a demanding shoulder position.",
    "Stop as soon as you feel a strong upper-chest stretch.",
    "Lower slowly and never bounce.",
    "Skip it if you have any shoulder pain."
  ],
  "Kettlebell lateral lunge single": [
    "Hold one bell with both hands and let it hang between your legs.",
    "Sit your hips back as you step out; the bell lowers toward the floor.",
    "Keep your back flat; don't round to reach lower.",
    "Keep the straight leg's foot flat.",
    "Push off the bent leg and stand tall.",
    "Keep both feet pointing forward."
  ],
  "Kettlebell seated calf raise": [
    "Rest the bell on your thigh just above the knee and hold it steady.",
    "Put the balls of your feet on a plate so your heels can drop.",
    "Let your heels sink for a full stretch, then rise as high as you can.",
    "Pause for a second at the top.",
    "Bent knees shift the work to the deeper calf muscle, the soleus.",
    "Switch the bell to the other thigh for the next set."
  ],
  "Kettlebell seated calf raise double": [
    "Rest one bell on each thigh just above the knees.",
    "Hold the handles so the bells stay upright.",
    "Drop your heels for a full stretch at the bottom.",
    "Rise as high as possible and pause.",
    "Keep the reps slow; calves respond to time under tension.",
    "Keep your torso upright; don't lean on the bells."
  ],
  "Kettlebell shoulder extension": [
    "Keep your arms straight and sweep them back behind your hips.",
    "Lean forward only slightly and hold that angle.",
    "Squeeze your triceps and the back of your shoulders at the top.",
    "Don't swing; move slowly both ways.",
    "Keep your shoulders down, away from your ears.",
    "Use very light bells."
  ],
  "Kettlebell silverback shrug single": [
    "Hold one bell with both hands and lean forward about 30 degrees.",
    "Pull your shoulder blades back and up with straight arms.",
    "Keep your torso angle fixed.",
    "Squeeze for a second at the top.",
    "Let your shoulders round forward fully at the bottom.",
    "Keep your back flat and your abs braced."
  ],
  "Kettlebell single-arm calf raise": [
    "Hold one bell at your side and keep your shoulders level.",
    "Rise evenly on both feet; don't lean toward the bell.",
    "Pause for a second at the top.",
    "Lower slowly until your heels touch the floor.",
    "Keep your free hand on your hip.",
    "Switch the bell to the other hand each set."
  ],
  "Kettlebell single-arm clean and jerk": [
    "Clean the bell to the rack with your hips and keep it close to your body.",
    "For the jerk: dip, drive, then drop under and catch with a straight arm.",
    "Stand up fully with the bell locked out before lowering.",
    "Use your free arm for balance.",
    "Keep your wrist straight in the rack and overhead.",
    "Learn the single arm clean and the push press first."
  ],
  "Kettlebell single-arm clean and press": [
    "Keep the bell close on the clean; let it roll around your wrist, not flip over it.",
    "Catch in the rack with your elbow tucked to your ribs.",
    "Pause in the rack, then press.",
    "Tighten your glutes and abs so you don't lean away from the bell.",
    "Lock out with your biceps beside your ear.",
    "Lower to the rack before swinging the bell back down."
  ],
  "Kettlebell single-arm curtsy lunge": [
    "Hold the bell at your side and keep your shoulders level.",
    "Step back and across behind your front leg.",
    "Keep your hips facing forward.",
    "Lower until your back knee is just above the floor.",
    "Push through the front heel to stand.",
    "Try the bell on each side; each one challenges balance differently."
  ],
  "Kettlebell single-arm farmers march": [
    "The bell on one side tries to bend you sideways; stay perfectly upright.",
    "Lift each knee to hip height and pause.",
    "Keep your shoulders and hips level.",
    "Brace your abs hard, especially on the side without the bell.",
    "Keep the bell still at your side.",
    "Do equal sets with each hand."
  ],
  "Kettlebell single-arm farmers walk": [
    "Walk as if you carried a bell in both hands: tall and level.",
    "Don't lean toward or away from the weight.",
    "Take short, steady steps.",
    "Squeeze the handle and keep your shoulder packed down.",
    "Keep your free arm relaxed, or make a fist for more tension.",
    "Carry the same distance with each hand."
  ],
  "Kettlebell single-arm forward lunge": [
    "Hold the bell at your side and keep your shoulders level.",
    "Step long enough that your front knee stays over your ankle.",
    "Lower straight down with your torso tall.",
    "Push hard off the front foot to return.",
    "Brace your abs so the bell doesn't pull you sideways.",
    "Do all four combinations over time: each hand with each leg."
  ],
  "Kettlebell single-arm front rack step-up": [
    "Rack one bell and keep your torso from leaning to that side.",
    "Put your whole foot on the box.",
    "Push through the top leg to stand.",
    "Stand fully tall before stepping down.",
    "Step down slowly.",
    "Keep your racked elbow tucked to your ribs."
  ],
  "Kettlebell single-arm front rack step-up knee drive": [
    "Finish on one leg with the other knee at hip height.",
    "Hold the top for a moment before coming down.",
    "Keep the bell racked and your torso upright.",
    "Push through the whole foot on the box.",
    "Lower the free leg slowly to the floor.",
    "Use a light bell until your balance is steady."
  ],
  "Kettlebell single-arm hang clean and jerk": [
    "Start from the hang, bell just above your knees; it never touches the floor.",
    "Clean with a short, sharp hip drive.",
    "Settle in the rack before the jerk.",
    "Dip, drive, then drop under and lock your arm out.",
    "Stand up fully before lowering.",
    "Use your free arm for balance."
  ],
  "Kettlebell single-arm hang clean and press": [
    "Start from the hang with the bell just above your knees.",
    "Snap your hips and keep the bell close on the way up.",
    "Catch softly in the rack with a straight wrist.",
    "Press with straight legs; no dip.",
    "Lock out with your biceps beside your ear.",
    "Return to the rack, then the hang, under control."
  ],
  "Kettlebell single-arm high incline chest press": [
    "Keep your back and both shoulder blades against the pad.",
    "Start with the bell beside your shoulder, resting on your forearm.",
    "Press up until the bell is directly above your shoulder.",
    "Don't twist toward the working arm.",
    "Rest your free hand on your thigh.",
    "The steep angle makes this mostly a front-shoulder exercise."
  ],
  "Kettlebell single-arm reverse lunge": [
    "Hold the bell at your side and stay level.",
    "Step straight back and lower under control.",
    "Keep your weight on the front foot.",
    "Keep your torso upright.",
    "Push through the front heel to stand.",
    "Brace your abs to resist the side pull of the bell."
  ],
  "Kettlebell single-arm shoulder extension": [
    "Keep your arm straight and sweep it back past your hip.",
    "Don't rotate your torso to get the bell higher.",
    "Squeeze the back of your shoulder and your triceps at the top.",
    "Move slowly in both directions.",
    "Keep your free hand on your hip.",
    "Use a very light bell."
  ],
  "Kettlebell single-arm step-up balance": [
    "Finish each rep balanced on one leg; the other foot touches nothing.",
    "Hold the top for a full second.",
    "Keep your hips level; don't let the free side drop.",
    "Push through the whole foot on the box.",
    "Lower slowly back to the floor.",
    "Fix your eyes on one point to help your balance."
  ],
  "Kettlebell single-arm step-up knee drive": [
    "Drive your free knee up to hip height as you reach the top.",
    "Stand fully tall on the box leg.",
    "Keep the bell still at your side.",
    "Pause for a moment at the top.",
    "Lower with control; don't fall off the box.",
    "Squeeze the glute of the standing leg."
  ],
  "Kettlebell single-arm thruster": [
    "Squat with the bell racked, then press as you stand, in one motion.",
    "Keep your racked elbow tucked and your chest up in the squat.",
    "Use the leg drive to launch the bell.",
    "Lock out overhead with your biceps beside your ear.",
    "Use your free arm for balance.",
    "Bring the bell back to the rack as you sink into the next squat."
  ],
  "Kettlebell single-leg calf raise": [
    "Hold a support lightly for balance, not to pull yourself up.",
    "Rise as high as possible on one foot.",
    "Pause for a second at the top.",
    "Lower slowly until your heel touches the floor.",
    "Keep your knee straight.",
    "Start with your weaker leg and match the reps on the other."
  ],
  "Kettlebell single-leg glute bridge": [
    "Keep your hips level; don't let the free side drop.",
    "Push through the heel of the planted foot.",
    "Keep the free leg straight and in line with the other thigh.",
    "Squeeze the working glute at the top for a second.",
    "Don't arch your lower back to get higher.",
    "Hold the bell steady on your lower belly."
  ],
  "Kettlebell single-leg hip thrust": [
    "Keep your hips square; don't twist toward the working leg.",
    "Push through the planted heel until your shin is vertical.",
    "Keep your chin tucked and your ribs down.",
    "Squeeze the working glute hard at the top.",
    "Hold the free leg straight out without swinging it.",
    "Use much less weight than a two-leg hip thrust."
  ],
  "Kettlebell single-leg single-arm calf raise": [
    "Stand on the edge of a plate so your heel can drop below your toes.",
    "Hold the bell on the same side as the working leg.",
    "Sink into a full stretch at the bottom, then rise as high as you can.",
    "Pause at the top and at the bottom.",
    "Hold the post lightly for balance only.",
    "Keep your knee straight throughout."
  ],
  "Kettlebell snatch double": [
    "Drive with your hips and pull both bells up close to your body, elbows high.",
    "Punch both hands up through the handles so the bells land softly on your forearms.",
    "Lock out with your arms beside your ears and your ribs down.",
    "Use lighter bells than for a single arm snatch.",
    "Lower the bells to the rack first if dropping them straight down feels uncontrolled.",
    "Master the single arm snatch before trying two bells."
  ],
  "Kettlebell spinal Jefferson curl": [
    "This is a slow, loaded stretch, not a strength lift; use a very light bell.",
    "Roll down one vertebra at a time, starting with your chin.",
    "Keep your legs straight and your weight over the middle of your feet.",
    "Let the bell pull you gently into the stretch; never force it.",
    "Roll back up slowly from your lower back to your head.",
    "Skip it if you have a history of disc or lower-back problems."
  ],
  "Kettlebell squat clean and jerk": [
    "Pull the bells from between your knees and drop into a full squat to catch them in the rack.",
    "Keep your elbows tucked and chest up at the bottom.",
    "Stand up fully before starting the jerk.",
    "Dip, drive and punch both bells overhead.",
    "Keep your heels down throughout.",
    "Learn the clean, the front rack squat and the jerk separately first."
  ],
  "Kettlebell staggered deadlift single": [
    "Hold one bell with both hands in front of the front leg.",
    "Keep most of your weight on the front foot; the back toes are a kickstand.",
    "Push your hips straight back with a flat back.",
    "Keep the bell close to your front shin.",
    "Squeeze the front-leg glute to stand.",
    "Do the same reps on each side."
  ],
  "Kettlebell standing tricep extension": [
    "Keep your elbows pointing at the ceiling, close to your ears.",
    "Lower the bell between your shoulder blades for a full stretch.",
    "Keep your ribs down and your glutes tight so your back doesn't arch.",
    "Only your forearms move.",
    "Straighten your arms fully without snapping your elbows.",
    "Grip the horns firmly; the bell is behind your head."
  ],
  "Kettlebell step-up double": [
    "Let the bells hang at your sides and keep your shoulders back.",
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Stand fully tall on the box.",
    "Step down slowly and under control.",
    "Keep the bells from swinging."
  ],
  "Kettlebell swing double": [
    "Take a wider stance so both bells fit between your legs.",
    "Hinge and snap your hips exactly like a single-bell swing.",
    "Keep the bells side by side; don't let them clash.",
    "Let them float to chest height and no higher.",
    "Keep your back flat and your shoulders packed.",
    "Start with two light bells; the total load adds up fast."
  ],
  "Kettlebell tibialis raise": [
    "Hook the handle over the top of your foot near your toes.",
    "Only your ankle moves; keep your knee and thigh still.",
    "Pull your toes up toward your shin as high as you can.",
    "Lower slowly until your toes point down.",
    "Use a very light bell; the shin muscle is small.",
    "Sit high enough that the bell never touches the floor."
  ],
  "Kettlebell walking farmers march": [
    "Walk forward with high knees, lifting each one to hip height.",
    "Pause for a beat on one leg before stepping down.",
    "Stay tall; don't lean back as your knee rises.",
    "Keep the bells still and your shoulders level.",
    "Take slow, deliberate steps.",
    "Count each step as a rep."
  ],
  "Kettlebell walkover push-up": [
    "Use a heavy, wide kettlebell so it doesn't tip under your hand.",
    "Keep your body in one straight line from head to heels.",
    "Lower your chest level with the bell on each rep.",
    "Walk your hands across so the other hand lands on the handle.",
    "Keep your hips from sagging or twisting as you cross.",
    "Drop to your knees if you can't keep a straight body."
  ],
  "Kettlebell windmill bottom hand": [
    "The bell hangs from your lower hand; the empty top arm points at the ceiling.",
    "Keep your eyes on your top hand.",
    "Push your hips out to the side as you tilt.",
    "Keep both legs straight, or the front knee only slightly soft.",
    "Lower the bell along the inside of your front leg.",
    "An easier way to learn the windmill before holding the bell overhead."
  ],
  "Kettlebell single-arm front rack forward lunge": [
    "Rack one bell and keep your shoulders level against the uneven load.",
    "Step long and lower straight down.",
    "Keep your racked elbow tucked and your wrist straight.",
    "Stay tall; don't lean toward the bell.",
    "Push hard off the front foot to return.",
    "Brace your abs before every step."
  ],
  "Kettlebell single-arm front rack reverse lunge": [
    "Rack one bell and keep your torso from leaning or twisting.",
    "Step straight back and lower under control.",
    "Keep your weight on the front foot.",
    "Keep your racked elbow tucked to your ribs.",
    "Push through the front heel to stand.",
    "Do equal reps with the bell on each side."
  ],
  "Kettlebell staggered swing": [
    "Keep most of your weight on the front leg; the back toes only steady you.",
    "Hinge and snap your hips just like a normal swing.",
    "Keep your hips square to the front.",
    "Let the bell float to chest height.",
    "Use a lighter bell than for your two-foot swing.",
    "Do equal sets with each leg in front."
  ],
  "Kettlebell kickstand squat": [
    "Keep about 80% of your weight on the front leg.",
    "The back toes only help you balance.",
    "Squat straight down over the front foot.",
    "Keep the front heel flat and the knee tracking over your toes.",
    "Hold the bell tight to your chest.",
    "A good step between two-leg squats and single-leg squats."
  ],
  "Dumbbell alternating Arnold press": [
    "Start with your palms facing you, then turn them forward as you press.",
    "Press one arm at a time while the other waits at your shoulder.",
    "Rotate smoothly through the whole press, not all at the bottom.",
    "Brace your abs so you don't lean back.",
    "Finish with your arm straight and your biceps by your ear.",
    "Lower under control and turn the palm back toward you."
  ],
  "Dumbbell alternating forward lunge": [
    "Take a long enough step that your front shin stays close to vertical.",
    "Lower straight down; don't let your torso tip forward.",
    "Let the dumbbells hang at your sides with relaxed shoulders.",
    "Push off the front foot to return to standing.",
    "Keep your front knee in line with your toes.",
    "Switch legs every rep and keep the pace even."
  ],
  "Dumbbell alternating lateral lunge": [
    "Step wide and sit your hips back over the bent leg.",
    "Keep the other leg straight with the whole foot on the floor.",
    "Let the dumbbells hang on either side of the bent shin.",
    "Keep your chest up and your back flat.",
    "Push hard off the bent leg to come back to the middle.",
    "Keep both feet pointing forward."
  ],
  "Dumbbell alternating overhead press": [
    "Press one dumbbell while the other stays at shoulder height.",
    "Keep your wrist stacked over your elbow.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Press straight up; don't lean away from the working arm.",
    "Lock out fully before you lower.",
    "Lower one dumbbell all the way before the other one starts."
  ],
  "Dumbbell alternating Pendlay row": [
    "Keep your torso parallel to the floor for every rep.",
    "Let each dumbbell come to a full stop on the floor.",
    "Pull your elbow toward the ceiling, close to your ribs.",
    "Don't twist your shoulders as you row.",
    "Keep your back flat and your neck in line with it.",
    "Bend your knees just enough to reach the dumbbells."
  ],
  "Dumbbell alternating rear delt fly": [
    "Hinge forward until your torso is almost parallel to the floor.",
    "Raise one arm out to the side while the other hangs still.",
    "Lead with your elbow and keep a slight bend in it.",
    "Stop at shoulder height; going higher brings in your traps.",
    "Don't rotate your torso toward the lifting arm.",
    "Use a light weight and lower slowly."
  ],
  "Dumbbell alternating reverse lunge": [
    "Step straight back, not behind your other foot.",
    "Keep most of your weight on the front heel.",
    "Lower until the back knee is just above the floor.",
    "Keep your torso upright and the dumbbells still.",
    "Drive through the front leg to stand up.",
    "Stepping back is easier on the knees than stepping forward."
  ],
  "Dumbbell alternating single-arm thruster": [
    "Use the drive out of the squat to launch the dumbbell.",
    "Keep both dumbbells at your shoulders in the squat.",
    "Press one arm per rep and switch sides each time.",
    "Keep your chest up at the bottom of the squat.",
    "Lock the arm out as your legs finish straightening.",
    "Bring the dumbbell back to the shoulder before you squat again."
  ],
  "Dumbbell alternating Z press": [
    "Sit tall on the floor; don't lean back as you press.",
    "Keep your legs straight and your heels on the floor.",
    "Press one dumbbell while the other waits at your shoulder.",
    "Brace your abs hard, since there is no back support.",
    "Go lighter than a standing press.",
    "Finish each press with your biceps beside your ear."
  ],
  "Dumbbell bent-arm lateral raise": [
    "Keep your elbows bent at 90 degrees the whole time.",
    "Lift with your elbows, not your hands.",
    "Stop when your upper arms are level with your shoulders.",
    "Keep your forearms parallel to the floor at the top.",
    "Don't shrug; keep your shoulders away from your ears.",
    "The bent arm lets you use a little more weight than a straight-arm raise."
  ],
  "Dumbbell bench wrist curl": [
    "Rest your whole forearms on the bench so only your wrists move.",
    "Let your wrists hang just past the edge of the bench.",
    "Lower until you feel a stretch in your forearms.",
    "Curl up as high as your wrists go and squeeze.",
    "Move slowly; small muscles don't need momentum.",
    "Keep your elbows down on the bench."
  ],
  "Dumbbell bench wrist extension": [
    "Palms face down for this one.",
    "Rest your whole forearms on the bench so only your wrists move.",
    "Lift your knuckles toward the ceiling as high as they go.",
    "Use less weight than for wrist curls.",
    "Lower slowly until your knuckles point at the floor.",
    "Keep a firm grip so the dumbbells don't roll in your fingers."
  ],
  "Dumbbell box squat": [
    "Reach back with your hips to find the box.",
    "Sit lightly; don't drop or rock on the box.",
    "Keep your shins close to vertical.",
    "Keep your chest up and the dumbbells at your sides.",
    "Stay tight when you touch the box.",
    "Drive through your whole foot to stand."
  ],
  "Dumbbell clean and press": [
    "Drive with your hips to bring the dumbbells to your shoulders.",
    "Keep the dumbbells close to your body on the way up.",
    "Catch them at your shoulders with your elbows under your wrists.",
    "Pause at the shoulders, then press.",
    "Keep your back flat when you hinge down.",
    "Lower in two steps: to the shoulders, then to the hang."
  ],
  "Dumbbell cossack squat": [
    "Take a very wide stance and keep it for the whole set.",
    "Sit down over one heel and keep that heel flat.",
    "Let the toes of the straight leg point up.",
    "Hold the dumbbell against your chest as a counterweight.",
    "Go only as deep as you can with a flat back.",
    "Finish all reps on one side or alternate, whichever feels steadier."
  ],
  "Dumbbell crunch": [
    "Curl your ribs toward your hips; don't sit all the way up.",
    "Keep the dumbbell pressed against your upper chest.",
    "Keep your lower back on the floor.",
    "Breathe out as you curl up.",
    "Don't pull your chin into your chest.",
    "Lower slowly until your shoulder blades touch the floor."
  ],
  "Dumbbell Cuban press": [
    "Use very light dumbbells; this trains small shoulder muscles.",
    "Keep your upper arms level with your shoulders as you rotate.",
    "Rotate your forearms up until they point at the ceiling.",
    "Press only after the rotation is finished.",
    "Reverse every step on the way down.",
    "Stop if you feel a pinch in the shoulder."
  ],
  "Dumbbell curtsy deficit lunge": [
    "Stand on a low, stable platform.",
    "Reach the back foot behind and across the standing leg.",
    "Keep your hips facing forward.",
    "Keep your weight on the front heel on the platform.",
    "Let the back knee drop below the level of the platform.",
    "Start with body weight to learn the balance."
  ],
  "Dumbbell decline guillotine bench press": [
    "Flare your elbows straight out to the sides.",
    "Lower the dumbbells toward your collarbones, not your lower chest.",
    "Use much less weight than a normal press.",
    "Lower slowly and stop before your shoulders complain.",
    "Hook your feet firmly before you lie back.",
    "Skip this one if your shoulders are sore."
  ],
  "Dumbbell decline neutral bench press": [
    "Keep your palms facing each other the whole time.",
    "Tuck your elbows close to your ribs.",
    "Lower the dumbbells to the sides of your lower chest.",
    "Press straight up; don't let the dumbbells drift toward your face.",
    "Hook your feet firmly before you lie back.",
    "The neutral grip is usually kinder to the shoulders."
  ],
  "Dumbbell decline single-arm bench press": [
    "Brace your abs so your torso doesn't roll toward the weight.",
    "Keep both shoulder blades flat on the bench.",
    "Rest your free hand on your stomach.",
    "Lower the dumbbell to the side of your lower chest.",
    "Press straight up to a full lockout.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell decline skull crusher": [
    "Keep your upper arms vertical and still.",
    "Bend only at the elbows.",
    "Lower the dumbbells beside your ears, not onto your forehead.",
    "Keep your elbows pointing at the ceiling, not flaring out.",
    "Straighten your arms fully and squeeze your triceps.",
    "The decline keeps tension on the triceps at the top."
  ],
  "Dumbbell decline squeeze press": [
    "Press the dumbbells together as hard as you can the whole time.",
    "Keep them touching from the chest to lockout.",
    "Keep your elbows tucked.",
    "Use less weight than a normal press; the squeeze does the work.",
    "Lower slowly to the middle of your chest.",
    "Hook your feet firmly before you lie back."
  ],
  "Dumbbell deficit reverse lunge": [
    "Stand on a low, stable platform.",
    "Step back and down to the floor behind it.",
    "Let the front thigh go below parallel; that is the point of the deficit.",
    "Keep your weight on the front heel.",
    "Keep your torso upright.",
    "Drive through the front leg to step back up."
  ],
  "Dumbbell drag curl": [
    "Drag the dumbbells up your body; they stay close the whole way.",
    "Pull your elbows straight back behind you as the dumbbells rise.",
    "Keep your shoulders down; don't shrug.",
    "Stop at your lower chest and squeeze your biceps.",
    "Stand tall without leaning back.",
    "Lower along the same path."
  ],
  "Dumbbell elbow side plank": [
    "Keep your elbow directly under your shoulder.",
    "Hold one straight line from head to feet.",
    "Don't let your hips sag or roll forward.",
    "Hold the dumbbell on your top hip.",
    "Breathe steadily while you hold.",
    "Do the same time on each side."
  ],
  "Dumbbell elevated push-up": [
    "Use hex dumbbells so they can't roll.",
    "Grip the handles with straight wrists.",
    "Lower your chest between the dumbbells for a deeper stretch.",
    "Keep your body in one straight line.",
    "Keep your elbows about 45 degrees from your sides.",
    "The neutral wrist position is easier on the wrists than the floor."
  ],
  "Dumbbell feet-down Russian twist": [
    "Keep your heels on the floor; this is the easier version.",
    "Lean back with a straight back, not a rounded one.",
    "Turn your shoulders, not just your arms.",
    "Follow the dumbbell with your eyes.",
    "Move under control; don't swing.",
    "Lift your feet once this gets easy."
  ],
  "Dumbbell feet-elevated glute bridge": [
    "Put your heels on the bench, not your toes.",
    "Push through your heels to lift your hips.",
    "Squeeze your glutes at the top; don't arch your lower back.",
    "Hold the dumbbell on your hips with both hands.",
    "Keep your shoulders and head on the floor.",
    "Raising the feet gives the hips a longer range."
  ],
  "Dumbbell feet-elevated single-leg glute bridge": [
    "Keep your hips level; don't let the free side drop.",
    "Push through the heel that is on the bench.",
    "Hold the other leg up for the whole set.",
    "Squeeze your glute at the top.",
    "Start without weight to learn the balance.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell feet-elevated figure-four glute bridge": [
    "Cross one ankle over the other knee and keep it there.",
    "Push through the heel that is on the bench.",
    "Keep your hips level as they rise.",
    "Let the crossed knee open out to the side.",
    "Squeeze your glute at the top.",
    "Start light; one leg does all the work."
  ],
  "Dumbbell feet-elevated staggered glute bridge": [
    "The foot closer to your hips does most of the work.",
    "The far foot rests on its heel and only helps you balance.",
    "Push through the near heel.",
    "Keep your hips level as they rise.",
    "Squeeze your glutes at the top without arching your back.",
    "A good step between two-leg and single-leg bridges."
  ],
  "Dumbbell figure-four glute bridge": [
    "Cross one ankle over the other knee and keep it there.",
    "Push through the heel on the floor.",
    "Keep your hips level as they rise.",
    "Let the crossed knee open out to the side.",
    "Squeeze your glute at the top.",
    "Hold the dumbbell on your hips with both hands."
  ],
  "Dumbbell figure-four hip thrust": [
    "Rest your upper back on the bench, just below the shoulder blades.",
    "Cross one ankle over the other knee and keep it there.",
    "Push through the heel on the floor.",
    "Keep your chin tucked and your ribs down.",
    "Stop when your torso is parallel to the floor.",
    "Keep your hips level; don't let one side drop."
  ],
  "Dumbbell figure-four heels-elevated hip thrust": [
    "Put the working heel on a low, stable platform.",
    "Cross the other ankle over the working knee.",
    "Push through the raised heel.",
    "Keep your hips level as they rise.",
    "Stop when your torso is parallel to the floor.",
    "Start light; the raised heel makes the range longer."
  ],
  "Dumbbell heels-elevated hip thrust": [
    "Put both heels on a low, stable platform with your toes up.",
    "Push through your heels, not your toes.",
    "Rest your upper back on the bench, just below the shoulder blades.",
    "Keep your chin tucked and your ribs down.",
    "Stop when your torso is parallel to the floor.",
    "Raised heels shift more of the work to the hamstrings and glutes."
  ],
  "Dumbbell single-leg heels-elevated hip thrust": [
    "Put the working heel on a low, stable platform.",
    "Hold the other leg off the floor for the whole set.",
    "Keep your hips level; don't let the free side drop.",
    "Push through the raised heel.",
    "Stop when your torso is parallel to the floor.",
    "Start without weight to learn the balance."
  ],
  "Dumbbell staggered hip thrust": [
    "The foot under your knee does most of the work.",
    "The forward foot rests on its heel and only helps you balance.",
    "Push through the near heel.",
    "Keep your hips level as they rise.",
    "Stop when your torso is parallel to the floor.",
    "A good step between two-leg and single-leg hip thrusts."
  ],
  "Dumbbell glute bridge": [
    "Push through your heels to lift your hips.",
    "Squeeze your glutes at the top; don't arch your lower back.",
    "Hold the dumbbell on your hips with both hands.",
    "Keep your shins close to vertical at the top.",
    "Keep your shoulders on the floor.",
    "Pause for a second at the top of each rep."
  ],
  "Dumbbell single-leg glute bridge": [
    "Keep your hips level; don't let the free side drop.",
    "Push through the heel on the floor.",
    "Hold the other leg in line with the working thigh.",
    "Squeeze your glute at the top.",
    "Keep your shoulders on the floor.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell staggered glute bridge": [
    "The foot closer to your hips does most of the work.",
    "The far foot rests on its heel and only helps you balance.",
    "Push through the near heel.",
    "Keep your hips level as they rise.",
    "Squeeze your glutes at the top without arching your back.",
    "A good step between two-leg and single-leg bridges."
  ],
  "Dumbbell flat preacher curl": [
    "Set the pad flat so your upper arms lie level.",
    "Keep your upper arms on the pad for the whole rep.",
    "Stop when your forearms are vertical; past that the tension is gone.",
    "Lower slowly until your arms are almost straight.",
    "Don't let your elbows lift off the pad.",
    "Use less weight than on a sloped preacher bench."
  ],
  "Dumbbell floor fly": [
    "Keep a slight bend in your elbows the whole time.",
    "Open your arms until your upper arms touch the floor lightly.",
    "Don't bounce your arms off the floor.",
    "Squeeze your chest to bring the dumbbells together.",
    "Keep your shoulder blades pulled back.",
    "The floor stops the stretch early, which is easier on the shoulders."
  ],
  "Dumbbell front rack cossack squat": [
    "Rest one end of each dumbbell on its shoulder.",
    "Keep your elbows up so the dumbbells don't slide forward.",
    "Sit down over one heel and keep that heel flat.",
    "Let the toes of the straight leg point up.",
    "Go only as deep as you can with an upright chest.",
    "Use a light weight; balance is the hard part."
  ],
  "Dumbbell front rack curtsy deficit lunge": [
    "Stand on a low, stable platform.",
    "Keep the dumbbells at your shoulders with your elbows up.",
    "Reach the back foot behind and across the standing leg.",
    "Keep your hips facing forward.",
    "Keep your weight on the front heel on the platform.",
    "Start with body weight to learn the balance."
  ],
  "Dumbbell front rack deficit reverse lunge": [
    "Stand on a low, stable platform.",
    "Keep the dumbbells at your shoulders with your elbows up.",
    "Step back and down to the floor behind the platform.",
    "Let the front thigh go below parallel.",
    "Keep your torso upright; the front rack makes you brace harder.",
    "Drive through the front leg to step back up."
  ],
  "Dumbbell front rack step-up": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Keep the dumbbells at your shoulders with your elbows up.",
    "Stand all the way up before you step down.",
    "Lower yourself under control.",
    "Use a box about knee height."
  ],
  "Dumbbell front rack step-up knee drive": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Drive the free knee up to hip height as you stand.",
    "Pause on one leg before you step down.",
    "Keep the dumbbells at your shoulders with your elbows up.",
    "Lower yourself under control."
  ],
  "Dumbbell full front raise": [
    "Keep your arms straight all the way overhead.",
    "Use less weight than for a normal front raise.",
    "Don't lean back as the dumbbells pass shoulder height.",
    "Brace your abs so your ribs don't flare.",
    "Lower slowly along the same arc.",
    "Stop at shoulder height if going overhead pinches."
  ],
  "Dumbbell full lateral raise": [
    "Keep your arms straight all the way overhead.",
    "Turn your palms up as you pass shoulder height so your shoulders can move freely.",
    "Use less weight than for a normal lateral raise.",
    "Don't shrug on the way up.",
    "Lower slowly along the same arc.",
    "Stop at shoulder height if going overhead pinches."
  ],
  "Dumbbell goblet alternating curtsy lunge": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Step back and across behind the other leg.",
    "Keep your hips and chest facing forward.",
    "Keep your weight on the front heel.",
    "Lower until the back knee is just above the floor.",
    "Switch sides every rep at an even pace."
  ],
  "Dumbbell goblet Bulgarian split squat": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Stand far enough from the bench that your front shin stays close to vertical.",
    "Keep most of your weight on the front leg.",
    "Lower straight down until the front thigh is parallel to the floor.",
    "The back foot only helps you balance.",
    "Keep your torso upright."
  ],
  "Dumbbell goblet cossack squat": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Take a very wide stance and keep it for the whole set.",
    "Sit down over one heel and keep that heel flat.",
    "Let the toes of the straight leg point up.",
    "Keep your chest up; the dumbbell helps you balance.",
    "Go only as deep as you can with a flat back."
  ],
  "Dumbbell goblet curtsy deficit lunge": [
    "Stand on a low, stable platform.",
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Reach the back foot behind and across the standing leg.",
    "Keep your hips facing forward.",
    "Keep your weight on the front heel on the platform.",
    "Start with body weight to learn the balance."
  ],
  "Dumbbell goblet curtsy lunge": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Step back and across behind the standing leg.",
    "Keep your hips and chest facing forward.",
    "Keep your weight on the front heel.",
    "Lower until the back knee is just above the floor.",
    "Don't let the front knee cave inward."
  ],
  "Dumbbell goblet deficit reverse lunge": [
    "Stand on a low, stable platform.",
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Step back and down to the floor behind the platform.",
    "Let the front thigh go below parallel.",
    "Keep your weight on the front heel.",
    "Drive through the front leg to step back up."
  ],
  "Dumbbell goblet forward lunge": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Take a long enough step that your front shin stays close to vertical.",
    "Lower straight down; don't let your torso tip forward.",
    "Push off the front foot to return to standing.",
    "Keep your front knee in line with your toes.",
    "Holding the weight in front makes it easier to stay upright."
  ],
  "Dumbbell goblet good morning": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Push your hips straight back; your knees bend only a little.",
    "Keep your back flat from start to finish.",
    "Stop when you feel a strong stretch in your hamstrings.",
    "Drive your hips forward to stand up.",
    "Start light; the weight sits far from your hips."
  ],
  "Dumbbell goblet lateral lunge": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Step wide and sit your hips back over the bent leg.",
    "Keep the other leg straight with the whole foot on the floor.",
    "Keep your chest up.",
    "Push hard off the bent leg to come back to the middle.",
    "Keep both feet pointing forward."
  ],
  "Dumbbell goblet reverse lunge": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Step straight back, not behind your other foot.",
    "Keep most of your weight on the front heel.",
    "Lower until the back knee is just above the floor.",
    "Keep your torso upright.",
    "Drive through the front leg to stand up."
  ],
  "Dumbbell goblet side step-up": [
    "Stand sideways to the box with the near foot on top.",
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Push through the top leg; don't spring off the floor.",
    "Rise straight up without leaning toward the box.",
    "Lower the outside foot to the floor slowly.",
    "Keep the top knee in line with your toes."
  ],
  "Dumbbell goblet split squat": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Keep your feet where they are for the whole set.",
    "Lower straight down between your feet.",
    "Keep most of your weight on the front heel.",
    "Stop with the back knee just above the floor.",
    "Keep your torso upright."
  ],
  "Dumbbell goblet step-up": [
    "Put your whole foot on the box.",
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Push through the top leg; don't spring off the floor.",
    "Stand all the way up before you step down.",
    "Lower yourself under control.",
    "Use a box about knee height."
  ],
  "Dumbbell guillotine bench press": [
    "Flare your elbows straight out to the sides.",
    "Lower the dumbbells toward your collarbones, not your chest.",
    "Use much less weight than a normal press.",
    "Lower slowly and stop before your shoulders complain.",
    "Keep your shoulder blades pulled back.",
    "Skip this one if your shoulders are sore."
  ],
  "Dumbbell guillotine incline bench press": [
    "Flare your elbows straight out to the sides.",
    "Lower the dumbbells toward your collarbones.",
    "Use much less weight than a normal incline press.",
    "Lower slowly and stop before your shoulders complain.",
    "Keep your shoulder blades pulled back against the pad.",
    "Skip this one if your shoulders are sore."
  ],
  "Dumbbell half-kneeling goblet Romanian deadlift": [
    "Hold the dumbbell upright against your chest with your elbows tucked.",
    "Push your hips back toward your rear heel.",
    "Keep your back flat as your torso tips forward.",
    "Feel the stretch in the hamstring of the front leg.",
    "Squeeze your glutes to bring your torso upright.",
    "Use a pad under the back knee."
  ],
  "Dumbbell half-kneeling Romanian deadlift": [
    "Push your hips back toward your rear heel.",
    "Let the dumbbells travel down either side of the front leg.",
    "Keep your back flat as your torso tips forward.",
    "Feel the stretch in the hamstring of the front leg.",
    "Squeeze your glutes to bring your torso upright.",
    "Use a pad under the back knee."
  ],
  "Dumbbell half-kneeling overhead press": [
    "Squeeze the glute of the kneeling leg to keep your hips steady.",
    "Brace your abs so your lower back doesn't arch.",
    "Press straight up to a full lockout.",
    "Keep your torso tall; don't lean back.",
    "Use a pad under the back knee.",
    "Swap the front leg halfway through or on the next set."
  ],
  "Dumbbell half-kneeling single-arm overhead press": [
    "Press with the arm on the side of the kneeling leg.",
    "Squeeze the glute of the kneeling leg to keep your hips steady.",
    "Don't lean away from the dumbbell.",
    "Brace your abs so your ribs don't flare.",
    "Finish with your biceps beside your ear.",
    "Use a pad under the back knee."
  ],
  "Dumbbell half-kneeling wood chopper": [
    "Turn from your ribs and shoulders; keep your hips facing forward.",
    "Move the dumbbell on a diagonal from low on one side to high on the other.",
    "Keep your arms nearly straight.",
    "Follow the dumbbell with your eyes.",
    "Control the way down; don't let it drop.",
    "Use a light weight and a pad under the knee."
  ],
  "Dumbbell bench-braced flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing up.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell bench-braced hammer flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing each other, thumbs on top.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell bench-braced reverse flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing down, knuckles leading.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell bench-braced incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing up.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell bench-braced hammer incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing each other, thumbs on top.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell bench-braced reverse incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing down, knuckles leading.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Go lighter than a standing curl; nothing can help the biceps here."
  ],
  "Dumbbell single-arm bench-braced flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing up.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench-braced hammer flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing each other, thumbs on top.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench-braced reverse flat curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips up so your torso stays level, like the top of a hip thrust.",
    "Keep your palms facing down, knuckles leading.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench-braced incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing up.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench-braced hammer incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing each other, thumbs on top.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench-braced reverse incline curl": [
    "Press the backs of your upper arms into the bench and keep them there.",
    "Keep your hips low so your torso slopes; the arms start behind your body.",
    "Keep your palms facing down, knuckles leading.",
    "Straighten your elbows fully to stretch the biceps.",
    "Curl without letting your elbows lift off the bench.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell bench-braced single-arm overhead tricep extension": [
    "Lie sideways on the incline bench with the working arm on top.",
    "Press the back of your working elbow into the top of the backrest.",
    "Hold the bench with your free arm and pull yourself into the pad.",
    "Bend only at the elbow; the upper arm stays still.",
    "Lower until the elbow is fully bent for a deep stretch.",
    "Finish with the dumbbell pointing at the ceiling."
  ],
  "Dumbbell Bayesian lateral raise": [
    "Lie back on the incline so your arms start slightly behind your body.",
    "Let your arms hang freely before each rep.",
    "Raise straight out to the sides until your arms are level with the floor.",
    "Keep your head and back on the pad.",
    "Use less weight than for a standing lateral raise.",
    "Lower slowly to the full stretch."
  ],
  "Dumbbell standing Bayesian lateral raise": [
    "Lean your whole torso slightly forward and keep that angle.",
    "Raise straight out to the sides until your arms are level with the floor.",
    "Keep your arms straight or nearly straight.",
    "Don't swing your torso upright to help the lift.",
    "Keep your shoulders away from your ears.",
    "Lower slowly."
  ],
  "Dumbbell cross-body Romanian deadlift": [
    "Push your hips back and keep your knees almost straight.",
    "Reach the dumbbell toward the opposite leg.",
    "Keep your back flat as you reach across.",
    "Stop when you feel the stretch in your hamstrings.",
    "Stand up to a normal upright position; don't lean back.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell hand side plank": [
    "Keep your hand directly under your shoulder.",
    "Lock your supporting arm straight.",
    "Hold one straight line from head to feet.",
    "Don't let your hips sag or roll forward.",
    "Hold the dumbbell on your top hip.",
    "Do the same time on each side."
  ],
  "Dumbbell side plank up-down": [
    "Only your hips move: hips down, hips up.",
    "Keep your elbow directly under your shoulder.",
    "Dip until your hip almost touches the floor.",
    "Lift a little higher than a straight line at the top.",
    "Don't let your hips roll forward or back.",
    "Hold the dumbbell on your top hip."
  ],
  "Dumbbell incline skullover": [
    "It is a skull crusher that turns into a pullover: bend the elbows first, then let the upper arms tip back.",
    "Keep your elbows fully bent while the upper arms move.",
    "Go back only until you feel a stretch in your triceps.",
    "Bring your elbows back to pointing at the ceiling before you straighten them.",
    "Keep your elbows from flaring out.",
    "Use less weight than for a normal skull crusher."
  ],
  "Dumbbell high incline skullover": [
    "It is a skull crusher that turns into a pullover: bend the elbows first, then let the upper arms tip back.",
    "Keep your elbows fully bent while the upper arms move.",
    "Go back only until you feel a stretch in your triceps.",
    "Bring your elbows back to pointing at the ceiling before you straighten them.",
    "Keep your elbows from flaring out.",
    "Use less weight than for a normal skull crusher."
  ],
  "Dumbbell rolling tricep extension": [
    "Bend your elbows first, then let your upper arms roll back beside your head.",
    "Keep your elbows fully bent while the upper arms move.",
    "Go back only until you feel a stretch in your triceps.",
    "Bring your elbows back to pointing at the ceiling before you straighten them.",
    "Keep your elbows from flaring out.",
    "Use less weight than for a normal skull crusher."
  ],
  "Dumbbell knee lawnmower row": [
    "Brace your free hand on your front knee.",
    "Start with an overhand grip and rotate the dumbbell as you pull.",
    "Finish with your upper arm at your side and your palm facing forward.",
    "Keep your back flat and your eyes forward.",
    "Pull with your back, not by twisting your torso.",
    "Lower slowly and let the hand rotate back."
  ],
  "Dumbbell single-arm row knee": [
    "Rest your free elbow on your front thigh to support your back.",
    "Keep your back flat and your chest facing the floor.",
    "Pull your elbow up and back, close to your ribs.",
    "Don't twist your torso to lift the weight.",
    "Squeeze your shoulder blade back at the top.",
    "Lower until your arm is fully straight."
  ],
  "Dumbbell kneeling single-arm row": [
    "Put one knee and the same-side hand on the bench.",
    "Keep your back flat and parallel to the floor.",
    "Pull the dumbbell toward your hip, not your shoulder.",
    "Avoid jerking or rotating your torso.",
    "Squeeze your shoulder blade back at the top.",
    "Lower until your arm is fully straight."
  ],
  "Dumbbell row bilateral": [
    "Hinge until your torso is close to parallel with the floor.",
    "Keep your back flat for the whole set.",
    "Let your arms hang fully before each pull.",
    "Pull your elbows straight back toward the ceiling.",
    "Don't stand up as you pull.",
    "Squeeze your shoulder blades together at the top."
  ],
  "Dumbbell supinated row": [
    "Keep an underhand grip: palms facing forward the whole time.",
    "Hinge until your torso is close to parallel with the floor.",
    "Keep your elbows close to your ribs.",
    "Pull toward your waist; you will feel your biceps and lats.",
    "Keep your back flat for the whole set.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell lateral lunge reach": [
    "Step wide and sit your hips back over the bent leg.",
    "Reach the dumbbell toward the floor in front of the bent foot.",
    "Keep your back flat as you reach.",
    "Keep the other leg straight with the whole foot on the floor.",
    "Push hard off the bent leg to come back to the middle.",
    "Bring the dumbbell back to your chest as you stand."
  ],
  "Dumbbell laying curl": [
    "Keep your upper arms beside your torso, level with the bench.",
    "Don't let your upper arms drop below the bench.",
    "Straighten your elbows fully at the bottom.",
    "Curl until the dumbbells point at the ceiling.",
    "Lower slowly; lying down removes any swing.",
    "Use less weight than for a standing curl."
  ],
  "Dumbbell offset squat": [
    "Hold one dumbbell on one shoulder only.",
    "Keep your shoulders level; don't lean toward or away from the weight.",
    "Avoid any twisting as you squat.",
    "Start the squat by pushing your hips back.",
    "Brace your abs; the uneven load works your core.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell plank pull-through": [
    "Keep your hips level; don't let them rock side to side.",
    "Set your feet wide for balance.",
    "Reach under your chest with the opposite hand.",
    "Drag or lift the dumbbell all the way to the other side.",
    "Keep your supporting arm straight under your shoulder.",
    "Drop to your knees if your hips start to twist."
  ],
  "Dumbbell Y press": [
    "Press up and out so your arms finish in a Y shape.",
    "Start with your palms facing each other and your elbows close to your body.",
    "Use less weight than for a straight overhead press.",
    "Keep your shoulders away from your ears.",
    "Brace your abs so you don't lean back.",
    "Lower along the same diagonal path."
  ],
  "Dumbbell seated Y press": [
    "Press up and out so your arms finish in a Y shape.",
    "Start with your palms facing each other and your elbows close to your body.",
    "Use less weight than for a straight overhead press.",
    "Keep your shoulders away from your ears.",
    "Keep your back against the pad.",
    "Lower along the same diagonal path."
  ],
  "Dumbbell six-way lateral raise": [
    "Six moves in one rep: out to the sides, to the front, overhead, then back the same way.",
    "Keep your arms straight the whole time.",
    "Use very light dumbbells; the rep is long.",
    "Move slowly and pause at each position.",
    "Don't lean back as the dumbbells go overhead.",
    "Keep your shoulders away from your ears."
  ],
  "Dumbbell standing hip abduction": [
    "Hold onto something stable with your free hand.",
    "Press the dumbbell against the outside of the working thigh.",
    "Lift the leg straight out to the side with the toes pointing forward.",
    "Don't lean your torso away to lift higher.",
    "Pause at the top and lower slowly.",
    "Keep the standing knee slightly bent."
  ],
  "Dumbbell suitcase crunch": [
    "Keep your legs straight up with the soles facing the ceiling.",
    "Reach the dumbbell toward your feet.",
    "Lift your shoulder blades off the floor; your lower back stays down.",
    "Don't swing your legs to help.",
    "Lower your spine back to the floor slowly.",
    "Bend your knees a little if your hamstrings are tight."
  ],
  "Dumbbell service exercise": [
    "One smooth sequence: curl across the body, rotate the elbow out, press overhead.",
    "Use a light dumbbell; it mimics a serving motion.",
    "Keep the dumbbell close to your shoulder as the elbow comes up.",
    "Point your elbow at the ceiling before you press.",
    "Turn your palm down as you lower the arm to your side.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell hang clean and press": [
    "Start each rep from the hang; the dumbbells never touch the floor.",
    "Drive with your hips to bring the dumbbells to your shoulders.",
    "Keep the dumbbells close to your body on the way up.",
    "Pause at the shoulders, then press.",
    "Keep your back flat in the hang position.",
    "Lower to the shoulders first, then back to the hang."
  ],
  "Dumbbell head-on-bench rear delt fly": [
    "Rest your forehead on the top of an incline bench to stop any swinging.",
    "Keep your back flat and your knees bent.",
    "Raise your arms out to the sides with a slight bend in the elbows.",
    "Stop at shoulder height and pause.",
    "Don't lift your head off the bench.",
    "Lower slowly until the dumbbells meet under your chest."
  ],
  "Dumbbell heels-up narrow goblet squat": [
    "Raise your heels on a wedge or plate and keep your feet close together.",
    "Let your knees travel forward over your toes.",
    "Keep your torso as upright as you can.",
    "Hold the dumbbell upright against your chest.",
    "Go as deep as you can with your heels on the wedge.",
    "The narrow, heels-up stance puts more of the work on the quads."
  ],
  "Dumbbell high incline bench press": [
    "Set the bench steep, about 60 degrees.",
    "Keep your shoulder blades pulled back against the pad.",
    "Lower the dumbbells beside your upper chest.",
    "Press straight up over your shoulders.",
    "Keep your elbows a little in front of your shoulders, not flared wide.",
    "Use less weight than on a lower incline."
  ],
  "Dumbbell hollow hold": [
    "Press your lower back flat into the floor.",
    "Lift your shoulders and legs only as high as you can keep your back down.",
    "Hold the dumbbell beyond your head with straight arms.",
    "Keep your legs straight and together.",
    "Breathe steadily while you hold.",
    "Bend your knees or raise your legs higher if your back lifts."
  ],
  "Dumbbell incline front raise": [
    "Keep your head and back on the pad so you can't swing.",
    "Start with your arms hanging straight down beside the bench.",
    "Raise your straight arms forward to shoulder height.",
    "Use less weight than for a standing front raise.",
    "Lower slowly to the full hang.",
    "Keep your shoulders away from your ears."
  ],
  "Dumbbell incline hammer curl": [
    "Keep your palms facing each other, thumbs on top.",
    "Let your arms hang straight down behind your torso for a full stretch.",
    "Keep your upper arms still; only your forearms move.",
    "Keep your head and back on the pad.",
    "Curl until the dumbbells are in front of your shoulders.",
    "Lower slowly to the full hang."
  ],
  "Dumbbell incline reverse curl": [
    "Keep an overhand grip: knuckles leading the whole way.",
    "Let your arms hang straight down for a full stretch.",
    "Keep your upper arms still; only your forearms move.",
    "Keep your wrists straight; don't let them bend back.",
    "Use less weight than for a normal incline curl.",
    "Lower slowly to the full hang."
  ],
  "Dumbbell incline skull crusher": [
    "Keep your upper arms pointing straight up and still.",
    "Bend only at the elbows.",
    "Lower the dumbbells beside your ears, not onto your forehead.",
    "Keep your elbows pointing at the ceiling, not flaring out.",
    "Straighten your arms fully and squeeze your triceps.",
    "The incline gives the triceps a longer stretch at the bottom."
  ],
  "Dumbbell incline twisting curl": [
    "Start with your palms facing each other and turn them up as you curl.",
    "Finish with your palms facing your shoulders.",
    "Let your arms hang straight down for a full stretch.",
    "Keep your upper arms still.",
    "Turn your palms back in as you lower.",
    "Keep your head and back on the pad."
  ],
  "Dumbbell incline Zottman curl": [
    "Curl up with your palms up, lower with your palms down.",
    "Flip your hands over at the top, not on the way.",
    "Lower slowly; the forearms work hardest on the way down.",
    "Keep your upper arms still.",
    "Choose a weight you can control in the overhand lowering.",
    "Keep your head and back on the pad."
  ],
  "Dumbbell internally rotated chest fly": [
    "Use an overhand grip: palms facing your feet, as if holding a barbell.",
    "Keep that grip the whole time; don't let your palms turn in.",
    "Keep a slight bend in your elbows and move only at the shoulders.",
    "Stop when the dumbbells are level with your chest; don't go behind your body.",
    "Squeeze your chest to bring the dumbbells back together.",
    "Use less weight than for a normal fly."
  ],
  "Dumbbell internally rotated floor fly": [
    "Use an overhand grip: palms facing your feet, as if holding a barbell.",
    "Keep that grip the whole time; don't let your palms turn in.",
    "Keep a slight bend in your elbows and move only at the shoulders.",
    "Open until your upper arms touch the floor lightly.",
    "Squeeze your chest to bring the dumbbells back together.",
    "Use less weight than for a normal fly."
  ],
  "Dumbbell internally rotated incline chest fly": [
    "Use an overhand grip: palms facing your feet, as if holding a barbell.",
    "Keep that grip the whole time; don't let your palms turn in.",
    "Keep a slight bend in your elbows and move only at the shoulders.",
    "Stop when the dumbbells are level with your upper chest; don't go behind your body.",
    "Squeeze your chest to bring the dumbbells back together.",
    "Use less weight than for a normal fly."
  ],
  "Dumbbell internally rotated rear delt fly": [
    "Use an overhand grip with your thumbs pointing toward each other.",
    "Keep your thumbs pointing down as your arms rise.",
    "Hinge forward until your torso is almost parallel to the floor.",
    "Stop at shoulder height.",
    "Don't swing your torso up to help.",
    "Use a light weight and lower slowly."
  ],
  "Dumbbell internally rotated single-arm floor fly": [
    "Use an overhand grip: palm facing your feet.",
    "Keep that grip the whole time.",
    "Keep a slight bend in your elbow and move only at the shoulder.",
    "Open until your upper arm touches the floor lightly.",
    "Brace your abs so your torso doesn't roll.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell kickstand squat": [
    "Keep about 80% of your weight on the front leg.",
    "The back toes only help you balance.",
    "Squat straight down over the front foot.",
    "Keep the front heel flat and the knee tracking over your toes.",
    "Hold the dumbbell tight to your chest.",
    "A good step between two-leg squats and single-leg squats."
  ],
  "Dumbbell kneeling wood chopper": [
    "Kneel tall on both knees with your hips straight.",
    "Turn from your ribs and shoulders; keep your hips facing forward.",
    "Move the dumbbell on a diagonal from low on one side to high on the other.",
    "Keep your arms nearly straight.",
    "Squeeze your glutes so your lower back doesn't arch.",
    "Control the way down; don't let it drop."
  ],
  "Dumbbell Larsen press": [
    "Hold your legs straight out, off the floor, for the whole set.",
    "Without leg drive, your upper body does all the work.",
    "Brace your abs to stay balanced on the bench.",
    "Keep your shoulder blades pulled back.",
    "Use less weight than for a normal bench press.",
    "Lower under control so the dumbbells don't pull you off balance."
  ],
  "Dumbbell laying 30-degree shrug": [
    "Lie sideways on a low incline with the working arm on top.",
    "Keep the working arm completely straight.",
    "Pull your shoulder blade back and up; the elbow never bends.",
    "The movement is small: only the shoulder moves.",
    "Let the shoulder drop forward fully between reps.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell laying incline lateral raise": [
    "Lie on your side on an incline bench and hold the bench to brace yourself.",
    "Keep your elbow almost straight; don't bend and straighten it.",
    "Start with the dumbbell low across the front of your body.",
    "Raise until the dumbbell points at the ceiling.",
    "Use less weight than for a standing raise; the bottom is much harder here.",
    "Lower slowly."
  ],
  "Dumbbell laying reverse fly": [
    "Keep your chest on the pad the whole time.",
    "Keep your palms facing each other.",
    "Raise your arms out to the sides with a slight bend in the elbows.",
    "Stop at shoulder height and pause.",
    "Don't shrug or lift your chest to help.",
    "Lower slowly until your arms hang straight down."
  ],
  "Dumbbell laying reverse fly internally rotated": [
    "Keep your chest on the pad the whole time.",
    "Use an overhand grip with your thumbs pointing toward each other.",
    "Raise your arms out to the sides with a slight bend in the elbows.",
    "Stop at shoulder height and pause.",
    "Don't shrug or lift your chest to help.",
    "Lower slowly until your arms hang straight down."
  ],
  "Dumbbell laying row": [
    "Keep your chest on the bench so your lower back does no work.",
    "Let your arms hang fully before each pull.",
    "Pull your elbows up and back.",
    "Squeeze your shoulder blades together at the top.",
    "Don't lift your chest off the pad.",
    "Use a bench high enough for your arms to hang straight."
  ],
  "Dumbbell laying silverback shrug": [
    "Keep your chest on the pad and your arms completely straight.",
    "Pull your shoulder blades back and together; your elbows never bend.",
    "The movement is small: only the shoulder blades move.",
    "Let your shoulders drop forward fully between reps.",
    "Pause for a second at the top.",
    "Don't lift your chest off the pad."
  ],
  "Dumbbell leg curl": [
    "Squeeze the dumbbell firmly between your feet the whole time.",
    "Start light; dropping the dumbbell is the main risk.",
    "Keep your hips pressed into the bench.",
    "Curl until your shins are vertical.",
    "Lower slowly until your legs are straight.",
    "Ask someone to place the dumbbell if it is hard to pick up."
  ],
  "Dumbbell leg extension": [
    "Squeeze the dumbbell firmly between your feet the whole time.",
    "Lean back slightly and hold the bench.",
    "Straighten your knees until your quads contract hard.",
    "Lower slowly; don't let the dumbbell swing.",
    "Sit high enough that your feet don't touch the floor.",
    "Start light until the grip with your feet feels secure."
  ],
  "Dumbbell long-lever Russian twist": [
    "Keep your arms straight out in front; that is the long lever.",
    "Turn your shoulders, not just your arms.",
    "Use a lighter dumbbell than for a normal Russian twist.",
    "Lean back with a straight back.",
    "Move under control; don't swing the weight.",
    "Keep your feet flat on the floor."
  ],
  "Dumbbell neutral alternating overhead press": [
    "Keep your palms facing each other the whole time.",
    "Keep your elbows pointing forward, not out to the sides.",
    "Press one dumbbell while the other waits at your shoulder.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Finish with your biceps beside your ears.",
    "The neutral grip is usually easier on the shoulders."
  ],
  "Dumbbell neutral high incline bench press": [
    "Keep your palms facing each other the whole time.",
    "Tuck your elbows close to your ribs.",
    "Keep your shoulder blades pulled back against the pad.",
    "Lower the dumbbells beside your upper chest.",
    "Press straight up over your shoulders.",
    "The neutral grip is usually easier on the shoulders."
  ],
  "Dumbbell neutral incline bench press": [
    "Keep your palms facing each other the whole time.",
    "Tuck your elbows close to your ribs.",
    "Keep your shoulder blades pulled back against the pad.",
    "Lower the dumbbells beside your upper chest.",
    "Press straight up over your shoulders.",
    "The neutral grip is usually easier on the shoulders."
  ],
  "Dumbbell neutral overhead press": [
    "Keep your palms facing each other the whole time.",
    "Keep your elbows pointing forward, not out to the sides.",
    "Press both dumbbells up together.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Finish with your biceps beside your ears.",
    "The neutral grip is usually easier on the shoulders."
  ],
  "Dumbbell neutral seated overhead press": [
    "Keep your palms facing each other the whole time.",
    "Keep your elbows pointing forward, not out to the sides.",
    "Press both dumbbells up together.",
    "Keep your back against the pad.",
    "Finish with your biceps beside your ears.",
    "The neutral grip is usually easier on the shoulders."
  ],
  "Dumbbell overhead press": [
    "Keep your wrists stacked over your elbows.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Press straight up to a full lockout.",
    "Lower until the dumbbells are at shoulder height.",
    "Don't use your legs; that is a push press.",
    "Finish with your biceps beside your ears."
  ],
  "Dumbbell overhead side bend": [
    "Keep your arms straight and in line with your torso.",
    "Bend directly to the side; don't lean forward or back.",
    "Keep your hips still and your feet planted.",
    "Use a light dumbbell; the long lever makes it heavy.",
    "Go only as far as you can without twisting.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell overhead squat": [
    "Lock your arms out overhead and keep them there.",
    "Keep the dumbbells over the middle of your feet.",
    "Keep your chest up as you sit down.",
    "Go only as deep as you can with straight arms.",
    "Use light dumbbells; shoulder mobility is the limit.",
    "Push your knees out over your toes."
  ],
  "Dumbbell overhead tricep extension": [
    "Hold one dumbbell with both hands, palms under the top end.",
    "Keep your elbows close to your head and pointing up.",
    "Lower the dumbbell behind your head for a full stretch.",
    "Move only your forearms.",
    "Brace your abs so your lower back doesn't arch.",
    "Straighten your arms fully at the top."
  ],
  "Dumbbell Pendlay row": [
    "Keep your torso parallel to the floor for every rep.",
    "Let the dumbbells come to a full stop on the floor.",
    "Pull explosively to your lower ribs.",
    "Keep your back flat and your neck in line with it.",
    "Don't stand up as you pull.",
    "Reset your brace before each rep."
  ],
  "Dumbbell preacher curl": [
    "Keep your upper arms flat on the pad.",
    "Lower until your arms are almost straight; don't lock out hard.",
    "Curl without lifting your elbows off the pad.",
    "Don't rock your body to start the rep.",
    "Squeeze your biceps at the top.",
    "Lower slowly; the bottom is the hardest part."
  ],
  "Dumbbell push press": [
    "Dip straight down a little; keep your torso upright.",
    "Drive hard with your legs to start the dumbbells moving.",
    "Finish the press with your arms once the legs have done their part.",
    "Lock out overhead with your biceps beside your ears.",
    "Lower the dumbbells to your shoulders under control.",
    "Keep your heels down during the dip."
  ],
  "Dumbbell rear delt row": [
    "Flare your elbows out wide, level with your shoulders.",
    "Pull toward your chest, not your waist.",
    "Keep your back flat and your torso angle fixed.",
    "Use less weight than for a normal row.",
    "Squeeze the backs of your shoulders at the top.",
    "Lower slowly."
  ],
  "Dumbbell renegade row": [
    "Use hex dumbbells so they can't roll.",
    "Set your feet wide to stop your hips from twisting.",
    "Keep your hips level as you row.",
    "Pull your elbow close to your ribs.",
    "Press the supporting dumbbell hard into the floor.",
    "Keep your body in one straight line."
  ],
  "Dumbbell reverse curl": [
    "Keep an overhand grip: knuckles leading the whole way.",
    "Pin your elbows to your sides.",
    "Keep your wrists straight; don't let them bend back.",
    "Use less weight than for a normal curl.",
    "Don't swing your body to lift.",
    "Lower slowly."
  ],
  "Dumbbell reverse-grip bench press": [
    "Turn your palms to face your head and keep them there.",
    "Tuck your elbows close to your ribs.",
    "Lower the dumbbells toward your lower chest.",
    "Use less weight than for a normal bench press.",
    "Grip firmly; the wrists carry the load in an unusual position.",
    "Press up and slightly back over your shoulders."
  ],
  "Dumbbell Russian twist": [
    "Lift your feet a little off the floor and balance on your sit bones.",
    "Lean back with a straight back, not a rounded one.",
    "Turn your shoulders, not just your arms.",
    "Follow the dumbbell with your eyes.",
    "Move under control; don't swing.",
    "Put your heels down if your back starts to round."
  ],
  "Dumbbell seated Arnold press": [
    "Start with your palm facing you, then turn it forward as you press.",
    "Keep your back against the pad.",
    "Rotate smoothly through the whole press, not all at the bottom.",
    "Finish with your arm straight and your biceps by your ear.",
    "Lower under control and turn the palm back toward you.",
    "Press both dumbbells up together."
  ],
  "Dumbbell seated bent-arm lateral raise": [
    "Keep your elbow bent at 90 degrees the whole time.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Lift with your elbow, not your hand.",
    "Stop when your upper arm is level with your shoulder.",
    "Don't shrug; keep your shoulder away from your ear.",
    "Raise both elbows at the same speed."
  ],
  "Dumbbell seated curl": [
    "Keep the upper arm still; only the forearm moves.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep your palm facing up as you curl.",
    "Squeeze your biceps at the top.",
    "Lower slowly until the arm is fully straight.",
    "Curl both dumbbells together at an even pace."
  ],
  "Dumbbell seated full lateral raise": [
    "Keep your arm straight all the way overhead.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Turn your palm up as you pass shoulder height so the shoulder can move freely.",
    "Use less weight than for a normal lateral raise.",
    "Stop at shoulder height if going overhead pinches.",
    "Raise both arms at the same speed."
  ],
  "Dumbbell seated hammer curl": [
    "Keep your thumb on top the whole way.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep the upper arm still; only the forearm moves.",
    "Don't let your wrist bend or turn.",
    "Lower slowly until the arm is fully straight.",
    "Curl both dumbbells together at an even pace."
  ],
  "Dumbbell seated overhead tricep extension": [
    "Hold one dumbbell with both hands, palms under the top end.",
    "Keep your back against the pad.",
    "Keep your elbows close to your head and pointing up.",
    "Lower the dumbbell behind your head for a full stretch.",
    "Move only your forearms.",
    "Straighten your arms fully at the top."
  ],
  "Dumbbell seated rear delt row": [
    "Fold forward so your chest is close to your thighs.",
    "Flare your elbows out wide, level with your shoulders.",
    "Pull toward your chest, not your waist.",
    "Keep your chest down; don't sit up as you pull.",
    "Squeeze the backs of your shoulders at the top.",
    "Lower slowly."
  ],
  "Dumbbell seated reverse curl": [
    "Keep the overhand grip: knuckles lead the whole way.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep your wrist straight; don't let it bend back.",
    "Keep the upper arm still; only the forearm moves.",
    "Use less weight than for a normal curl.",
    "Curl both dumbbells together at an even pace."
  ],
  "Dumbbell seated shrug": [
    "Shrug straight up toward your ears; don't roll your shoulders.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep your arms straight; the elbows don't bend.",
    "Pause for a second at the top.",
    "Lower all the way for a full stretch.",
    "Keep your chin level; don't push your head forward."
  ],
  "Dumbbell seated single-arm Arnold press": [
    "Start with your palm facing you, then turn it forward as you press.",
    "Keep your back against the pad.",
    "Rotate smoothly through the whole press, not all at the bottom.",
    "Finish with your arm straight and your biceps by your ear.",
    "Lower under control and turn the palm back toward you.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm curl": [
    "Keep the upper arm still; only the forearm moves.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep your palm facing up as you curl.",
    "Squeeze your biceps at the top.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm full lateral raise": [
    "Keep your arm straight all the way overhead.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Turn your palm up as you pass shoulder height so the shoulder can move freely.",
    "Use less weight than for a normal lateral raise.",
    "Stop at shoulder height if going overhead pinches.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm hammer curl": [
    "Keep your thumb on top the whole way.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep the upper arm still; only the forearm moves.",
    "Don't let your wrist bend or turn.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm lateral raise": [
    "Lead with your elbow and keep a slight bend in it.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Stop at shoulder height.",
    "Keep your shoulder away from your ear; don't shrug.",
    "Lower slowly; don't let the dumbbell drop.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm reverse curl": [
    "Keep the overhand grip: knuckles lead the whole way.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Keep your wrist straight; don't let it bend back.",
    "Keep the upper arm still; only the forearm moves.",
    "Use less weight than for a normal curl.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated single-arm Zottman curl": [
    "Curl up with your palm up, lower with your palm down.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Flip your hand over at the top, not on the way.",
    "Lower slowly; the forearm works hardest on the way down.",
    "Choose a weight you can control in the overhand lowering.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell seated Zottman curl": [
    "Curl up with your palm up, lower with your palm down.",
    "Sitting takes your legs out of the lift, so keep your torso still.",
    "Flip your hand over at the top, not on the way.",
    "Lower slowly; the forearm works hardest on the way down.",
    "Choose a weight you can control in the overhand lowering.",
    "Keep both elbows pinned to your sides."
  ],
  "Dumbbell seated tibialis raise": [
    "Lift your toes toward your shins as high as they go.",
    "Keep your heels on the step the whole time.",
    "The dumbbells on your thighs add the load; keep them just above your knees.",
    "Hold at the top for a second.",
    "Lower slowly until your toes point down.",
    "This trains the front of the shin."
  ],
  "Dumbbell standing tibialis raise": [
    "Lift your toes toward your shins as high as they go.",
    "Keep your heels on the step the whole time.",
    "Keep your legs straight and lean lightly on the wall for balance.",
    "Hold at the top for a second.",
    "Lower slowly until your toes point down.",
    "This trains the front of the shin."
  ],
  "Dumbbell shoulder extension": [
    "Keep your arms straight; the movement is at the shoulders.",
    "Lean forward slightly and keep that angle.",
    "Sweep your arms back past your hips.",
    "Squeeze your lats and the backs of your shoulders at the top.",
    "Don't swing your torso.",
    "Use light dumbbells."
  ],
  "Dumbbell side step-up": [
    "Stand sideways to the box with the near foot on top.",
    "Push through the top leg; don't spring off the floor.",
    "Rise straight up without leaning toward the box.",
    "Keep the dumbbells at your sides.",
    "Lower the outside foot to the floor slowly.",
    "Keep the top knee in line with your toes."
  ],
  "Dumbbell silverback shrug": [
    "Lean forward about 30 degrees and keep that angle.",
    "Pull your shoulders up and back, not straight up.",
    "Squeeze your shoulder blades together at the top.",
    "Keep your arms straight.",
    "Keep your back flat.",
    "Lower slowly and let your shoulders drop forward."
  ],
  "Dumbbell single-arm Arnold press": [
    "Start with your palm facing you, then turn it forward as you press.",
    "Stand tall and don't swing your body to help.",
    "Rotate smoothly through the whole press, not all at the bottom.",
    "Finish with your arm straight and your biceps by your ear.",
    "Lower under control and turn the palm back toward you.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench wrist curl": [
    "Rest your whole forearm on the bench so only your wrist moves.",
    "Hold the forearm down with your free hand.",
    "Lower until you feel a stretch in your forearm.",
    "Move slowly; small muscles don't need momentum.",
    "Keep a firm grip so the dumbbell doesn't roll in your fingers.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm bench wrist extension": [
    "Rest your whole forearm on the bench so only your wrist moves.",
    "Hold the forearm down with your free hand.",
    "Use less weight than for wrist curls.",
    "Move slowly; small muscles don't need momentum.",
    "Keep a firm grip so the dumbbell doesn't roll in your fingers.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm chest press": [
    "Brace your abs so your torso doesn't roll toward the weight.",
    "Keep both shoulder blades flat on the bench.",
    "Plant both feet wide for balance.",
    "Lower the dumbbell to the side of your chest.",
    "Press straight up and squeeze your chest without twisting.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm press": [
    "Start with both arms locked out above your chest.",
    "Keep the resting arm straight and still while the other works.",
    "Lower the working dumbbell to the side of your chest.",
    "Brace your abs so your torso doesn't roll.",
    "Press back to a full lockout before the other side moves.",
    "Use less weight than when pressing both together."
  ],
  "Dumbbell alternating single-arm press": [
    "Start with both arms locked out above your chest.",
    "Keep the resting arm straight and still while the other works.",
    "Lower the working dumbbell to the side of your chest.",
    "Brace your abs so your torso doesn't roll.",
    "Press back to a full lockout before the other side moves.",
    "Use less weight than when pressing both together."
  ],
  "Dumbbell decline alternating single-arm press": [
    "Start with both arms locked out above your chest.",
    "Keep the resting arm straight and still while the other works.",
    "Lower the working dumbbell to the side of your chest.",
    "Brace your abs so your torso doesn't roll.",
    "Press back to a full lockout before the other side moves.",
    "Use less weight than when pressing both together."
  ],
  "Dumbbell single-arm clean and press": [
    "Drive with your hips to bring the dumbbell to your shoulder.",
    "Keep your back flat when you hinge down.",
    "Keep the dumbbell close to your body on the way up.",
    "Pause at the shoulder, then press.",
    "Don't lean away from the dumbbell as you press.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm hang clean and press": [
    "Drive with your hips to bring the dumbbell to your shoulder.",
    "Start each rep from the hang; the dumbbell never touches the floor.",
    "Keep the dumbbell close to your body on the way up.",
    "Pause at the shoulder, then press.",
    "Don't lean away from the dumbbell as you press.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm floor fly": [
    "Keep a slight bend in your elbow the whole time.",
    "Open your arm until the upper arm touches the floor lightly.",
    "Brace your abs so your torso doesn't roll.",
    "Squeeze your chest to bring the dumbbell back up.",
    "Don't bounce your arm off the floor.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm front rack step-up": [
    "Hold one dumbbell at your shoulder with your elbow up.",
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Don't lean toward the loaded side.",
    "Stand all the way up before you step down.",
    "Lower yourself under control."
  ],
  "Dumbbell single-arm front rack step-up knee drive": [
    "Hold one dumbbell at your shoulder with your elbow up.",
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Don't lean toward the loaded side.",
    "Pause on one leg before you step down.",
    "Lower yourself under control."
  ],
  "Dumbbell single-arm full lateral raise": [
    "Keep your arm straight all the way overhead.",
    "Stand tall and don't swing your body to help.",
    "Turn your palm up as you pass shoulder height so the shoulder can move freely.",
    "Use less weight than for a normal lateral raise.",
    "Stop at shoulder height if going overhead pinches.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm hammer curl": [
    "Keep your thumb on top the whole way.",
    "Stand tall and don't swing your body to help.",
    "Keep the upper arm still; only the forearm moves.",
    "Don't let your wrist bend or turn.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm high incline chest press": [
    "Brace your abs so your torso doesn't roll toward the weight.",
    "Keep both shoulder blades against the pad.",
    "Lower the dumbbell beside your upper chest.",
    "Press straight up over your shoulder.",
    "Plant both feet wide for balance.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline chest press": [
    "Brace your abs so your torso doesn't roll toward the weight.",
    "Keep both shoulder blades against the pad.",
    "Lower the dumbbell beside your upper chest.",
    "Press straight up over your shoulder.",
    "Plant both feet wide for balance.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline curl": [
    "Keep the upper arm still; only the forearm moves.",
    "Keep your head and back on the pad and let the arm hang behind your torso for a full stretch.",
    "Keep your palm facing up as you curl.",
    "Squeeze your biceps at the top.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline hammer curl": [
    "Keep your thumb on top the whole way.",
    "Keep your head and back on the pad and let the arm hang behind your torso for a full stretch.",
    "Keep the upper arm still; only the forearm moves.",
    "Don't let your wrist bend or turn.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline reverse curl": [
    "Keep the overhand grip: knuckles lead the whole way.",
    "Keep your head and back on the pad and let the arm hang behind your torso for a full stretch.",
    "Keep your wrist straight; don't let it bend back.",
    "Keep the upper arm still; only the forearm moves.",
    "Use less weight than for a normal curl.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline skull crusher": [
    "Keep your upper arm pointing straight up and still.",
    "Hold the working upper arm with your free hand to keep it steady.",
    "Bend only at the elbow.",
    "Lower the dumbbell beside your ear, not onto your forehead.",
    "Straighten your arm fully and squeeze your triceps.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm incline twisting curl": [
    "Start with a hammer grip and turn your palm up as you curl.",
    "Keep your head and back on the pad and let the arm hang behind your torso for a full stretch.",
    "Finish with your palm facing your shoulder.",
    "Keep the upper arm still; only the forearm moves.",
    "Turn your palm back in as you lower.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm Larsen press": [
    "Hold your legs straight out, off the floor, for the whole set.",
    "Brace your abs hard; one dumbbell and no feet makes balance the challenge.",
    "Keep both shoulder blades flat on the bench.",
    "Lower the dumbbell to the side of your chest under control.",
    "Use less weight than for a normal single-arm press.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm lateral raise": [
    "Lead with your elbow and keep a slight bend in it.",
    "Stand tall and don't swing your body to help.",
    "Stop at shoulder height.",
    "Keep your shoulder away from your ear; don't shrug.",
    "Lower slowly; don't let the dumbbell drop.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm neutral overhead press": [
    "Keep your palm facing inward the whole time.",
    "Keep your elbow pointing forward, not out to the side.",
    "Don't lean away from the dumbbell.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Finish with your biceps beside your ear.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm overhead press": [
    "Keep your wrist stacked over your elbow.",
    "Don't lean away from the dumbbell.",
    "Squeeze your glutes and abs so your lower back doesn't arch.",
    "Press straight up to a full lockout.",
    "Finish with your biceps beside your ear.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm Pendlay row": [
    "Keep your torso parallel to the floor for every rep.",
    "Let the dumbbell come to a full stop on the floor.",
    "Brace your free hand on your knee.",
    "Pull your elbow toward the ceiling, close to your ribs.",
    "Don't rotate your torso as you pull.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm preacher curl": [
    "Keep your upper arm flat on the pad.",
    "Hold the top of the pad with your free hand.",
    "Lower until your arm is almost straight; don't lock out hard.",
    "Curl without lifting your elbow off the pad.",
    "Lower slowly; the bottom is the hardest part.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm pullover": [
    "Keep a slight bend in your elbow and hold it there.",
    "Lower the dumbbell back over your head until you feel a stretch in your lat.",
    "Keep your ribs down; don't arch your back to reach further.",
    "Pull the dumbbell back over your chest with your lat, not your elbow.",
    "Use a lighter dumbbell than for a two-hand pullover.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm push press": [
    "Dip straight down a little; keep your torso upright.",
    "Drive hard with your legs to start the dumbbell moving.",
    "Finish the press with your arm once the legs have done their part.",
    "Don't lean away from the dumbbell.",
    "Lower the dumbbell to your shoulder under control.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm rear delt row": [
    "Flare your elbow out wide, level with your shoulder.",
    "Pull toward your chest, not your waist.",
    "Brace your free hand on your knee.",
    "Don't rotate your torso to lift higher.",
    "Use less weight than for a normal row.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm seated overhead tricep extension": [
    "Keep your upper arm beside your head and pointing up.",
    "Hold the working upper arm with your free hand to keep it steady.",
    "Lower the dumbbell behind your neck for a full stretch.",
    "Keep your back against the pad.",
    "Straighten your arm fully at the top.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm shoulder extension": [
    "Keep your arm straight; the movement is at the shoulder.",
    "Brace your free hand on your thigh.",
    "Sweep your arm back past your hip.",
    "Squeeze your lat and the back of your shoulder at the top.",
    "Don't rotate your torso to lift higher.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm skull crusher": [
    "Keep your upper arm vertical and still.",
    "Hold the working upper arm with your free hand to keep it steady.",
    "Bend only at the elbow.",
    "Lower the dumbbell beside your ear, not onto your forehead.",
    "Straighten your arm fully and squeeze your triceps.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm spider curl": [
    "Keep your chest on the pad the whole time.",
    "Let your upper arm hang straight down and keep it there.",
    "Curl without swinging the elbow back.",
    "Squeeze your biceps hard at the top.",
    "Lower slowly until your arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm step-up": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Hold the dumbbell at your side and don't lean toward it.",
    "Stand all the way up before you step down.",
    "Lower yourself under control.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm step-up knee drive": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Drive the free knee up to hip height as you stand.",
    "Pause on one leg before you step down.",
    "Hold the dumbbell at your side and don't lean toward it.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell step-up knee drive": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Drive the free knee up to hip height as you stand.",
    "Pause on one leg before you step down.",
    "Keep the dumbbells still at your sides.",
    "Lower yourself under control."
  ],
  "Dumbbell single-arm thruster": [
    "Use the drive out of the squat to launch the dumbbell.",
    "Keep the dumbbell at your shoulder in the squat.",
    "Keep your chest up and your shoulders level.",
    "Lock the arm out as your legs finish straightening.",
    "Bring the dumbbell back to the shoulder before you squat again.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm upright row": [
    "Lead with your elbow; it stays above your hand.",
    "Keep the dumbbell close to your body.",
    "Stop at lower-chest height; going higher can pinch the shoulder.",
    "Don't lean away or shrug to lift it.",
    "Lower slowly.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-arm Z press": [
    "Sit tall on the floor; don't lean back or sideways as you press.",
    "Keep your legs straight and your heels on the floor.",
    "Brace your abs hard, since there is no back support.",
    "Go lighter than a standing press.",
    "Finish with your biceps beside your ear.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell single-leg single-arm deadlift": [
    "Keep your hips square to the floor; don't let one side open up.",
    "Move your torso and back leg together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Keep your back flat and the dumbbell close to the standing leg.",
    "Touch your back foot down between reps if you lose balance.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell sit-up": [
    "Hold the dumbbell against your upper chest.",
    "Roll up one vertebra at a time; don't jerk.",
    "Keep your feet on the floor.",
    "Breathe out as you come up.",
    "Lower slowly; don't drop back.",
    "Hook your feet under something if they lift."
  ],
  "Dumbbell spinal Jefferson curl": [
    "Use very light dumbbells; this is a mobility drill, not a strength lift.",
    "Roll down one vertebra at a time, starting with your chin.",
    "Keep your legs straight.",
    "Let the dumbbells pull you gently into the stretch.",
    "Roll back up slowly in the reverse order.",
    "Stop if you feel pain in your back."
  ],
  "Dumbbell split squat": [
    "Keep your feet where they are for the whole set.",
    "Lower straight down between your feet.",
    "Keep most of your weight on the front heel.",
    "Stop with the back knee just above the floor.",
    "Keep your torso upright and the dumbbells still.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell squeeze press": [
    "Press the dumbbells together as hard as you can the whole time.",
    "Keep them touching from the chest to lockout.",
    "Keep your elbows tucked.",
    "Use less weight than a normal press; the squeeze does the work.",
    "Lower slowly to the middle of your chest.",
    "Keep your shoulder blades pulled back."
  ],
  "Dumbbell staggered deadlift": [
    "Keep about 80% of your weight on the front leg.",
    "The back toes only help you balance.",
    "Push your hips straight back; the front knee bends only a little.",
    "Keep your back flat and the dumbbells close to the front leg.",
    "Stop when you feel a strong stretch in the front hamstring.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell standing single-arm curl": [
    "Keep the upper arm still; only the forearm moves.",
    "Stand tall and don't swing your body to help.",
    "Keep your palm facing up as you curl.",
    "Squeeze your biceps at the top.",
    "Lower slowly until the arm is fully straight.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell standing single-arm reverse curl": [
    "Keep the overhand grip: knuckles lead the whole way.",
    "Stand tall and don't swing your body to help.",
    "Keep your wrist straight; don't let it bend back.",
    "Keep the upper arm still; only the forearm moves.",
    "Use less weight than for a normal curl.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell standing single-arm twisting curl": [
    "Start with a hammer grip and turn your palm up as you curl.",
    "Stand tall and don't swing your body to help.",
    "Finish with your palm facing your shoulder.",
    "Keep the upper arm still; only the forearm moves.",
    "Turn your palm back in as you lower.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell twisting curl": [
    "Start with a hammer grip and turn your palm up as you curl.",
    "Stand tall and don't swing your body to help.",
    "Finish with your palm facing your shoulder.",
    "Keep the upper arm still; only the forearm moves.",
    "Turn your palm back in as you lower.",
    "Curl both dumbbells together at an even pace."
  ],
  "Dumbbell swing": [
    "Grip one end of the dumbbell with both hands and hold on firmly.",
    "The power comes from your hips, not your arms.",
    "Hinge back; don't squat down.",
    "Keep your back flat and your arms loose.",
    "Stop at chest height; stand tall with your glutes squeezed.",
    "Let the dumbbell swing back between your legs before the next rep."
  ],
  "Dumbbell Tate press": [
    "Flare your elbows out to the sides and keep them high.",
    "Lower the dumbbells inward toward the middle of your chest.",
    "Move only your forearms; the upper arms stay still.",
    "Use light dumbbells; this is hard on the elbows if rushed.",
    "Straighten your arms fully and squeeze your triceps.",
    "Touch the chest lightly; don't rest there."
  ],
  "Dumbbell thruster": [
    "Use the drive out of the squat to launch the dumbbells.",
    "Keep the dumbbells at your shoulders in the squat.",
    "Keep your chest up at the bottom of the squat.",
    "Lock your arms out as your legs finish straightening.",
    "Bring the dumbbells back to your shoulders before you squat again.",
    "Keep a steady rhythm; one smooth movement per rep."
  ],
  "Dumbbell upright row": [
    "Lead with your elbows; they stay above your hands.",
    "Keep the dumbbells close to your body.",
    "Stop at upper-chest height; going higher can pinch the shoulders.",
    "Dumbbells let your hands move freely, which is easier on the wrists than a bar.",
    "Don't lean back or shrug to lift them.",
    "Lower slowly."
  ],
  "Dumbbell wood chopper": [
    "Move the dumbbell on a diagonal from low on one side to high on the other.",
    "Turn your whole torso and pivot on the back foot.",
    "Keep your arms nearly straight.",
    "Follow the dumbbell with your eyes.",
    "Control the way down; don't let it drop.",
    "Do the same number of reps on each side."
  ],
  "Dumbbell Z press": [
    "Sit tall on the floor; don't lean back as you press.",
    "Keep your legs straight and your heels on the floor.",
    "Brace your abs hard, since there is no back support.",
    "Go lighter than a standing press.",
    "Press straight up to a full lockout.",
    "Tight hamstrings make this harder; sit on a thin pad if you can't stay upright."
  ],
  "Dumbbell assisted Bulgarian split squat": [
    "Hold a post or rack with one hand for balance only; don't pull yourself up with it.",
    "Stand far enough from the bench that your front shin stays close to vertical.",
    "Keep most of your weight on the front leg.",
    "Lower straight down until the front thigh is parallel to the floor.",
    "The support lets you focus on the leg instead of balance.",
    "Do the same number of reps on each side."
  ],
  "Barbell low-bar squat": [
    "Rest the bar on your rear shoulders, a few centimetres below the top of your traps.",
    "Squeeze your shoulder blades together to make a shelf for the bar.",
    "Push your hips back first and let your torso lean forward.",
    "Keep the bar over the middle of your feet.",
    "Keep your back flat from start to finish.",
    "Keep your knees in line with your toes."
  ],
  "Barbell front squat bodybuilding": [
    "Cross your arms and rest each hand on the bar at the opposite shoulder.",
    "Keep your elbows up at shoulder height the whole time.",
    "The bar sits on your shoulders, close to your neck; your hands only steady it.",
    "Keep your torso upright.",
    "Keep your knees in line with your toes.",
    "Take the bar from a rack set just below shoulder height."
  ],
  "Barbell heels-up back squat": [
    "Stand with your heels on a wedge or small plates and your toes on the floor.",
    "Let your knees travel forward over your toes.",
    "The raised heels let you sit deeper; use that range.",
    "Keep your torso upright.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Keep your knees in line with your toes."
  ],
  "Barbell heels-up front squat": [
    "Stand with your heels on a wedge or small plates and your toes on the floor.",
    "Keep your elbows high so the bar stays on your shoulders.",
    "Let your knees travel forward over your toes.",
    "The raised heels let you sit deeper; use that range.",
    "Keep your torso upright.",
    "Take the bar from a rack set just below shoulder height."
  ],
  "Barbell Zercher squat": [
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "Keep your fists up near your chest so the bar can't roll forward.",
    "Let your elbows pass between your knees at the bottom.",
    "Keep your torso upright.",
    "Brace your core before every rep.",
    "Keep your knees in line with your toes."
  ],
  "Barbell kickstand squat": [
    "Keep almost all your weight on the front leg; the back foot only helps you balance.",
    "Put the back toes level with the front heel, heel lifted.",
    "It is a squat, not a lunge: keep your feet close together.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Keep your front knee in line with your toes.",
    "Do the same number of reps on each side."
  ],
  "Barbell cossack squat": [
    "Take a stance about twice shoulder width.",
    "Keep the heel of the bent leg flat on the floor.",
    "Keep the other leg straight and let its toes point up.",
    "Keep the bar level as you shift from side to side.",
    "Start lighter than you think; balance limits this lift.",
    "Pull the bar down into your upper back and keep your chest up."
  ],
  "Barbell split squat": [
    "Your feet stay where they are for the whole set.",
    "Drop straight down; don't lunge forward.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Push through your whole front foot, not just the toes.",
    "Do the same number of reps on each side."
  ],
  "Barbell Bulgarian split squat": [
    "Rest the top of your back foot on the bench; don't push off it.",
    "Stand far enough from the bench that your front shin stays almost vertical.",
    "Use a rack so you can get the bar on and off safely.",
    "Keep your front knee in line with your toes.",
    "Push through your whole front foot, not just the toes.",
    "Do the same number of reps on each side."
  ],
  "Barbell landmine sissy squat": [
    "Anchor one end of the bar in a landmine or a corner.",
    "Keep your hips straight: knees, hips and shoulders stay in one line.",
    "Let your heels lift as your knees travel forward.",
    "Go only as deep as your knees allow without pain.",
    "Start with the empty bar.",
    "Lower under control; don't drop into the bottom."
  ],
  "Barbell forward lunge": [
    "Take a step long enough that your front shin stays close to vertical.",
    "Touch the back knee down softly, or stop just above the floor.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Push back hard off the front foot to return in one step."
  ],
  "Barbell reverse lunge": [
    "Step back far enough that your front shin stays close to vertical.",
    "Keep your weight on the front foot; the back foot only balances.",
    "Touch the back knee down softly, or stop just above the floor.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Pull the bar down into your upper back and keep your chest up."
  ],
  "Barbell lateral lunge": [
    "Sit your hips back over the bent leg.",
    "Keep the other leg straight with its foot flat on the floor.",
    "Keep both feet pointing forward.",
    "Keep the bar level and your chest up.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Start lighter than you think; balance limits this lift."
  ],
  "Barbell curtsy lunge": [
    "Step back and across, like a curtsy, without twisting your torso.",
    "Keep your hips and shoulders facing forward.",
    "Keep most of your weight on the front leg.",
    "Keep your front knee in line with your toes.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Start lighter than you think; balance limits this lift."
  ],
  "Barbell deficit lunge": [
    "Use a low step or a plate, about 10 cm high.",
    "The platform lets your hips sink lower than on the floor; use that range.",
    "Keep your weight on the foot that stays on the platform.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Pull the bar down into your upper back and keep your chest up."
  ],
  "Barbell curtsy deficit lunge": [
    "Use a low step or a plate, about 10 cm high.",
    "Step back and across, like a curtsy, without twisting your torso.",
    "Keep your hips and shoulders facing forward.",
    "The platform lets your hips sink lower than on the floor; use that range.",
    "Keep your front knee in line with your toes.",
    "Start lighter than you think; balance limits this lift."
  ],
  "Barbell front rack deficit lunge": [
    "Use a low step or a plate, about 10 cm high.",
    "Keep your elbows high so the bar stays on your shoulders.",
    "The platform lets your hips sink lower than on the floor; use that range.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Take the bar from a rack set just below shoulder height."
  ],
  "Barbell Zercher deficit lunge": [
    "Use a low step or a plate, about 10 cm high.",
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "The platform lets your hips sink lower than on the floor; use that range.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Brace your core before every rep."
  ],
  "Barbell side step-up": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Stand sideways to the box and rise straight up, not toward it.",
    "Keep the bar level and your hips square.",
    "Lower yourself under control.",
    "Do the same number of reps on each side."
  ],
  "Barbell step-up knee drive": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Drive the free knee up to hip height as you stand.",
    "Pause on one leg before you step down.",
    "Pull the bar down into your upper back and keep your chest up.",
    "Do the same number of reps on each side."
  ],
  "Barbell front rack step-up": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Keep your elbows high so the bar stays on your shoulders.",
    "Keep your torso upright.",
    "Lower yourself under control.",
    "Do the same number of reps on each side."
  ],
  "Barbell front rack step-up knee drive": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor.",
    "Keep your elbows high so the bar stays on your shoulders.",
    "Drive the free knee up to hip height as you stand.",
    "Pause on one leg before you step down.",
    "Do the same number of reps on each side."
  ],
  "Barbell feet-elevated glute bridge": [
    "Press your heels down into the bench.",
    "Stop when your knees, hips and shoulders are in one line.",
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Put a pad or folded mat under the bar.",
    "Lower under control; don't drop into the bottom."
  ],
  "Barbell feet-elevated single-leg glute bridge": [
    "Press your heels down into the bench.",
    "Keep your hips level; don't let one side drop.",
    "Keep the free leg up and still.",
    "Squeeze your glutes hard at the top.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell feet-elevated figure-four glute bridge": [
    "Press your heels down into the bench.",
    "Let the crossed knee fall out to the side and keep it relaxed.",
    "Keep your hips level; don't let one side drop.",
    "Squeeze your glutes hard at the top.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell feet-elevated staggered glute bridge": [
    "Do most of the work with the near leg; the far heel only helps.",
    "Press your heels down into the bench.",
    "Keep your hips level; don't let one side drop.",
    "Squeeze your glutes hard at the top.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell figure-four hip thrust": [
    "Rest the bottom of your shoulder blades on the edge of the bench.",
    "Let the crossed knee fall out to the side and keep it relaxed.",
    "Keep your hips level; don't let one side drop.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell figure-four heels-elevated hip thrust": [
    "Rest the bottom of your shoulder blades on the edge of the bench.",
    "Rest the working heel on a low step with the toes lifted.",
    "Let the crossed knee fall out to the side and keep it relaxed.",
    "Keep your hips level; don't let one side drop.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell heels-elevated hip thrust": [
    "Rest the bottom of your shoulder blades on the edge of the bench.",
    "Rest both heels on a low step with your toes lifted.",
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Put a pad or folded mat under the bar."
  ],
  "Barbell single-leg hip thrust": [
    "Rest the bottom of your shoulder blades on the edge of the bench.",
    "Keep your hips level; don't let one side drop.",
    "Keep the free leg in line with the working thigh.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell single-leg heels-elevated hip thrust": [
    "Rest the bottom of your shoulder blades on the edge of the bench.",
    "Rest the working heel on a low step with the toes lifted.",
    "Keep your hips level; don't let one side drop.",
    "Keep the free leg in line with the working thigh.",
    "Put a pad or folded mat under the bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell block conventional deadlift": [
    "Rest the plates on blocks so the bar starts just below your knees.",
    "The shorter pull lets you use more weight than from the floor.",
    "Pull your shoulders down and back before the bar leaves the floor.",
    "Keep your back flat from start to finish.",
    "Keep the bar close to your legs.",
    "Finish by standing tall; don't lean back."
  ],
  "Barbell deficit conventional deadlift": [
    "Stand on a plate or low platform, 5 to 10 cm high.",
    "The bar starts lower, so sit your hips a little lower too.",
    "Use less weight than for a deadlift from the floor.",
    "Pull your shoulders down and back before the bar leaves the floor.",
    "Keep your back flat from start to finish.",
    "Keep the bar close to your legs."
  ],
  "Barbell snatch-grip deadlift": [
    "Grip the bar very wide, hands near the plates.",
    "The wide grip makes you start lower: keep your chest up.",
    "The wide grip is hard on the hands; straps are fine.",
    "Pull your shoulders down and back before the bar leaves the floor.",
    "Keep your back flat from start to finish.",
    "Keep the bar close to your legs."
  ],
  "Barbell snatch-grip Romanian deadlift": [
    "Grip the bar very wide, hands near the plates.",
    "Push your hips back; the knees bend only a little.",
    "Go down until you feel a stretch in the back of your thigh, then come up.",
    "The wide grip is hard on the hands; straps are fine.",
    "Keep your back flat from start to finish.",
    "Keep the bar close to your legs."
  ],
  "Barbell Jefferson deadlift": [
    "Straddle the bar: one foot on each side of it.",
    "Grip with one hand in front of your body and one behind.",
    "Keep your torso upright and facing forward; don't let it twist.",
    "Lift the bar straight up between your legs.",
    "Switch which hand and foot are in front every set.",
    "Start lighter than you think; balance limits this lift."
  ],
  "Barbell reverse deadlift": [
    "The bar stays behind your legs for the whole lift.",
    "Keep your torso upright and your heels down.",
    "Lift with your legs, like a squat.",
    "Let the bar slide up the back of your legs.",
    "Raising your heels on small plates makes it easier to stay upright.",
    "Keep your back flat from start to finish."
  ],
  "Barbell suitcase deadlift": [
    "Grip the exact middle of the bar so it stays level.",
    "Keep your shoulders level; don't lean toward the bar.",
    "Brace your side as if someone were pushing you over.",
    "Start with the empty bar; grip and balance limit this lift.",
    "Keep your back flat from start to finish.",
    "Do the same number of reps on each side."
  ],
  "Barbell staggered deadlift": [
    "Keep the front foot flat and almost all your weight on it.",
    "The back foot stays on its toes and only helps you balance.",
    "Push your hips back; the knees bend only a little.",
    "Go down until you feel a stretch in the back of your thigh, then come up.",
    "Keep your back flat from start to finish.",
    "Do the same number of reps on each side."
  ],
  "Barbell single-leg deadlift": [
    "Keep your hips square to the floor; don't let the free hip open up.",
    "Your torso and the free leg move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "It is fine to tap the free foot down between reps.",
    "Keep your back flat from start to finish.",
    "Start lighter than you think; balance limits this lift."
  ],
  "Barbell low-bar good morning": [
    "Rest the bar on your rear shoulders, a few centimetres below the top of your traps.",
    "Push your hips back; the knees bend only a little.",
    "Go down until you feel a stretch in the back of your thighs, then come up.",
    "Keep your back flat from start to finish.",
    "Start light: a good morning needs far less weight than a squat.",
    "Brace your core before every rep."
  ],
  "Barbell Zercher good morning": [
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "Push your hips back; the knees bend only a little.",
    "Go down until you feel a stretch in the back of your thighs, then come up.",
    "Keep the bar against your body as you tip forward.",
    "Keep your back flat from start to finish.",
    "Start light: a good morning needs far less weight than a squat."
  ],
  "Barbell spinal Jefferson curl": [
    "Use a very light bar; this is a slow, loaded stretch, not a strength lift.",
    "Round your spine one segment at a time, starting from the neck.",
    "Keep your legs straight and your weight over the middle of your feet.",
    "Move slowly both ways; never bounce at the bottom.",
    "Stop if you feel pain in your back.",
    "Let the bar hang from relaxed, straight arms."
  ],
  "Barbell supinated Pendlay row": [
    "Use an underhand grip, palms facing forward.",
    "Let the plates rest on the floor between reps.",
    "Keep your torso parallel to the floor; don't stand up as you pull.",
    "Pull your elbows back close to your ribs.",
    "Keep your back flat from start to finish.",
    "Brace your core before every rep."
  ],
  "Barbell Meadows row": [
    "Anchor one end of the bar in a landmine or a corner and load the other end.",
    "Stand sideways to the bar and grip the thick end sleeve overhand.",
    "Let your elbow travel up and out, away from your side.",
    "Rest your free forearm on your front thigh to support your back.",
    "Small plates give a longer range of motion.",
    "Do the same number of reps on each side."
  ],
  "Barbell landmine side bend": [
    "Anchor one end of the bar in a landmine or a corner.",
    "Bend straight to the side; don't lean forward or back.",
    "Keep your hips and shoulders facing forward.",
    "Move slowly and feel the side of your waist stretch and squeeze.",
    "Start with the empty bar.",
    "Do the same number of reps on each side."
  ],
  "Barbell 30-degree shrug": [
    "Grip wide enough that your arms angle out about 30 degrees.",
    "Shrug up and slightly in, along the line of your arms.",
    "Keep your arms straight; only your shoulders move.",
    "Hold the top for a second.",
    "Let your shoulders drop fully at the bottom for a stretch.",
    "Keep your head still; don't push your chin forward."
  ],
  "Barbell behind-the-back shrug": [
    "Hold the bar behind you, against the backs of your thighs.",
    "Keep your chest up; don't lean forward to clear your glutes.",
    "Keep your arms straight; only your shoulders move.",
    "Shrug straight up and down; don't roll your shoulders.",
    "Hold the top for a second.",
    "Keep your head still; don't push your chin forward."
  ],
  "Barbell behind-the-back 30-degree shrug": [
    "Hold the bar behind you with a wide grip so your arms angle out about 30 degrees.",
    "Shrug up and slightly in, along the line of your arms.",
    "Keep your chest up; don't lean forward.",
    "Keep your arms straight; only your shoulders move.",
    "Hold the top for a second.",
    "Keep your head still; don't push your chin forward."
  ],
  "Barbell silverback shrug": [
    "Lean forward about 30 degrees and stay there.",
    "Pull your shoulder blades back and up, not just up.",
    "Keep your arms straight; only your shoulders move.",
    "Keep your back flat from start to finish.",
    "Hold the top for a second.",
    "Let your shoulders drop fully at the bottom for a stretch."
  ],
  "Barbell shoulder extension": [
    "Hold the bar behind you with straight arms, palms facing back.",
    "Lift the bar back and up with your arms straight; the range is small.",
    "Keep your chest up; don't bend forward to lift higher.",
    "Squeeze your lats and the backs of your shoulders at the top.",
    "Use a light bar; the empty bar is often enough.",
    "Lower the bar more slowly than you raised it."
  ],
  "Barbell front raise": [
    "Raise the bar until your hands are at eye level.",
    "Keep your arms straight the whole time.",
    "Don't lean back or swing the bar up.",
    "Lower the bar more slowly than you raised it.",
    "Use a light bar; the empty bar is often enough.",
    "Brace your core before every rep."
  ],
  "Barbell full front raise": [
    "Raise the bar all the way overhead, arms beside your ears.",
    "Keep your ribs down as the bar passes shoulder height.",
    "Keep your arms straight the whole time.",
    "Don't lean back or swing the bar up.",
    "Lower the bar more slowly than you raised it.",
    "Use a light bar; the empty bar is often enough."
  ],
  "Barbell seated full front raise": [
    "Keep your back and head against the pad.",
    "Raise the bar all the way up until your arms are in line with your torso.",
    "The bench stops you leaning back, so the weight will feel heavier.",
    "Keep your arms straight the whole time.",
    "Lower the bar more slowly than you raised it.",
    "Use a light bar; the empty bar is often enough."
  ],
  "Barbell behind-the-neck press": [
    "Only do this if your shoulders move there without pain.",
    "Lower the bar only to ear level or the base of your skull, not onto your neck.",
    "Use a wide grip so your forearms stay vertical.",
    "Use less weight than for a press from the front.",
    "Keep your head upright; don't push it far forward.",
    "Brace your core before every rep."
  ],
  "Barbell behind-the-neck seated overhead press": [
    "Only do this if your shoulders move there without pain.",
    "Lower the bar only to ear level or the base of your skull, not onto your neck.",
    "Use a wide grip so your forearms stay vertical.",
    "Use less weight than for a press from the front.",
    "Sit upright with your back against the support.",
    "Keep your head upright; don't push it far forward."
  ],
  "Barbell Bradford press": [
    "Lift the bar just high enough to clear your head; don't lock out.",
    "Front to back and back to front counts as one rep.",
    "Move smoothly; the shoulders stay under tension the whole set.",
    "Only do this if your shoulders move there without pain.",
    "Use less weight than for a press from the front.",
    "Keep your head upright; don't push it far forward."
  ],
  "Barbell Z press": [
    "Sit tall on the floor with your legs straight; don't lean back.",
    "With no back support and no legs to help, use much less weight than standing.",
    "Set the bar on low rack pins or have a partner hand it to you.",
    "Finish with the bar over the back of your head.",
    "Keep your wrists straight above your elbows.",
    "Brace your core before every rep."
  ],
  "Barbell high incline bench press": [
    "Set the bench at about 60 degrees.",
    "Lower the bar to your upper chest, just below the collarbones.",
    "The steep angle moves the work toward your shoulders.",
    "Keep your feet flat on the floor and your shoulder blades pulled back.",
    "Keep your wrists straight above your elbows.",
    "Don't let your hips slide down the seat."
  ],
  "Barbell guillotine incline bench press": [
    "Lower the bar toward your collarbones, not your chest.",
    "Flare your elbows straight out to the sides.",
    "Use far less weight than for a normal incline press.",
    "Use a spotter or safety arms: the bar travels over your neck.",
    "Lower slowly and stop when you feel a deep chest stretch.",
    "Keep your feet flat on the floor and your shoulder blades pulled back."
  ],
  "Barbell guillotine high incline bench press": [
    "Set the bench at about 60 degrees.",
    "Lower the bar toward your collarbones, not your chest.",
    "Flare your elbows straight out to the sides.",
    "Use far less weight than for a normal incline press.",
    "Use a spotter or safety arms: the bar travels over your neck.",
    "Keep your feet flat on the floor and your shoulder blades pulled back."
  ],
  "Barbell reverse-grip bench press": [
    "Grip the bar underhand, palms facing your face.",
    "Wrap your thumbs around the bar; never use a thumbless grip here.",
    "Lower the bar to your lower chest.",
    "Have a spotter help you take the bar off the rack; the unrack is awkward.",
    "Keep your elbows tucked close to your ribs.",
    "Keep your feet flat on the floor and your shoulder blades pulled back."
  ],
  "Barbell decline close-grip bench press": [
    "Grip the bar at shoulder width, no narrower.",
    "Hook your shins firmly under the leg pads.",
    "Lower the bar to your lower chest.",
    "Keep your elbows tucked close to your ribs.",
    "Keep your shoulder blades pulled back and down.",
    "Use a spotter or safety arms."
  ],
  "Barbell hooklying bench press": [
    "Put both feet flat on the bench with your knees bent.",
    "Your lower back stays flat on the bench: no arch.",
    "Without leg drive you will press less than in a normal bench press.",
    "Keep your body still on the bench; brace your core so you don't rock.",
    "Keep your shoulder blades pulled back and down.",
    "Use a spotter or safety arms."
  ],
  "Barbell Larsen bench press": [
    "Hold both legs straight out off the floor, level with the bench.",
    "Squeeze your legs and glutes so your body doesn't rock.",
    "Without leg drive you will press less than in a normal bench press.",
    "Keep your body still on the bench; brace your core so you don't rock.",
    "Keep your shoulder blades pulled back and down.",
    "Use a spotter or safety arms."
  ],
  "Barbell JM press": [
    "It is half close-grip bench press, half skull crusher.",
    "Let your elbows travel forward and bend deeply as the bar comes down.",
    "Lower the bar toward your throat or chin, and stop a few centimetres above it.",
    "Keep your upper arms at about 45 degrees to your torso.",
    "Start light and add weight slowly; it is hard on the elbows.",
    "Use a spotter or safety arms."
  ],
  "Barbell overhead tricep extension": [
    "Keep your upper arms beside your ears, elbows pointing at the ceiling.",
    "Only your forearms move.",
    "Lower until you feel a stretch in your triceps.",
    "Be careful getting the bar overhead: press it up first, then start.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "An EZ bar is easier on the wrists if you have one."
  ],
  "Barbell wrist curl": [
    "Rest your forearms on your thighs with your palms up.",
    "Keep your forearms on your thighs; only your hands move.",
    "Let the bar roll down to your fingertips, then curl it back up.",
    "Squeeze your forearms at the top.",
    "Move slowly and use the full range of the wrist.",
    "Use a light bar; the forearms tire quickly."
  ],
  "Barbell wrist extension": [
    "Rest your forearms on your thighs with your palms down.",
    "Keep your forearms on your thighs; only your hands move.",
    "Lift the backs of your hands toward the ceiling.",
    "Use less weight than for the wrist curl.",
    "Move slowly and use the full range of the wrist.",
    "Keep a firm grip so the bar doesn't roll."
  ],
  "Barbell behind-the-back wrist curl": [
    "Hold the bar behind you with straight arms, palms facing back.",
    "Keep your arms straight; only your wrists and fingers move.",
    "Let the bar roll down to your fingertips, then close your hands and curl.",
    "Squeeze your forearms at the top.",
    "Move slowly and use the full range of the wrist.",
    "Stand tall; don't shrug or bend your elbows to help."
  ],
  "Barbell seated calf raise": [
    "Rest the bar on your thighs just behind your knees, with a pad or towel under it.",
    "Put the balls of your feet on a plate or block so your heels can drop.",
    "Use the full range: heels all the way down, then all the way up.",
    "Pause for a second at the top.",
    "Don't bounce out of the bottom.",
    "Push through the balls of your feet, over the big toe."
  ],
  "Barbell toes-up calf raise": [
    "Stand with the balls of your feet on a step or plate and your heels hanging off.",
    "Let your heels drop below the step for a full stretch.",
    "Keep your knees straight but not locked.",
    "Pause for a second at the top.",
    "Don't bounce out of the bottom.",
    "Do it inside a rack so you can steady yourself."
  ],
  "Barbell sit-up": [
    "Keep your arms locked and the bar pointing at the ceiling the whole time.",
    "Finish sitting tall with your ears between your arms.",
    "Keep your face toward the ceiling; don't curl your chin to your chest.",
    "Press your heels into the floor.",
    "Lower your torso slowly; don't fall back.",
    "Start with a light bar or a broomstick."
  ],
  "Barbell suitcase carry": [
    "Grip the exact middle of the bar so it stays level.",
    "Stay upright; don't lean away from the bar.",
    "Keep your shoulders level and pulled back.",
    "Take short, steady steps.",
    "Make sure you have clear space in front of and behind the bar.",
    "Carry it the same distance on each side."
  ],
  "Barbell thruster": [
    "Use the drive out of the squat to launch the bar overhead.",
    "It is one smooth movement: don't pause at the shoulders.",
    "Keep your elbows high so the bar stays on your shoulders.",
    "Lock your arms out with the bar over the middle of your feet.",
    "Keep your knees in line with your toes.",
    "Lower the bar to your shoulders as you sink into the next squat."
  ],
  "Barbell clean and press": [
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up.",
    "Whip your elbows under the bar fast to catch it on your shoulders.",
    "Pause on your shoulders, then press without using your legs.",
    "Keep your back flat from start to finish.",
    "Learn the movement with an empty bar before you add weight."
  ],
  "Barbell hang clean and press": [
    "Start each rep with the bar hanging just above your knees, not on the floor.",
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up.",
    "Whip your elbows under the bar fast to catch it on your shoulders.",
    "Pause on your shoulders, then press without using your legs.",
    "Learn the movement with an empty bar before you add weight."
  ],
  "Barbell clean and jerk": [
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up.",
    "Whip your elbows under the bar fast to catch it on your shoulders.",
    "In the jerk, drive the bar up with your legs and drop under it; don't press it out.",
    "Split your feet front and back, not onto one line: keep them hip-width apart.",
    "Use bumper plates and a platform if you may need to drop the bar."
  ],
  "Barbell split jerk": [
    "Dip straight down with your torso upright, then drive up hard.",
    "Push yourself down under the bar; don't press it up.",
    "Split your feet front and back, not onto one line: keep them hip-width apart.",
    "Catch with your arms already locked and the bar over the back of your head.",
    "Take the bar from a rack at shoulder height.",
    "Use bumper plates and a platform if you may need to drop the bar."
  ],
  "Barbell snatch": [
    "Grip the bar very wide, hands near the plates.",
    "Lift the bar from the floor to overhead in one movement.",
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up.",
    "Catch in a deep squat with your arms locked, then stand up.",
    "Learn the movement with an empty bar before you add weight."
  ],
  "Barbell power snatch": [
    "Grip the bar very wide, hands near the plates.",
    "Catch the bar in a shallow quarter squat, thighs well above parallel.",
    "Because you don't drop low, the bar has to travel higher: pull hard.",
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up.",
    "Learn the movement with an empty bar before you add weight."
  ],
  "Barbell muscle snatch": [
    "Grip the bar very wide, hands near the plates.",
    "Once your legs straighten they stay straight: don't dip under the bar.",
    "Pull your elbows high and out, then turn the bar over and press it out.",
    "Keep your feet flat on the floor at the finish.",
    "Keep the bar close to your body on the way up.",
    "Use much less weight than for a snatch."
  ],
  "Barbell snatch-grip high pull": [
    "Grip the bar very wide, hands near the plates.",
    "Your arms stay straight until your legs and hips have fully extended.",
    "Pull your elbows high and out to the sides, above the bar.",
    "Pull the bar to lower-chest height; don't turn it over.",
    "The power comes from your legs and hips, not your arms.",
    "Keep the bar close to your body on the way up."
  ],
  "EZ bar close-grip curl": [
    "Keep your elbows pinned to your sides.",
    "Don't swing your body to move the bar.",
    "Squeeze your biceps at the top.",
    "Lower slowly until your arms are straight.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar Cuban press": [
    "Use a very light bar; the small shoulder rotators limit this lift.",
    "Keep your upper arms level with your shoulders while the forearms rotate.",
    "Rotate slowly; never jerk the bar up.",
    "Keep your ribs down and don't lean back as you press.",
    "Reverse every stage on the way down.",
    "Stop if you feel a pinch in the front of your shoulder."
  ],
  "EZ bar drag curl": [
    "Pull your elbows back as you curl so the bar stays against your body.",
    "The bar travels straight up, not out in an arc.",
    "Keep your shoulders down; don't shrug.",
    "Lower slowly until your arms are straight.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar overhead press": [
    "Squeeze your glutes and brace your core so your lower back doesn't arch.",
    "Keep your forearms vertical under the bar.",
    "Move your head back to let the bar pass, then push it through at the top.",
    "Lock your arms out with the bar over the middle of your feet.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar reverse preacher curl": [
    "Keep the backs of your upper arms on the pad the whole time.",
    "Keep your wrists straight; don't let them bend back.",
    "Use much less weight than for a normal preacher curl.",
    "Lower slowly; the bottom is where this lift is hardest.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar reverse spider curl": [
    "Keep your chest on the pad from start to finish.",
    "Your upper arms stay vertical; only your forearms move.",
    "Keep your wrists straight; don't let them bend back.",
    "Lower slowly until your arms are straight.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar Romanian deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep the bar close to your legs all the way down.",
    "Keep a slight bend in your knees; don't turn it into a squat.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar shrug": [
    "Shrug straight up toward your ears; don't roll your shoulders.",
    "Keep your arms straight; the elbows don't bend.",
    "Pause for a second at the top.",
    "Keep your chin level; don't push your head forward.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar spider curl": [
    "Keep your chest on the pad from start to finish.",
    "Your upper arms stay vertical; only your forearms move.",
    "Squeeze hard at the top; there is no rest there on this lift.",
    "Lower slowly until your arms are straight.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar upright row": [
    "Lead with your elbows; they stay higher than your hands.",
    "Keep the bar close to your body.",
    "Stop when your elbows reach shoulder height.",
    "Stop lower if your shoulders pinch at the top.",
    "Grip the angled parts of the bar so your wrists sit at a comfortable angle.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "EZ bar Zercher squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your torso upright.",
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "Load both ends evenly and fix the plates with collars."
  ],
  "Trap bar deficit deadlift": [
    "Keep your back flat from start to finish.",
    "Brace your core before every rep.",
    "Push the floor away with your legs instead of pulling with your back.",
    "Use a platform only 5 to 10 cm high; more than that rounds the back.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Step far enough back that your front shin stays vertical.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar Romanian deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep the handles beside your legs all the way down.",
    "Keep a slight bend in your knees; don't turn it into a squat.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar shrug": [
    "Shrug straight up toward your ears; don't roll your shoulders.",
    "Keep your arms straight; the elbows don't bend.",
    "Pause for a second at the top.",
    "Keep your chin level; don't push your head forward.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar single-leg deadlift": [
    "Keep your hips square; don't let the free hip open up.",
    "Your back leg and torso move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Start lighter than you think; balance limits this lift.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Take a stance short enough that your back foot stays inside the frame.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your torso as upright as you can; let your knees travel forward.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Trap bar staggered Romanian deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Stand in the middle of the frame so the handles line up with your ankles.",
    "Grip the middle of each handle so the bar doesn't tip forward or back."
  ],
  "Smith machine close-grip bench press": [
    "Keep your elbows close to your ribs, not flared out.",
    "Grip about shoulder-width; any narrower strains the wrists.",
    "Keep your shoulder blades pulled together on the bench.",
    "Line the bench up so the bar comes down on your lower chest, not your neck.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine drag curl": [
    "Pull your elbows back as you curl so the bar stays against your body.",
    "The rails fix the bar's path, so stand close enough that it brushes your body.",
    "Keep your shoulders down; don't shrug.",
    "Lower slowly until your arms are straight.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine guillotine bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Flare your elbows straight out to the sides; this is what stretches the chest.",
    "Lower under control; don't bounce.",
    "Use much less weight than for a normal bench press and never go to failure.",
    "Set the safety stops just above neck height: the bar comes down over your throat.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine narrow-stance squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your feet close together; your knees travel forward over your toes.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine overhand row": [
    "Pull with your elbows, not your hands.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your back flat from start to finish.",
    "Don't jerk your torso up to finish the pull.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine underhand row": [
    "Keep your elbows close to your ribs as you pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your back flat from start to finish.",
    "Don't jerk your torso up to finish the pull.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Step far enough back that your front shin stays vertical.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine seated calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly to a full stretch; don't bounce.",
    "Put a pad or folded towel between the bar and your thighs.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine single-leg hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your hips level; don't let the free side drop.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine skull crusher": [
    "Keep your upper arms still; only your forearms move.",
    "Keep your elbows pointing up, not flaring out.",
    "Set the safety stops above your face before you start.",
    "Straighten your arms fully at the top.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Plate alternating deadstop row": [
    "Pull with your elbows, not your hands.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your back flat from start to finish.",
    "Let each plate come to a complete stop on the floor before the next pull.",
    "Small plates work best; choose ones you can hold securely.",
    "Use the same weight in each hand."
  ],
  "Plate bicep curl": [
    "Keep your elbows pinned to your sides.",
    "Don't swing your body to move the plate.",
    "Squeeze your biceps at the top.",
    "Lower slowly until your arms are straight.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate car driver": [
    "Keep your arms level with your shoulders the whole time.",
    "Turn the plate slowly, like a steering wheel.",
    "Keep your ribs down; don't lean back.",
    "Use a light plate; your shoulders hold it up for the whole set.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Count one turn to each side as one rep."
  ],
  "Plate clean": [
    "Keep your back flat from start to finish.",
    "The lift comes from your legs and hips; your arms only guide the plate.",
    "Keep the plate close to your body on the way up.",
    "Catch the plate softly at your chest with your elbows under it.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate clean and press": [
    "Keep your back flat from start to finish.",
    "The lift comes from your legs and hips; your arms only guide the plate.",
    "Pause at your chest before you press.",
    "Keep your ribs down as you press; don't lean back.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate curl to overhead press": [
    "Curl without swinging, then press without leaning back.",
    "Keep your elbows at your sides during the curl.",
    "Lock your arms out with the plate over your head.",
    "Reverse both stages under control.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate curl to overhead press to tricep extension": [
    "Treat the three parts as one smooth sequence.",
    "Keep your elbows at your sides during the curl.",
    "Keep your elbows pointing up during the extension.",
    "Choose the weight by the tricep extension, the weakest part.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Keep your ribs down; don't arch your lower back overhead."
  ],
  "Plate curtsy lunge": [
    "Step back and across, as if doing a curtsy, but keep your hips facing forward.",
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Take a smaller step if you feel it in your knee rather than your glutes.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate deadlift": [
    "Keep your back flat from start to finish.",
    "Brace your core before every rep.",
    "Push the floor away with your legs instead of pulling with your back.",
    "Stand tall at the top; don't lean back.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate deficit lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Standing on the plate lets your back knee travel lower: use the extra range.",
    "Use a rubber plate that will not slide on the floor.",
    "Stop the set when your form starts to break down."
  ],
  "Plate deficit push-up": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Lower your chest, not your head.",
    "With your hands raised on the plate, your chest can travel lower than your hands: use that range.",
    "Use a rubber plate that will not slide on the floor."
  ],
  "Plate forward lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Take a step long enough that your front shin stays vertical.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate front raise": [
    "Keep your arms almost straight.",
    "Stop at shoulder height.",
    "Don't lean back to lift the plate.",
    "Move slowly; don't use momentum.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate full lateral raise": [
    "Keep your arms straight all the way overhead.",
    "Turn your palms up as you pass shoulder height so your shoulders can move freely.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Small plates work best; choose ones you can hold securely.",
    "Use the same weight in each hand."
  ],
  "Plate glute bridge to chest press": [
    "Keep your hips up the whole time; don't let them sag as your arms move.",
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Press the plate straight up over your chest, not over your face.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Lower the plate before you lower your hips."
  ],
  "Plate glute bridge to pullover": [
    "Keep your hips up the whole time; don't let them sag as your arms move.",
    "Keep a slight bend in your elbows and move only at the shoulders.",
    "Keep your ribs down as the plate goes back; don't arch.",
    "Go back only as far as your shoulders allow without pain.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a light plate; it passes over your face."
  ],
  "Plate good morning": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your back flat from start to finish.",
    "Keep a slight bend in your knees.",
    "Start light; your lower back works hard here.",
    "Hold the plate against your upper back, not on your neck.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate good morning anterior": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your back flat from start to finish.",
    "Keep a slight bend in your knees.",
    "Start light; your lower back works hard here.",
    "Hug the plate tight to your chest so it doesn't pull you forward.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate halo": [
    "Keep the plate close to your head as it circles.",
    "Move your arms, not your head or torso.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Circle slowly; this is a shoulder mobility and control exercise.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Do the same number of circles in each direction."
  ],
  "Plate hollow hold": [
    "Keep your lower back pressed into the floor.",
    "Raise your legs higher if your lower back starts to lift.",
    "Breathe steadily; don't hold your breath.",
    "Stop the hold when you can no longer keep the shape.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate internally rotated rear delt fly": [
    "Lead with your elbows and keep a slight bend in them.",
    "Keep your thumbs pointing down and in the whole way; that is what makes this version different.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Small plates work best; choose ones you can hold securely.",
    "Use the same weight in each hand."
  ],
  "Plate lateral lunge": [
    "Sit your hips back over the bent leg; the other leg stays straight.",
    "Keep both feet flat and pointing forward.",
    "Keep the bent knee in line with its toes.",
    "Keep your chest up and your back flat.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate lateral raise": [
    "Lead with your elbows and keep a slight bend in them.",
    "Stop at shoulder height.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Small plates work best; choose ones you can hold securely.",
    "Use the same weight in each hand."
  ],
  "Plate overhead carry": [
    "Walk tall with your ribs down and your core braced.",
    "Take short, even steps.",
    "Keep your arms locked and your biceps beside your ears.",
    "Count distance or time instead of reps.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate overhead press to tricep extension": [
    "Finish the press completely before you start the extension.",
    "Keep your elbows close to your head and pointing up during the extension.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Choose the weight by the tricep extension, the weaker part.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate overhead shrug": [
    "Push the plate toward the ceiling with your shoulders, not your elbows.",
    "Keep your arms locked the whole time.",
    "Pause for a second at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate overhead squat": [
    "Keep your knees in line with your toes.",
    "Keep your arms locked and the plate over the middle of your feet.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Go only as low as you can while keeping your arms vertical.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate overhead tricep extension": [
    "Keep your elbows close to your head, pointing up.",
    "Keep your upper arms still; only your forearms move.",
    "Keep your ribs down; don't arch your lower back.",
    "Lower until you feel a stretch in your triceps.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate overhead walking lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your arms locked and the plate over the middle of your feet.",
    "Push through your whole front foot, not just the toes.",
    "Take a step long enough that your front shin stays vertical.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate pinch-grip deadlift": [
    "Keep your back flat from start to finish.",
    "Brace your core before every rep.",
    "Push the floor away with your legs instead of pulling with your back.",
    "Stand tall at the top; don't lean back.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate pinch-grip farmers carry": [
    "Walk tall with your ribs down and your core braced.",
    "Take short, even steps.",
    "Keep your shoulders level; don't lean to one side.",
    "Count distance or time instead of reps.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate pinch-grip row": [
    "Pull with your elbows, not your hands.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your back flat from start to finish.",
    "Don't jerk your torso up to finish the pull.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate pinch-grip side bend": [
    "Bend straight to the side; don't lean forward or back.",
    "Keep your hips still; only your torso moves.",
    "Move slowly; don't use momentum.",
    "Use the obliques on the far side to pull yourself back up.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate reach": [
    "Keep the plate at chest height as it moves out and back.",
    "Keep your ribs down; don't lean back to balance the plate.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; the further out the plate is, the heavier it feels.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate rear delt fly": [
    "Lead with your elbows and keep a slight bend in them.",
    "Pull your arms apart with the back of your shoulders, not your traps.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Small plates work best; choose ones you can hold securely.",
    "Use the same weight in each hand."
  ],
  "Plate reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Step far enough back that your front shin stays vertical.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate reverse lunge twist": [
    "Keep your front knee in line with your toes.",
    "Twist from your upper back toward the front leg; your hips keep facing forward.",
    "Push through your whole front foot, not just the toes.",
    "Finish the twist before you stand up.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate Russian twist": [
    "Turn from your ribcage; your shoulders and arms move as one block.",
    "Brace your core before every rep.",
    "Move slowly; don't use momentum.",
    "Keep your back long; don't slump.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate single-leg deadlift": [
    "Keep your hips square; don't let the free hip open up.",
    "Your back leg and torso move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Start lighter than you think; balance limits this lift.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate single-leg pinch-grip deadlift": [
    "Keep your hips square; don't let the free hip open up.",
    "Your back leg and torso move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Let your grip, not your balance, decide when the set ends.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your chest up as you come out of the bottom.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate squat hold": [
    "Keep your knees in line with your toes.",
    "Keep your heels down and your chest up.",
    "Breathe steadily; don't hold your breath.",
    "Stand up when you can no longer hold the position.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate squat hold curl": [
    "Stay in the squat the whole time; don't rise as your arms move.",
    "Keep your heels down and your chest up.",
    "Keep your elbows inside your knees as you curl.",
    "Lower the plate slowly until your arms are straight.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Your legs will tire before your arms; stand up between sets."
  ],
  "Plate squat hold reach": [
    "Stay in the squat the whole time; don't rise as your arms move.",
    "Keep your heels down and your chest up.",
    "Reach the plate straight out at chest height.",
    "Keep your back flat as your arms reach forward.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Your legs will tire before your arms; stand up between sets."
  ],
  "Plate squat reach": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Reaching the plate forward works as a counterweight and helps you sit deeper.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate staggered deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate staggered pinch-grip deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Pinch the plate between your thumb and fingers; your grip is what limits this lift.",
    "Put the plate down before your grip fails; don't let it drop on your feet."
  ],
  "Plate standing twist": [
    "Turn from your ribcage; your shoulders and arms move as one block.",
    "Brace your core before every rep.",
    "Move slowly; don't use momentum.",
    "Keep your hips facing forward and don't let the plate travel behind your body.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate thruster": [
    "Use the drive from your legs to start the press.",
    "Squat to at least parallel on every rep.",
    "Keep your knees in line with your toes.",
    "Bring the plate back to your chest before you squat again.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Plate wood chopper": [
    "Rotate through your upper back and hips, not your lower back.",
    "Pivot your back foot as you turn.",
    "Keep your arms long; your torso does the work.",
    "Control the way back; don't let the plate pull you around.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Smith machine assisted pull-up": [
    "Use your legs only as much as you need to finish the rep.",
    "Pull your elbows down toward your ribs.",
    "Lower slowly with as little help from your legs as you can.",
    "Keep your shoulders away from your ears at the bottom.",
    "Make sure the bar is hooked and locked before you put your weight on it.",
    "Over time, push less with your legs until you can do a full pull-up."
  ],
  "Smith machine bodyweight skull crusher": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows tucked in and pointing at the floor.",
    "Only your elbows bend; your shoulders and hips stay still.",
    "Stand further back to make it harder, closer to make it easier.",
    "A lower bar makes it harder; start with the bar around hip height.",
    "Make sure the bar is hooked and locked before you put your weight on it."
  ],
  "Smith machine glute kickback": [
    "Push with your heel and squeeze your glute at the top.",
    "Keep your back flat; don't arch it to lift the bar higher.",
    "Keep the working knee bent at 90 degrees.",
    "Place the middle of your foot under the bar so it can't slip off.",
    "Set the safety stops just below the lowest point of the rep.",
    "Do the same number of reps on each side."
  ],
  "Smith machine hanging knee tuck": [
    "Curl your hips up at the top; don't just lift your knees.",
    "Move slowly; don't use momentum.",
    "Lower your legs slowly; don't let them swing.",
    "Wrap a thick pad around the bar; it sits under your armpits.",
    "Make sure the bar is hooked and locked before you put your weight on it.",
    "Breathe out as you lift and in as you lower."
  ],
  "Smith machine push-up": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Lower your chest, not your head.",
    "A lower bar makes it harder, a higher bar easier.",
    "Make sure the bar is hooked and locked before you put your weight on it."
  ],
  "Smith machine side bend": [
    "Bend straight to the side; don't lean forward or back.",
    "Keep your hips still; only your torso moves.",
    "Move slowly; don't use momentum.",
    "Use the obliques on the far side to pull yourself back up.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine sissy squat": [
    "Keep your hips forward: shoulders, hips and knees stay in one line.",
    "Let your knees travel forward and your heels rise.",
    "Hold the bar only for balance; your quads do the work.",
    "Go only as low as your knees tolerate without pain.",
    "Make sure the bar is hooked and locked before you put your weight on it.",
    "Warm your knees up well before this exercise."
  ],
  "Smith machine staggered deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine sumo Romanian deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep the bar close to your legs all the way down.",
    "Keep your knees pushed out over your toes and only slightly bent.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Smith machine upright row": [
    "Lead with your elbows; they stay higher than your hands.",
    "Keep the bar close to your body.",
    "Stop when your elbows reach shoulder height.",
    "Stop lower if your shoulders pinch at the top.",
    "Set the safety stops just below the lowest point of the rep.",
    "Twist the bar to unhook it, and hook it back before you let go."
  ],
  "Landmine alternating lunge and twist": [
    "Twist toward your front leg as you lunge.",
    "Rotate from your upper back; your front knee keeps pointing forward.",
    "Keep your arms long so the bar travels in a wide arc.",
    "Keep your front knee in line with your toes.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine alternating lunge to chest press": [
    "Press as you lower into the lunge and pull the bar in as you stand.",
    "Keep your torso upright.",
    "Keep your front knee in line with your toes.",
    "Keep your elbows close to your body when the bar is at your chest.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine alternating single-arm press": [
    "Change hands only at the top, when the bar is highest and lightest.",
    "Keep your elbow under your wrist and pointing forward.",
    "Keep your hips and shoulders square to the landmine.",
    "Lower the bar slowly to the shoulder each time.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine bicep curl": [
    "Keep your elbows pinned to your sides.",
    "Curl across your body toward the opposite shoulder.",
    "Don't lean away from the bar to lift it.",
    "Lower slowly until your arm is straight.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly to a full stretch; don't bounce.",
    "Keep your ankles straight; don't let them roll in or out.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine concentration curl": [
    "Keep your elbow braced against the inside of your knee.",
    "Only your forearm moves.",
    "Squeeze your biceps hard at the top.",
    "Lower slowly until your arm is straight.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine cossack squat": [
    "Sink as low as you can over one leg while the other leg stays straight.",
    "Let the toes of the straight leg point up.",
    "Keep the heel of the bent leg on the floor.",
    "Squat over the leg farther from the anchor, then turn around for the other side.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine curtsy lunge": [
    "Step back and across, as if doing a curtsy, but keep your hips facing forward.",
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Take a smaller step if you feel it in your knee rather than your glutes.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine glute kickback": [
    "Push with your heel and squeeze your glute at the top.",
    "Keep your back flat; don't arch it to lift higher.",
    "Keep your knee bent at 90 degrees so it holds the bar.",
    "Wrap a pad or towel around the end of the bar.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine goblet cossack squat": [
    "Sink as low as you can over one leg while the other leg stays straight.",
    "Let the toes of the straight leg point up.",
    "Keep the heel of the bent leg on the floor.",
    "Start lighter than you think; balance limits this lift.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine goblet curtsy lunge": [
    "Step back and across, as if doing a curtsy, but keep your hips facing forward.",
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Take a smaller step if you feel it in your knee rather than your glutes.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine goblet lateral lunge": [
    "Sit your hips back over the bent leg; the other leg stays straight.",
    "Keep both feet flat and pointing forward.",
    "Keep the bent knee in line with its toes.",
    "Keep your chest up and your back flat.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine goblet step-up": [
    "Put your whole foot on the box.",
    "Push through the top leg; don't spring off the floor foot.",
    "Keep your front knee in line with your toes.",
    "Lower yourself slowly instead of dropping.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine hack squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep leaning back into the bar all the way down and up.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Put a pad or towel between the bar and your shoulder, and switch shoulders each set."
  ],
  "Landmine half-kneeling single-arm overhead press": [
    "Keep your elbow under your wrist and pointing forward.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Keep your ribs down; don't arch your lower back.",
    "Lower the bar slowly to your shoulder.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your shins vertical at the top.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Wrap a pad around the bar where it crosses your hips."
  ],
  "Landmine hollow hold": [
    "Keep your lower back pressed into the floor.",
    "Raise your legs higher if your lower back starts to lift.",
    "Breathe steadily; don't hold your breath.",
    "Stop the hold when you can no longer keep the shape.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine kneeling alternating overhead press": [
    "Change hands only at the top, when the bar is highest and lightest.",
    "Keep your elbow under your wrist and pointing forward.",
    "Squeeze your glutes so your hips stay straight and your back doesn't arch.",
    "Lower the bar slowly to the shoulder each time.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine kneeling overhead press": [
    "Keep your elbows tucked in under the bar.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Keep your ribs down; don't arch your lower back.",
    "Lower the bar slowly to your chest.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine kneeling twist": [
    "Keep your arms long and let the bar travel in a wide arc.",
    "Turn your shoulders with the bar; your hips stay facing forward.",
    "Slow the bar down before it reaches your hip; don't let it drop.",
    "Brace your core before every rep.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine lateral lunge": [
    "Sit your hips back over the bent leg; the other leg stays straight.",
    "Keep both feet flat and pointing forward.",
    "Keep the bent knee in line with its toes.",
    "Keep your chest up and your back flat.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine lateral raise": [
    "Keep your arm straight and lift it diagonally up and away from your body.",
    "Stop when your arm is level with your shoulder.",
    "Keep your torso still; don't twist to help.",
    "Start with the empty bar; the long lever makes it heavy.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Step far enough back that your front shin stays vertical.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine lunge rotate to press": [
    "Drive up with your legs and let that power carry the bar to your shoulder.",
    "Pivot your feet as you turn so your knees and hips rotate together.",
    "Finish with your arm straight and your body facing the landmine.",
    "Lower the bar under control back to the start.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Learn it slowly with an empty bar first."
  ],
  "Landmine lunge to overhead press": [
    "Step back with the leg on the same side as the bar.",
    "Keep your front knee in line with your toes.",
    "Press only once you are standing tall again.",
    "Keep your elbow under your wrist and pointing forward.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine lying tricep extension": [
    "Keep your upper arm vertical and still; only your forearm moves.",
    "Lower the bar slowly beside your head.",
    "Straighten your arm fully at the top.",
    "Start with the empty bar.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine oblique twist": [
    "Keep your arms long and let the bar travel in a wide arc.",
    "Turn your shoulders with the bar; your hips stay facing forward.",
    "Slow the bar down before it reaches your hip; don't let it drop.",
    "Brace your core before every rep.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine rear delt row": [
    "Pull your elbow out to the side, not back along your ribs.",
    "Stop when your elbow is level with your shoulder.",
    "Keep your torso still; don't rotate to lift the bar.",
    "Keep your back flat from start to finish.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine Romanian deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep the bar close to your legs all the way down.",
    "Keep a slight bend in your knees; don't turn it into a squat.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine rotational lift to press": [
    "Start the lift with your legs, then your hips, then your arm.",
    "Pivot your feet toward the landmine as you rise.",
    "Keep your back flat from start to finish.",
    "Lower the bar by reversing the same path.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Learn it slowly with an empty bar first."
  ],
  "Landmine Russian twist": [
    "Keep your feet off the floor and your chest up.",
    "Bend your elbows as little as you can.",
    "Lower the bar slowly to each side; don't let it drop.",
    "Rest your heels on the floor if your lower back rounds.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine seated alternating overhead press": [
    "Change hands only at the top, when the bar is highest and lightest.",
    "Keep your elbow under your wrist and pointing forward.",
    "Sit tall; don't round your lower back.",
    "Lower the bar slowly to the shoulder each time.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Sitting takes your legs out of the press, so start lighter than when standing."
  ],
  "Landmine seated overhead press": [
    "Keep your elbows tucked in under the bar.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Sit tall; don't round your lower back.",
    "Lower the bar slowly to your chest.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Sitting takes your legs out of the press, so start lighter than when standing."
  ],
  "Landmine seated single-arm overhead press": [
    "Keep your elbow under your wrist and pointing forward.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Sit tall; don't round your lower back.",
    "Lower the bar slowly to your shoulder.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Sitting takes your legs out of the press, so start lighter than when standing."
  ],
  "Landmine shrug": [
    "Shrug straight up toward your ears; don't roll your shoulders.",
    "Keep your arms straight; the elbows don't bend.",
    "Pause for a second at the top.",
    "Stand tall; don't lean toward the bar.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine single-arm chest press": [
    "Keep your elbow at about 45 degrees to your body.",
    "Keep your wrist stacked over your elbow at the bottom.",
    "Squeeze your chest as your arm straightens.",
    "Let your elbow touch the floor lightly; don't bounce off it.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine single-arm overhead press": [
    "Keep your elbow under your wrist and pointing forward.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Keep your ribs down; don't arch your lower back.",
    "Lower the bar slowly to your shoulder.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine single-arm push press": [
    "Keep your elbow under your wrist and pointing forward.",
    "Dip only a little: a quick, shallow bend of the knees.",
    "Let your legs start the bar moving; your arm finishes it.",
    "Lower the bar slowly to your shoulder.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine single-arm staggered overhead press": [
    "Keep your elbow under your wrist and pointing forward.",
    "The bar moves in an arc, so lean slightly into it as it rises.",
    "Lean into the press so your body and back leg form one line.",
    "Lower the bar slowly to your shoulder.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine single-leg hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your hips level; don't let the free side drop.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine single-leg Romanian deadlift": [
    "Keep your hips square; don't let the free hip open up.",
    "Your back leg and torso move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Start lighter than you think; balance limits this lift.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine sit-up": [
    "Curl your spine up one segment at a time.",
    "Keep your arms straight; the bar rises as you sit up.",
    "Breathe out as you lift and in as you lower.",
    "Lower slowly; don't drop back.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine snatch": [
    "The power comes from your legs and hips, not your arm.",
    "Pull your elbow high, then punch your hand up under the bar.",
    "Keep the bar close to your body on the way up.",
    "Keep your back flat from start to finish.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Learn it slowly with an empty bar first."
  ],
  "Landmine split jerk": [
    "Dip straight down and drive straight up.",
    "Split your feet as you press: the leg on the bar side goes back.",
    "Land with both knees soft and your arm already locked out.",
    "Recover by stepping the front foot back first, then the back foot forward.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Do the same number of reps on each side."
  ],
  "Landmine split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Lean slightly into the bar; it helps you stay upright as you sit back.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine staggered Romanian deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine sumo deadlift": [
    "Keep your back flat from start to finish.",
    "Brace your core before every rep.",
    "Push your knees out over your toes as you lift.",
    "Stand tall at the top; don't lean back.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Landmine thruster": [
    "Use the drive from your legs to start the press.",
    "Squat to at least parallel on every rep.",
    "Keep your knees in line with your toes.",
    "Bring the bar back to your chest before you squat again.",
    "Wedge the far end of the bar into a landmine holder or a corner so it can't slide.",
    "Load plates only on the end you hold, and use a collar."
  ],
  "Plate goblet deficit reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Standing on the platform lets your back knee travel lower: use the extra range.",
    "Grip the plate firmly on both sides; it has no handle.",
    "Use a plate with grip holes or a rubber rim if your gym has one."
  ],
  "Machine 45-degree calf raise": [
    "Keep your knees slightly bent and still; only your ankles move.",
    "Pause for a second at the top.",
    "Don't bounce out of the stretch.",
    "Keep the safety catches engaged so the sled can't drop if your feet slip.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine assisted chin-up": [
    "More weight on the stack means more help; reduce it as you get stronger.",
    "Pull your elbows down toward your ribs.",
    "Lower slowly until your arms are straight.",
    "Keep your chest up and your shoulders away from your ears.",
    "Step off the pad carefully; it rises when your weight comes off.",
    "Don't swing; the pad should move straight up and down."
  ],
  "Machine assisted narrow pull-up": [
    "More weight on the stack means more help; reduce it as you get stronger.",
    "Pull your elbows down toward your ribs.",
    "Lower slowly until your arms are straight.",
    "Keep your chest up and your shoulders away from your ears.",
    "Step off the pad carefully; it rises when your weight comes off.",
    "Don't swing; the pad should move straight up and down."
  ],
  "Machine assisted neutral chin-up": [
    "More weight on the stack means more help; reduce it as you get stronger.",
    "Pull your elbows down toward your ribs.",
    "Lower slowly until your arms are straight.",
    "Keep your chest up and your shoulders away from your ears.",
    "Step off the pad carefully; it rises when your weight comes off.",
    "Don't swing; the pad should move straight up and down."
  ],
  "Machine bent-arm pec fly": [
    "Push with your elbows, not your hands.",
    "Keep your upper arms level with your shoulders.",
    "Keep your back against the pad.",
    "Don't open so far that your shoulders hurt.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine cable V-bar pushdown": [
    "Keep your elbows pinned to your sides.",
    "Only your forearms move; your upper arms stay still.",
    "Straighten your arms fully and squeeze your triceps at the bottom.",
    "Don't lean over the bar to push it down with your body weight.",
    "Let the bar rise only until your forearms are just above horizontal.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine chest-supported T-bar row": [
    "Keep your chest on the pad; don't lean back to pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Pull with your elbows, not your hands.",
    "Hook the bar back before you stand up.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine dips": [
    "Keep your elbows close to your body, pointing back.",
    "Keep your shoulders down; don't let them shrug up as the handles rise.",
    "Keep your back against the pad.",
    "Stop just short of locking your joints at the end.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine goblet sissy squat": [
    "Keep your shins vertical; the pad holds them in place.",
    "Keep your torso upright.",
    "Go only as low as your knees tolerate without pain.",
    "Learn the movement without weight first.",
    "Check that the bench is stable before you lean back.",
    "Hold the dumbbell tight to your chest."
  ],
  "Machine hip and glute abduction": [
    "Keep your torso upright and still; only the leg moves.",
    "Keep your hips level and facing forward.",
    "Return slowly; don't let the weight pull you back.",
    "Do the same number of reps on each side.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine hip and glute adduction": [
    "Keep your torso upright and still; only the leg moves.",
    "Keep your hips level and facing forward.",
    "Return slowly; don't let the weight pull you back.",
    "Do the same number of reps on each side.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine hip and glute kickback": [
    "Keep your torso upright and still; only the leg moves.",
    "Don't arch your lower back to push the leg further.",
    "Return slowly; don't let the weight pull you back.",
    "Do the same number of reps on each side.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine horizontal leg press": [
    "Keep your lower back and hips pressed into the seat.",
    "Keep your knees in line with your toes.",
    "Stop just short of locking your joints at the end.",
    "Lower only as far as you can without your hips rolling off the seat.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine horizontal sissy leg press": [
    "Keep your heels off the plate the whole time; this moves the work to your quads.",
    "Use much less weight than for a normal leg press.",
    "Keep your lower back and hips pressed into the seat.",
    "Stop if you feel pain at the front of your knees.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine neutral overhead press": [
    "Keep your back against the pad.",
    "Keep your elbows in front of your body, not flared out to the sides.",
    "Stop just short of locking your joints at the end.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine overhead tricep extension": [
    "Keep your upper arms on the pad; only your forearms move.",
    "Keep your elbows pointing forward, not flaring out.",
    "Straighten your arms fully and squeeze your triceps.",
    "Keep your ribs down; don't arch your lower back.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded decline chest press": [
    "Keep your back against the pad.",
    "Keep your wrists straight and in line with your forearms.",
    "Stop just short of locking your joints at the end.",
    "Return slowly; don't let the weight pull you back.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded incline chest press": [
    "Keep your back against the pad.",
    "Keep your wrists straight and in line with your forearms.",
    "Stop just short of locking your joints at the end.",
    "Return slowly; don't let the weight pull you back.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded kneeling hamstring curl": [
    "Keep your thigh still; only your lower leg moves.",
    "Don't lift your hips or arch your back to finish the curl.",
    "Squeeze your hamstring at the top.",
    "Do the same number of reps on each side.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded low row": [
    "Keep your chest on the pad; don't lean back to pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your elbows out to the sides to work your upper back.",
    "Keep your shoulders down, away from your ears.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded pulldown": [
    "Pull your elbows down toward your ribs.",
    "Keep your chest up; lean back only slightly.",
    "Keep your shoulders down, away from your ears.",
    "Don't use your body weight to yank the handles down.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded row": [
    "Keep your chest on the pad; don't lean back to pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Pull with your elbows, not your hands.",
    "Keep your shoulders down, away from your ears.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine plate-loaded seal row": [
    "Keep your chest and hips on the bench; your body can't help the pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Pull with your elbows, not your hands.",
    "Set the hooks so you can just reach the bar with straight arms.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine rear deltoid row": [
    "Keep your elbows flared out, level with your shoulders.",
    "Keep your chest on the pad; don't lean back to pull.",
    "Keep your shoulders down, away from your ears.",
    "Use less weight than for a normal row.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine reverse hyperextension": [
    "Stop when your legs are level with your back; don't arch higher.",
    "Squeeze your glutes hard at the top.",
    "Don't swing; control the legs on the way down.",
    "Keep your upper body relaxed and flat on the pad.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine seated shrug": [
    "Shrug straight up toward your ears; don't roll your shoulders.",
    "Keep your arms straight; the elbows don't bend.",
    "Pause for a second at the top.",
    "Keep your chin level; don't push your head forward.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine single-leg leg press": [
    "Keep your hips square and flat on the seat; don't twist toward the working leg.",
    "Keep your front knee in line with your toes.",
    "Stop just short of locking your joints at the end.",
    "Use less than half of your two-leg weight.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine sissy squat": [
    "Keep your shins vertical; the pad holds them in place.",
    "Keep your torso upright.",
    "Go only as low as your knees tolerate without pain.",
    "Reach your arms forward if you need a counterweight.",
    "Check that the bench is stable before you lean back.",
    "Hold a dumbbell at your chest once the bodyweight version is easy."
  ],
  "Machine standing plate-loaded preacher curl": [
    "Keep the backs of your upper arms on the pad the whole time.",
    "Don't lift your hips or lean back to finish a rep.",
    "Stop just short of fully locking your elbows at the bottom.",
    "Lower slowly; the bottom is where this lift is hardest.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Machine underhand row": [
    "Keep your chest on the pad; don't lean back to pull.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Keep your elbows tucked in; the underhand grip brings your biceps and lats in more.",
    "Keep your shoulders down, away from your ears.",
    "Adjust the seat and pads to your body before you add weight.",
    "Don't let the weight rest between reps; keep tension on the muscle."
  ],
  "Cable calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly to a full stretch; don't bounce.",
    "Keep your knees still; only your ankles move.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable belt squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Let the cable pull you slightly forward as you sit down, then push back through your whole foot.",
    "Wear the belt low on your hips, not around your waist.",
    "Stand far enough from the machine that the weight stack never touches down."
  ],
  "Cable belt split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Wear the belt low on your hips, not around your waist.",
    "Stand far enough from the machine that the weight stack never touches down."
  ],
  "Cable belt calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly to a full stretch; don't bounce.",
    "Keep your knees still; only your ankles move.",
    "Wear the belt low on your hips, not around your waist.",
    "Stand far enough from the machine that the weight stack never touches down."
  ],
  "Cable bar Romanian deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Let the cable pull your hands toward the pulley as you hinge.",
    "Keep a slight bend in your knees; don't turn it into a squat.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bar staggered Romanian deadlift": [
    "Keep most of your weight on the front leg; the back foot only helps you balance.",
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your hips square to the front.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable goblet squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your elbows under the bar so it stays at your chest.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable Zercher squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable Zercher good morning": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your back flat from start to finish.",
    "Keep a slight bend in your knees.",
    "Keep the bar tight in the crooks of your elbows; a pad or towel makes it more comfortable.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-leg deadlift": [
    "Keep your hips square; don't let the free hip open up.",
    "Your back leg and torso move together like a seesaw.",
    "Keep a slight bend in the standing knee.",
    "Start lighter than you think; balance limits this lift.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable elevated deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Standing on the box lets your hands travel below your feet for a longer stretch.",
    "Keep a slight bend in your knees; don't turn it into a squat.",
    "Go only as low as your hamstrings allow with a flat back.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable thruster": [
    "Use the drive from your legs to start the press.",
    "Squat to at least parallel on every rep.",
    "Keep your knees in line with your toes.",
    "Bring the handles back to your shoulders before you squat again.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable hamstring curl": [
    "Keep your thigh still; only your lower leg moves.",
    "Squeeze your hamstring at the top.",
    "Don't arch your lower back to move the leg further.",
    "Stand tall or lean forward slightly; don't swing.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable single-leg laying leg curl": [
    "Keep your hips pressed into the bench.",
    "Squeeze your hamstring at the top.",
    "Keep your thigh still; only your lower leg moves.",
    "Lower slowly until your leg is straight.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable seated leg curl": [
    "Sit tall and keep your thigh on the bench.",
    "Squeeze your hamstring at the top.",
    "Keep your thigh still; only your lower leg moves.",
    "Let your leg straighten slowly for a full stretch.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable seated leg extension": [
    "Sit tall and keep your thigh on the bench.",
    "Squeeze your quad hard when your leg is straight.",
    "Keep your thigh still; only your lower leg moves.",
    "Lower slowly; don't let your foot swing back.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable standing leg extension": [
    "Keep your thigh lifted and still; only your lower leg moves.",
    "Squeeze your quad hard when your leg is straight.",
    "Hold on to something if you lose your balance.",
    "Bend your knee slowly on the way back.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable standing mid kickback": [
    "Squeeze your glutes hard at the top.",
    "Don't arch your lower back to move the leg further.",
    "Keep your knee bent the whole time.",
    "Keep your hips square to the machine.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable bench straight-leg kickback": [
    "Squeeze your glutes hard at the top.",
    "Don't arch your lower back to move the leg further.",
    "Keep your leg straight the whole time.",
    "Keep your hips level; don't open them toward the working leg.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable bench chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Open only until you feel a stretch across your chest, not pain in your shoulders.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable decline bench chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Open only until you feel a stretch across your chest, not pain in your shoulders.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable decline bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable incline bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm bench chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm decline bench chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable decline single-arm bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm incline bench press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm incline chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing decline chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing incline chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Stop just short of locking your elbows.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing single-arm chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing single-arm incline chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing single-arm incline chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable braced single-arm chest fly": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Move in a wide arc, as if hugging a tree.",
    "Squeeze your chest when your hands come together.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable braced single-arm chest press": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable decline press around": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable incline press around": [
    "Keep your shoulder blades pulled back and down.",
    "Keep your elbows at about 45 degrees to your body.",
    "Keep your wrists straight and in line with the cable.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable incline fly around": [
    "Keep a slight bend in your elbows and don't change it during the rep.",
    "Finish with your hand high and slightly across your body.",
    "Squeeze your upper chest at the top.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable standing Svend press": [
    "Squeeze the handles together as hard as you can the whole time.",
    "Press straight out at chest height.",
    "Keep your shoulders down, away from your ears.",
    "Use light weight; the squeeze does the work, not the load.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable push pull": [
    "Press and pull at the same time, like a slow punch and row.",
    "Rotate through your upper back; your hips stay still.",
    "Brace your core before every rep.",
    "Keep both hands at chest height.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable quadruped hip abduction": [
    "Keep your knee bent 90 degrees and lift it straight out to the side.",
    "Keep your back flat and your hips level; don't lean away.",
    "Lift only as high as you can without your hips turning.",
    "Stop just before the weight touches down, to keep tension on the hip.",
    "Fasten the ankle strap snugly so it doesn't slide.",
    "Do the same number of reps on each side."
  ],
  "Cable archer row": [
    "Pull your elbow back and out at shoulder height, like drawing a bow.",
    "Let your chest open toward the pulling side.",
    "Keep your shoulders down, away from your ears.",
    "Return until your arm is straight and your shoulder reaches forward.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable kayak row": [
    "Keep your arms almost straight; the movement comes from your shoulders.",
    "Sweep the bar down to one hip, like a kayak stroke.",
    "Keep your hips back and your back flat.",
    "Let the bar rise slowly all the way up between strokes.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable pull in": [
    "Think of driving your elbow down, not pulling with your hand.",
    "Keep your palm facing up; it keeps the work in your lat.",
    "Let your arm reach fully at the start for a long stretch in your lat.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable pull around": [
    "Imagine putting your elbow into your back pocket.",
    "Reach across your body at the start for a long stretch.",
    "Let your torso turn a little toward the pulley on the reach, then square up as you pull.",
    "Keep your shoulders down, away from your ears.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable kneeling bilateral pull in": [
    "Think of driving your elbow down, not pulling with your hand.",
    "Keep your palm facing up; it keeps the work in your lat.",
    "Let your arm reach fully at the start for a long stretch in your lat.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable kneeling straight-arm pull in": [
    "Keep your arm almost straight; bending the elbow turns this into a row.",
    "Pull from your lat, as if pressing the handle down with your armpit.",
    "Let your arm reach fully at the start for a long stretch in your lat.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable standing bilateral pull in": [
    "Think of driving your elbows down, not pulling with your hands.",
    "Keep your palms facing up; it keeps the work in your lats.",
    "Let your arms reach fully at the start for a long stretch in your lats.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable standing bilateral straight-arm pull in": [
    "Keep your arms almost straight; bending the elbows turns this into a pulldown.",
    "Pull from your lats, as if pressing the handles down with your armpits.",
    "Let your arms reach fully at the start for a long stretch in your lats.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable straight-arm pull in": [
    "Keep your arm almost straight; bending the elbow turns this into a row.",
    "Pull from your lat, as if pressing the handle down with your armpit.",
    "Let your arm reach fully at the start for a long stretch in your lat.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm lat prayer": [
    "Start the pull from your shoulder, not your elbow.",
    "Keep your arm almost straight; bending the elbow turns this into a row.",
    "At the start, your upper arm should be level with your ear.",
    "Push your hips forward as your hand comes down to meet them.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable bent-over bar pullover": [
    "Start the pull from your shoulders, not your elbows.",
    "Keep your arms almost straight the whole time.",
    "Imagine pulling the bar through your thighs at the bottom.",
    "Stay bent over with a flat back; don't stand up as you pull.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable row bar standing row": [
    "Pull with your elbows, not your hands.",
    "Squeeze your shoulder blades together at the end of the pull.",
    "Push your chest out as the handle comes in.",
    "Stay upright; don't lean back to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm neutral-grip row": [
    "Keep your palm facing in, thumb on top, the whole time.",
    "Pull your elbow back close to your side.",
    "Squeeze your shoulder blade back at the end of the pull.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm underhand-grip row": [
    "Keep your palm facing up the whole time; you'll feel more of your biceps and lower lat.",
    "Pull your elbow back close to your side.",
    "Squeeze your shoulder blade back at the end of the pull.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable supinating row": [
    "Turn your palm smoothly from down to up as you pull, and back as you return.",
    "Pull your elbow back close to your side.",
    "Squeeze your shoulder blade back at the end of the pull.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm rear delt row": [
    "Lead with your elbow and keep it level with your shoulder.",
    "Flare your elbow out wide; a tucked elbow shifts the work to your lat.",
    "Keep your shoulders down, away from your ears.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable standing single-arm cross rear delt row": [
    "Lead with your elbow and keep it level with your shoulder.",
    "Keep a slight bend in your arm; pull outward and back, not down.",
    "Keep your shoulders down, away from your ears.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable silverback shrug": [
    "Move only your shoulder blades; your arms stay straight like hooks.",
    "Squeeze your shoulder blades back and slightly up, not straight up to your ears.",
    "Let your shoulders round forward at the start for a full stretch.",
    "Stand upright; don't lean back to pull.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm 30-degree shrug": [
    "Shrug up and in toward your ear, along the line of the cable.",
    "Keep your arm straight; don't bend your elbow to lift.",
    "Let your shoulder drop fully at the bottom for a stretch.",
    "Keep your head still and your neck long.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable leaning single-arm skullover": [
    "Bend your elbow first, then let your upper arm travel back beside your head.",
    "Reverse the order on the way up: upper arm forward, then straighten your elbow.",
    "Feel the stretch along the back of your arm at the bottom.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable behind-the-back lateral raise": [
    "Lead with your elbow; your hand should not rise above it.",
    "Stop when your arm is level with your shoulder.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable low bilateral lateral raise": [
    "Lead with your elbows; your hands should not rise above them.",
    "Stop when your arms are level with your shoulders.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable rope front raise": [
    "Keep your arms straight and raise only to eye level.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Stand tall; don't lean back as the rope comes up.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable rope mid lateral raise": [
    "Lead with your elbow; your hand should not rise above it.",
    "Stop when your arm is level with your shoulder.",
    "Keep your shoulders down, away from your ears.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable overhead press": [
    "Press straight up; finish with your hands above your shoulders.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your wrists straight; don't let them bend back.",
    "Brace your core before every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable upright row": [
    "Lead with your elbows; they stay higher than your hands.",
    "Stop when your elbows reach shoulder height.",
    "If your shoulders pinch, stop lower.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bilateral cross upright row": [
    "Lead with your elbows; they stay higher than your hands.",
    "Stop when your elbows reach shoulder height.",
    "If your shoulders pinch, stop lower.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable high single-arm rear delt fly": [
    "Keep your elbow slightly bent and locked at that angle.",
    "Sweep your arm out and back in a wide arc, like opening a door.",
    "Keep your shoulders down, away from your ears.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable rope kneeling face pull": [
    "Pull toward your face with your elbows high and wide.",
    "Finish with your hands beside your ears, knuckles pointing back.",
    "Use a light weight; this is for your rear shoulders, not a heavy row.",
    "Don't lean back to finish the pull.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable seated rope face pull": [
    "Pull toward your face with your elbows high and wide.",
    "Finish with your hands beside your ears, knuckles pointing back.",
    "Use a light weight; this is for your rear shoulders, not a heavy row.",
    "Don't lean back to finish the pull.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm face pull": [
    "Drive your elbow out and back at shoulder height.",
    "Finish with your hand beside your ear.",
    "Keep your shoulders down, away from your ears.",
    "Brace your core so the cable doesn't twist your torso.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable bar reverse-grip curl": [
    "Keep your palms facing down the whole time.",
    "Keep your elbows pinned to your sides.",
    "Keep your wrists straight; don't let them bend back.",
    "Use less weight than a normal curl; your forearms limit this lift.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bilateral Bayesian curl": [
    "Keep your upper arm behind your body the whole time; that is what stretches the biceps.",
    "Only your forearm moves; don't let your elbow drift forward.",
    "Squeeze your biceps at the top.",
    "Lower all the way until your arm is straight behind you.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm Bayesian curl": [
    "Keep your upper arm behind your body the whole time; that is what stretches the biceps.",
    "Only your forearm moves; don't let your elbow drift forward.",
    "Squeeze your biceps at the top.",
    "Lower all the way until your arm is straight behind you.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable high Bayesian curl": [
    "Keep your upper arm behind your body the whole time; that is what stretches the biceps.",
    "Only your forearm moves; don't let your elbow drift forward.",
    "Squeeze your biceps at the top.",
    "Lower all the way until your arm is straight behind you.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable seated Bayesian curl": [
    "Keep your upper arm behind your body the whole time; that is what stretches the biceps.",
    "Only your forearm moves; don't let your elbow drift forward.",
    "Squeeze your biceps at the top.",
    "Lower all the way until your arm is straight behind you.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable high single-arm rolling curl": [
    "Hinge forward at your hips as you curl, and stand back up as you lower.",
    "Keep your back flat during the hinge.",
    "Squeeze your biceps at the top.",
    "Move smoothly; the curl and the hinge happen together.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable bilateral cross curl": [
    "Curl each hand across your body toward the opposite shoulder.",
    "Keep your upper arms still at your sides.",
    "Squeeze your biceps at the top.",
    "Move slowly; don't use momentum.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bilateral high curl": [
    "Keep your upper arms level with your shoulders the whole time.",
    "Curl your hands toward your ears, like a double-biceps pose.",
    "Squeeze your biceps at the top.",
    "Straighten your arms fully between reps.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm hammer curl": [
    "Keep your thumb on top the whole time, like holding a hammer.",
    "Keep your elbows pinned to your sides.",
    "Move slowly; don't use momentum.",
    "Lower all the way; don't cut the rep short.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm reverse curl": [
    "Keep your palm facing down the whole time.",
    "Keep your elbows pinned to your sides.",
    "Move slowly; don't use momentum.",
    "Keep your wrists straight; don't let them bend back.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable twisting curl": [
    "Turn your palm up as you curl and back to thumb-up as you lower.",
    "Keep your elbows pinned to your sides.",
    "Move slowly; don't use momentum.",
    "At the top, turn your little finger outward for a stronger squeeze.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable bar reverse-grip pushdown": [
    "Keep your upper arms glued to your sides; only your forearms move.",
    "Keep your palms facing up and your wrists straight.",
    "Straighten your arms fully at the bottom.",
    "Use less weight than a normal pushdown; the grip is weaker.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bar rolling pushdown": [
    "Two steps: first pull your elbows down to your sides, then straighten your arms.",
    "On the way up, bend your elbows first, then let them rise forward.",
    "Feel the stretch in your triceps when your elbows are up.",
    "Keep your torso still; don't rock back and forth.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bar skull crusher": [
    "Keep your upper arms beside your ears; only your forearms move.",
    "Keep your elbows pointing forward, not flaring out.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Let the bar travel just behind your head for a full stretch.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable bent-over single-arm overhead tricep extension": [
    "Keep your upper arm beside your ear, in line with your torso.",
    "Keep your upper arm still; only your forearm moves.",
    "Keep your back flat from start to finish.",
    "Straighten your arm fully on every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable bilateral cross skull crusher": [
    "Keep your upper arms still beside your head; only your forearms move.",
    "Straighten your arms fully on every rep.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Let your hands come back beside your ears for a full stretch.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable cross pushdown": [
    "Keep your upper arms about 45 degrees out from your body and don't let them move.",
    "Push down and out, following the line of each cable.",
    "Straighten your arms fully on every rep.",
    "Let your hands cross in front of your chest at the top for a full stretch.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable overhead tricep press": [
    "Push your elbows forward at the bottom until your forearms touch your biceps.",
    "Press straight up toward the ceiling.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Brace your core before every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable single-arm cross pushdown": [
    "Keep your upper arm about 45 degrees out from your body and don't let it move.",
    "Push down and out, following the line of the cable.",
    "Straighten your arm fully on every rep.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm overhead tricep extension": [
    "Point your elbow at the ceiling and keep it there.",
    "Steady your upper arm with your free hand if it drifts.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Straighten your arm fully on every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm pushdown": [
    "Keep your upper arm glued to your side; only your forearm moves.",
    "Straighten your arm fully on every rep.",
    "Keep your wrists straight; don't let them bend back.",
    "Keep your torso still; don't lean or twist to move the weight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable single-arm skull crusher": [
    "Keep your elbow pointing forward and your upper arm beside your ear.",
    "Keep your upper arm still; only your forearm moves.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Straighten your arm fully on every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable standing crunch": [
    "Curl your spine; bring your ribs toward your hips, don't just bow forward.",
    "Keep your hands fixed beside your ears; your arms don't pull.",
    "Breathe out as you lift and in as you lower.",
    "Keep your neck relaxed; don't pull on your head.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "The cable pulls the whole time, so control the way back as well."
  ],
  "Cable kneeling oblique crunch": [
    "Bend straight to the side; don't lean forward or back.",
    "Keep your hips still over your knees.",
    "Keep your hands fixed behind your head; your arms don't pull.",
    "Keep your neck relaxed; don't pull on your head.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable oblique pushdown": [
    "Push the handle down first, then crunch sideways with your arm straight.",
    "Bend straight to the side; don't lean forward or back.",
    "Keep your hips still.",
    "Squeeze your side at the bottom of every rep.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable side bend": [
    "Bend straight to the side; don't lean forward or back.",
    "Keep your arm straight; it only holds the handle.",
    "Keep your hips still; the bend comes from your waist.",
    "Let the handle pull you into a stretch on the way down.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable Pallof press": [
    "Resist the pull; your torso should not turn toward the machine.",
    "Keep your hips and shoulders square to the front.",
    "Press straight out from the middle of your chest.",
    "Move slowly; the further out your hands are, the harder it gets.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable kneeling Pallof press": [
    "Resist the pull; your torso should not turn toward the machine.",
    "Keep your hips and shoulders square to the front.",
    "Press straight out from the middle of your chest.",
    "Squeeze your glutes so your hips stay straight.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable Pallof press rotation": [
    "Press out first, then rotate away from the machine with straight arms.",
    "Turn from your upper back; your hips stay facing forward.",
    "Come back to the centre under control before you bring the handle in.",
    "Use a lighter weight than for a plain Pallof press.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable kneeling Pallof press to wood chopper": [
    "Press out first and hold your torso square; then chop.",
    "Chop diagonally down to your far hip with straight arms.",
    "Squeeze your glutes so your hips stay straight.",
    "Come back to the centre under control before you bring the handle in.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable standing low-to-high wood chopper": [
    "Rotate from your torso; your arms just carry the handle.",
    "Keep your arms almost straight the whole time.",
    "Keep your hips steady; don't let them swing with the handle.",
    "Control the way back; don't let the weight yank you around.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable half-kneeling high-to-low wood chopper": [
    "Rotate from your torso; your arms just carry the handle.",
    "Keep your arms almost straight the whole time.",
    "Keep your hips steady; don't let them swing with the handle.",
    "Control the way back; don't let the weight yank you around.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable half-kneeling low-to-high wood chopper": [
    "Rotate from your torso; your arms just carry the handle.",
    "Keep your arms almost straight the whole time.",
    "Keep your hips steady; don't let them swing with the handle.",
    "Control the way back; don't let the weight yank you around.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable half-kneeling wood chopper": [
    "Rotate from your torso; your arms just carry the handle.",
    "Keep your arms almost straight the whole time.",
    "Keep your hips steady; don't let them swing with the handle.",
    "Control the way back; don't let the weight yank you around.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Cable kneeling wood chopper": [
    "Rotate from your torso; your arms just carry the handle.",
    "Keep your arms almost straight the whole time.",
    "Keep your hips steady; don't let them swing with the handle.",
    "Control the way back; don't let the weight yank you around.",
    "Stand far enough from the machine that the weight stack never touches down.",
    "Do the same number of reps on each side."
  ],
  "Bodyweight lateral lunge": [
    "Sit your hips back over the bent leg; the other leg stays straight.",
    "Keep both feet flat and pointing forward.",
    "Keep the bent knee in line with its toes.",
    "Keep your chest up and your back flat.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Step far enough back that your front shin stays vertical.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight forward lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Take a step long enough that your front shin stays vertical.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight deficit reverse lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "The platform lets your front hip sink lower than the floor version: use that range.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight step-down": [
    "The leg on the box does all the work; the other foot only taps the floor.",
    "Keep your front knee in line with your toes.",
    "Sit your hips back a little as you lower.",
    "Use a lower box if you can't control the way down.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight reverse step-up": [
    "Push through the foot on the box; don't spring off the floor foot.",
    "Keep the knee of the working leg in line with its toes.",
    "Start with a low box; this is harder than it looks.",
    "Lower yourself slowly instead of dropping.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight kickstand squat": [
    "Keep almost all your weight on the flat foot; the back foot only balances.",
    "Brace your core before every rep.",
    "Keep your whole foot on the floor; don't let your heels lift.",
    "Keep your chest up as you come out of the bottom.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight single-leg squat": [
    "Reach your arms forward to counterbalance.",
    "Keep your standing heel on the floor.",
    "Keep the standing knee in line with its toes.",
    "Squat to a box or hold a post until you can go all the way down alone.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight skater squat": [
    "Lean your torso forward and reach your arms out as you go down.",
    "Lower the back knee to the floor gently; don't drop onto it.",
    "Keep the back foot off the floor the whole time.",
    "Put a pad under the back knee to shorten the range while you learn it.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight assisted sissy squat": [
    "Keep a straight line from your knees to your shoulders; don't bend at the hips.",
    "Hold the post lightly for balance; don't pull yourself up with your arm.",
    "Go only as deep as your knees feel comfortable.",
    "Squeeze your glutes to keep your hips forward.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight split squat": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Push through your whole front foot, not just the toes.",
    "Lower straight down; your feet stay where they are.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight heels-up squat": [
    "Keep your knees in line with your toes.",
    "Brace your core before every rep.",
    "Let your knees travel forward over your toes; the raised heels make room for it.",
    "Keep your torso upright all the way down.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight donkey calf raise": [
    "Rise as high as you can onto the balls of your feet.",
    "Pause for a second at the top.",
    "Lower slowly to a full stretch; don't bounce.",
    "Keep your back flat and your hips over your heels.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Standing tibialis raise": [
    "Keep your legs straight; only your ankles move.",
    "Pull your toes as high as you can and pause for a second.",
    "Lower your feet slowly; don't let them slap down.",
    "Move your feet farther from the wall to make it harder.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Nordic hamstring curl": [
    "Keep a straight line from your knees to your head; don't bend at the hips.",
    "Lower as slowly as you can; the way down is the exercise.",
    "Catch yourself with your hands and push off lightly to come back up.",
    "Kneel on a pad and make sure your ankles are held firmly.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Glute-ham raise": [
    "Keep your back flat and your hips straight; don't fold at the waist.",
    "Push your toes into the foot plate as you curl up.",
    "Set the pad so your knees sit just behind it.",
    "Lower slowly until your body is straight and level.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight single-leg deadlift": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your back flat from start to finish.",
    "Keep your hips square to the floor.",
    "Fix your eyes on one spot on the floor to help your balance.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight good morning": [
    "Push your hips back; the movement comes from the hips, not the lower back.",
    "Keep your back flat from start to finish.",
    "Keep a slight bend in your knees.",
    "Keep your elbows wide and your chest open.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Adductor leg raise side lying": [
    "Keep the bottom leg straight with its foot flexed.",
    "Lead with the inner edge of your foot; don't turn your toes up.",
    "Keep your hips stacked; don't roll backward.",
    "Pause for a second at the top of every rep.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight feet-elevated glute bridge": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Push through your heels, not your toes.",
    "Keep your shoulders and head on the floor the whole time.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight feet-elevated single-leg glute bridge": [
    "Squeeze your glutes hard at the top.",
    "Keep your hips level; don't let the free side drop.",
    "Push through your heels, not your toes.",
    "Keep your shoulders and head on the floor the whole time.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight feet-elevated staggered glute bridge": [
    "Squeeze your glutes hard at the top.",
    "Most of the work comes from the leg with the whole foot on the bench; the far heel only helps.",
    "Push through your heels, not your toes.",
    "Keep your shoulders and head on the floor the whole time.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight feet-elevated figure-four glute bridge": [
    "Squeeze your glutes hard at the top.",
    "Let the crossed knee point out to the side and keep it relaxed.",
    "Push through your heels, not your toes.",
    "Keep your hips level; don't let the free side drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight heels-elevated hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your shins vertical at the top.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight single-leg heels-elevated hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Keep your ribs down; don't arch your lower back at the top.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your hips level; don't let the free side drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bodyweight figure-four heels-elevated hip thrust": [
    "Squeeze your glutes hard at the top.",
    "Let the crossed knee point out to the side and keep it relaxed.",
    "Keep your chin tucked and look forward, not at the ceiling.",
    "Keep your hips level; don't let the free side drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Knee push-ups": [
    "Keep your body in one straight line from head to knees.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Lower your chest, not your head.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Incline push-up": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Lower your chest, not your head.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Hand-release push-ups": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Squeeze your shoulder blades together when you lift your hands.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Leg-raised push-up": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Keep your hips square; don't let them twist toward the lifted leg.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Weighted push-ups": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows at about 45 degrees to your body.",
    "Squeeze your glutes and brace your core so your hips don't sag.",
    "Lower your chest, not your head.",
    "Have a partner place the plate on your upper back, between your shoulder blades.",
    "Move smoothly so the plate doesn't slide."
  ],
  "Bodyweight tricep extension": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows tucked in and pointing back, not out to the sides.",
    "Your hands stay where they are; only your elbows bend.",
    "Put your hands on a bench to make it easier.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Underhand inverted row": [
    "Keep your body in one straight line from head to heels.",
    "Keep your elbows close to your ribs.",
    "Squeeze your shoulder blades together at the top.",
    "Walk your feet forward to make it harder, back to make it easier.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Inverted curl": [
    "Keep your body in one straight line from head to heels.",
    "Keep your upper arms still; only your elbows bend.",
    "Pull your forehead toward the bar, not your chest.",
    "Walk your feet back to make it easier.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Gironda chin-up": [
    "Pull your shoulders down away from your ears before you move.",
    "Lean back as you pull so your lower chest meets the bar.",
    "Pull your elbows down and back behind your body.",
    "Don't swing; start every rep from a still hang.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "L-sit chin-up": [
    "Pull your shoulders down away from your ears before you move.",
    "Keep your legs straight and level; bend your knees a little if you can't hold them yet.",
    "Don't swing; start every rep from a still hang.",
    "Start every rep from straight arms.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "L-sit pull-up": [
    "Pull your shoulders down away from your ears before you move.",
    "Keep your legs straight and level; bend your knees a little if you can't hold them yet.",
    "Don't swing; start every rep from a still hang.",
    "Start every rep from straight arms.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Weighted chin-ups": [
    "Pull your shoulders down away from your ears before you move.",
    "Don't swing; start every rep from a still hang.",
    "Lead with your chest, not your chin.",
    "Start every rep from straight arms.",
    "Hang the weight from a dip belt so it sits between your thighs and doesn't swing.",
    "Add weight only once you can do clean bodyweight reps."
  ],
  "Weighted pull-ups": [
    "Pull your shoulders down away from your ears before you move.",
    "Don't swing; start every rep from a still hang.",
    "Lead with your chest, not your chin.",
    "Start every rep from straight arms.",
    "Hang the weight from a dip belt so it sits between your thighs and doesn't swing.",
    "Add weight only once you can do clean bodyweight reps."
  ],
  "Elevated pike press": [
    "Keep your hips high so the weight stays over your hands.",
    "Lower your head in front of your hands, not between them.",
    "Keep your elbows pointing back at about 45 degrees.",
    "Use a lower step, or keep your feet on the floor, to make it easier.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Superman pull": [
    "Keep your chest and legs lifted for the whole pull.",
    "Squeeze your shoulder blades together as your elbows come down.",
    "Look at the floor to keep your neck long.",
    "Squeeze your glutes; don't crank your lower back.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Crunch": [
    "Curl your ribs toward your hips; this is a short movement.",
    "Keep your lower back pressed into the floor.",
    "Keep your neck relaxed; don't pull on your head.",
    "Breathe out as you lift and in as you lower.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Reverse crunch": [
    "Roll your hips up with your abs; don't swing your legs.",
    "Keep your knees bent at the same angle the whole time.",
    "Press your arms into the floor for balance.",
    "Lower your hips slowly; don't let them drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Oblique crunch": [
    "Crunch sideways; bring your ribs toward your hip.",
    "Keep your legs still on the mat.",
    "Keep your neck relaxed; don't pull on your head.",
    "Breathe out as you lift and in as you lower.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Sit-up": [
    "Curl your spine up one segment at a time.",
    "Keep your neck relaxed; don't pull on your head.",
    "Breathe out as you lift and in as you lower.",
    "Lower slowly; don't drop back.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Dead bug": [
    "Keep your lower back pressed into the floor.",
    "Move slowly; reach only as far as your lower back stays down.",
    "Keep the arm and knee that aren't moving perfectly still.",
    "Breathe out as you reach.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Bird dog": [
    "Keep your back flat and level like a table top.",
    "Keep your hips square to the floor.",
    "Reach long instead of high; arm and leg stop in line with your back.",
    "Move slowly and pause for a second at full reach.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Hand plank": [
    "Keep your body in one straight line from head to heels.",
    "Keep your hands under your shoulders.",
    "Squeeze your glutes so your hips don't sag.",
    "Push the floor away so your upper back doesn't sink between your shoulders.",
    "Breathe steadily; don't hold your breath.",
    "End the hold when you can no longer keep the position."
  ],
  "Hand side plank": [
    "Keep your body in one straight line from head to heels.",
    "Keep your supporting hand directly under your shoulder.",
    "Push your hips up; don't let them sag toward the floor.",
    "Stagger your feet, top foot in front, if stacking them is too hard.",
    "Breathe steadily; don't hold your breath.",
    "End the hold when you can no longer keep the position."
  ],
  "Long-lever forearm plank": [
    "Keep your body in one straight line from head to heels.",
    "Squeeze your glutes so your hips don't sag.",
    "The farther forward your elbows are, the harder it gets; move them a little at a time.",
    "Tuck your pelvis under so your lower back doesn't arch.",
    "Breathe steadily; don't hold your breath.",
    "End the hold when you can no longer keep the position."
  ],
  "Plank up-down": [
    "Keep your body in one straight line from head to heels.",
    "Keep your hips level; don't let them rock from side to side.",
    "Place each hand where its elbow was.",
    "Lead with a different arm each set, or switch halfway.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Weighted forearm plank": [
    "Keep your body in one straight line from head to heels.",
    "Squeeze your glutes so your hips don't sag.",
    "Have a partner place the plate on your upper back, not your lower back.",
    "Hold a plain forearm plank for a minute before you add weight.",
    "Breathe steadily; don't hold your breath.",
    "End the hold when you can no longer keep the position."
  ],
  "Hanging knee raises": [
    "Don't swing; start every rep from a still hang.",
    "Pull your shoulders down away from your ears before you move.",
    "Tilt your pelvis up at the top; don't just lift your thighs.",
    "Lower your legs slowly; don't let them drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Hanging L-sit": [
    "Pull your shoulders down away from your ears before you move.",
    "Keep your legs straight and your toes pointed.",
    "Keep your torso vertical; don't lean back.",
    "Bend your knees to a tuck if you can't hold your legs straight yet.",
    "Breathe steadily; don't hold your breath.",
    "End the hold when you can no longer keep the position."
  ],
  "Laying bent leg raise": [
    "Keep your lower back pressed into the floor.",
    "Keep your knees bent at the same angle the whole time.",
    "Don't let your feet rest on the mat between reps.",
    "Lower your legs slowly; don't let them drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Scissor kick": [
    "Keep your lower back pressed into the floor.",
    "Keep both legs straight and off the floor the whole time.",
    "Raise your legs higher if your lower back starts to lift.",
    "Move from your hips at a steady pace.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Windshield wiper": [
    "Keep both shoulders on the floor.",
    "Keep your legs together and move them as one.",
    "Lower only as far as you can control; don't let your legs drop.",
    "Bend your knees 90 degrees to make it easier.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Oblique jackknife": [
    "Lift your legs and upper body at the same time.",
    "Keep your legs straight and stacked.",
    "Use the arm on the floor for balance, not to push yourself up.",
    "Keep your neck relaxed; don't pull on your head.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Alternating heel touch": [
    "Keep your shoulders just off the mat the whole time.",
    "Bend sideways at the waist; don't just reach with your arm.",
    "Keep your lower back pressed into the floor.",
    "Keep your neck relaxed; don't pull on your head.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Eccentric dragon flag": [
    "Keep your body straight from shoulders to toes; don't bend at the hips.",
    "Lower as slowly as you can; aim for 3 to 5 seconds.",
    "Rest your weight on your upper back, not your neck.",
    "Tuck your knees to get back to the top; only the lowering is done straight.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Box jump": [
    "Land with your whole feet on the box, not just your toes.",
    "Swing your arms to help you jump.",
    "Step down from the box; don't jump down.",
    "Start with a low box; add height only when your landings are quiet.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Seated box jump": [
    "Don't rock back first; jump from a still seat.",
    "Land with your whole feet on the box, not just your toes.",
    "Swing your arms to help you jump.",
    "Step down from the box; don't jump down.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Single-leg box jump": [
    "Use a much lower box than for a two-leg jump.",
    "Land on the same foot with your knee in line with your toes.",
    "Swing your arms to help you jump.",
    "Step down from the box; don't jump down.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Depth jump": [
    "Step off the box; don't jump off it.",
    "Spend as little time on the floor as you can.",
    "Keep your knees in line with your toes when you land.",
    "Keep the reps low; this is hard on your legs.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Burpee": [
    "Keep your core braced so your hips don't sag when your feet jump back.",
    "Jump your feet in close to your hands before you stand.",
    "Land softly on the balls of your feet and let your knees bend.",
    "Find a steady rhythm before you speed up.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Jump rope": [
    "Turn the rope with your wrists, not your arms.",
    "Jump only high enough to clear the rope.",
    "Stay on the balls of your feet with your knees soft.",
    "Keep your elbows close to your sides.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Butt kick": [
    "Stay on the balls of your feet.",
    "Keep your thighs pointing down; only your heels kick back.",
    "Keep your torso upright.",
    "Find a steady rhythm before you speed up.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Pop squat": [
    "Keep your chest up when you reach for the floor.",
    "Land softly on the balls of your feet and let your knees bend.",
    "Keep your knees in line with your toes when you land.",
    "Alternate the hand that taps the floor.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Alternating jump lunge": [
    "Keep your front knee in line with your toes.",
    "Keep your torso upright.",
    "Land softly on the balls of your feet and let your knees bend.",
    "Lower into each lunge under control before you jump again.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Lateral lunge jump": [
    "Sit your hips back into each side lunge.",
    "Keep the knee of the bent leg in line with its toes.",
    "Land softly on the balls of your feet and let your knees bend.",
    "Keep your chest up when you tap the floor.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Plank jack": [
    "Keep your hips level; don't let them sag or pike up.",
    "Keep your elbows under your shoulders.",
    "Land lightly on your toes.",
    "Find a steady rhythm before you speed up.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Hand plank jack": [
    "Keep your body in one straight line from head to heels.",
    "Land with your elbows slightly bent to absorb the impact.",
    "Hop your hands only as wide as you can control.",
    "Do it from your knees first if your wrists or shoulders complain.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Elbow plank mountain climber": [
    "Keep your hips level; don't let them sag or pike up.",
    "Keep your elbows under your shoulders.",
    "Drive each knee toward the elbow on the same side.",
    "Find a steady rhythm before you speed up.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Slalom mountain climber": [
    "Keep your hands under your shoulders.",
    "Keep your feet and knees together like a skier.",
    "Twist from your waist; your shoulders stay over your hands.",
    "Land lightly on your toes.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Jumping mountain climber": [
    "Keep your hands under your shoulders.",
    "Land with your whole feet flat, outside your hands.",
    "Keep your chest up in the squat; don't round your back.",
    "Step your feet in one at a time if your hips are too tight to jump.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "In-and-out jump squat": [
    "Land softly on the balls of your feet and let your knees bend.",
    "Keep your knees in line with your toes when you land.",
    "Sit down into a full squat on every landing.",
    "Keep your chest up.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Clapping push-up": [
    "Keep your body in one straight line from head to heels.",
    "Land with your elbows slightly bent to absorb the impact.",
    "Push hard enough that your hands leave the floor before you clap.",
    "Practise from your knees first if you can't leave the floor cleanly.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Explosive push-up": [
    "Keep your body in one straight line from head to heels.",
    "Land with your elbows slightly bent to absorb the impact.",
    "Push as fast as you can on every rep.",
    "Practise from your knees first if you can't leave the floor cleanly.",
    "Warm up first; jumps are hard on cold joints.",
    "Stop the set when your jumps get lower or your landings get loud."
  ],
  "Step-up knee drive": [
    "Push through the foot on the box; don't spring off the floor foot.",
    "Stand all the way up before you drive your knee.",
    "Keep the knee of the standing leg in line with its toes.",
    "Step down slowly; don't drop.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ],
  "Inchworm": [
    "Keep your legs as straight as your hamstrings allow.",
    "Take small steps with your hands.",
    "Keep your hips level; don't let them sag or pike up.",
    "Brace your core in the plank before you walk back.",
    "Move slowly and control every part of the rep.",
    "Stop the set when your form starts to break down."
  ]
};
function exDisplayName(name){if(CFG.lang==='ja'&&EX_NAMES_JA[name])return EX_NAMES_JA[name];if(CFG.lang==='ko'&&EX_NAMES_KO[name])return EX_NAMES_KO[name];return name;}
function tipsFor(name){if(CFG.lang==='ja'&&EX_TIPS_JA[name]&&EX_TIPS_JA[name].length)return EX_TIPS_JA[name];if(CFG.lang==='ko'&&EX_TIPS_KO[name]&&EX_TIPS_KO[name].length)return EX_TIPS_KO[name];return EX_TIPS[name];}
function tipFor(name){const tips=tipsFor(name);return tips&&tips.length?tips[Math.floor(Math.random()*tips.length)]:t('tip_fallback');}

// ═══ EXERCISE INSTRUCTIONS (step-by-step: setup → start → movement) ═══
const EX_INSTRUCTIONS={
  "Barbell front squat Olympic":[
    "Set the bar in a rack at shoulder height; step in and rest it across your front delts with elbows lifted high and fingertips under the bar.",
    "Unrack, step back, and set your feet shoulder-width with toes slightly out.",
    "Brace your core and squat straight down, keeping your torso as upright as possible and elbows high.",
    "Descend until your hips drop below knee level, knees tracking over your toes, heels flat.",
    "Drive up through your whole foot, keeping the elbows up so the bar stays seated, and stand tall."
  ],
  "Dumbbell goblet squat":[
    "Hold one dumbbell vertically against your chest, both palms cupping the top head, elbows pointing down.",
    "Stand with feet slightly wider than shoulder-width, toes turned out a little.",
    "Squat down between your hips, keeping the dumbbell glued to your sternum and chest tall.",
    "At the bottom, let your elbows lightly touch the insides of your knees, heels flat.",
    "Push the floor away to stand back up, exhaling on the way up."
  ],
  "Walking lunge":[
    "Hold a dumbbell in each hand at your sides and stand tall.",
    "Step forward into a lunge until your front thigh is parallel and your back knee hovers just above the floor.",
    "Drive through the front heel and bring the rear leg through into the next step.",
    "Land straight into the next lunge with the opposite leg leading.",
    "Continue alternating legs, keeping your torso upright and the dumbbells still."
  ],
  "Dumbbell step-up":[
    "Stand facing a sturdy knee-height box with a dumbbell in each hand.",
    "Place your whole foot flat on the box.",
    "Drive through that heel to lift your body up — don't push off the floor leg.",
    "Stand fully upright on top with both feet on the box.",
    "Step down under control and repeat, either finishing one leg first or alternating."
  ],
  "Barbell deadlift":[
    "Stand with mid-foot under the bar, feet hip-width; hinge down and grip just outside your shins.",
    "Flatten your back, lift your chest, and pull the slack out of the bar with straight arms.",
    "Brace, then drive the floor away — hips and shoulders rising together, bar dragging up your shins.",
    "Once past the knees, push your hips through to a tall lockout; don't lean back.",
    "Return the bar to the floor with control by hinging first, bending knees once it passes them, and reset each rep."
  ],
  "Cable standing glute kickback":[
    "Set the pulley to its lowest point and cuff the ankle strap to one ankle.",
    "Face the tower, hold the frame, and hinge slightly forward with a soft standing knee.",
    "Sweep the strapped leg straight back and up, squeezing the glute at the top.",
    "Keep the hips square and lower back neutral throughout.",
    "Return under control without letting the stack touch down; finish the set, then switch legs."
  ],
  "Landmine T-bar rows":[
    "Load one end of the bar in a landmine pivot and straddle it, feet planted.",
    "Hinge to about 45 degrees with a flat back and hook the V-handle under the bar.",
    "Pull the handle to your lower chest, elbows driving up and back.",
    "Squeeze your shoulder blades together at the top for a beat.",
    "Lower the plates under control without letting your torso rise; keep the hinge fixed all set."
  ],
  "Machine assisted pull-up":[
    "Set the assist weight on the stack — heavier assist makes the pull easier.",
    "Kneel both knees onto the assist pad and grip the overhead handles slightly wider than shoulders.",
    "Start from straight arms, then pull your elbows down and back until your chin passes hand height.",
    "Lower yourself all the way back to a full hang under control.",
    "Across weeks, reduce the assist weight — the goal is an unassisted pull-up."
  ],
  "Single-arm lat pulldown":[
    "Attach a single D-handle to the high pulley and sit with thighs under the pads.",
    "Reach one arm fully overhead and grip the handle, letting the shoulder stretch upward.",
    "Pull the handle down toward the same-side shoulder, elbow driving to your hip.",
    "Keep your torso square — no twisting or leaning to help.",
    "Return to a full overhead stretch under control; match reps on both arms."
  ],
  "Chest dips":[
    "Mount parallel dip bars with arms locked out, then bend your knees and cross your ankles.",
    "Lean your torso forward about 30 degrees — chest toward the floor.",
    "Lower yourself until your shoulders approach elbow height, elbows flaring slightly out.",
    "Keep the forward lean at the bottom; feel the stretch across your chest.",
    "Press back up by squeezing your chest, stopping just short of a harsh lockout."
  ],
  "Barbell upright row":[
    "Hold a barbell at your thighs with an overhand, shoulder-width grip.",
    "Pull the bar straight up your body, leading with your elbows out to the sides.",
    "Stop when the bar reaches upper-chest height, elbows just above shoulder level.",
    "Keep your wrists below your elbows and the bar close to your shirt the whole way.",
    "Lower slowly to full hanging arms; no swinging or lean-back between reps."
  ],
  "Machine standing lateral raise":[
    "Adjust the seat so your shoulders line up with the machine's pivot point.",
    "Sit tall with the pads resting against the outside of your upper arms, hands light on the grips.",
    "Push through your elbows to raise both arms out to the sides.",
    "Stop when your upper arms are parallel to the floor.",
    "Lower slowly until the pads nearly return, keeping tension off the stack bottom."
  ],
  "Barbell push press":[
    "Rack the bar on your front shoulders, elbows slightly forward, hands just outside shoulders.",
    "Dip: bend your knees into a shallow quarter squat, torso staying perfectly vertical.",
    "Drive: snap your legs straight to launch the bar off your shoulders.",
    "Punch your arms to a full lockout overhead, head moving through once the bar clears.",
    "Lower the bar back to your shoulders, absorbing with soft knees, and reset before the next rep."
  ],
  "EZ bar curl":[
    "Grip the EZ bar's angled sections underhand, hands about shoulder-width.",
    "Stand tall with elbows pinned lightly to your ribs.",
    "Curl the bar to upper-chest height without moving your upper arms.",
    "Squeeze your biceps at the top for a moment.",
    "Lower under control to fully straight arms each rep."
  ],
  "Dumbbell incline curl":[
    "Set a bench to about 45 degrees and lie back with a dumbbell in each hand.",
    "Let both arms hang straight down and slightly behind your torso, palms forward.",
    "Curl both dumbbells up while your elbows keep pointing at the floor.",
    "Squeeze at shoulder height without swinging the elbows forward.",
    "Lower slowly to the full hanging stretch before the next rep."
  ],
  "Dumbbell concentration curl":[
    "Sit on a bench, feet wide, and lean forward.",
    "Brace the back of one elbow against the inside of the same-side thigh, dumbbell hanging.",
    "Curl the dumbbell up toward that shoulder — the elbow never leaves the thigh.",
    "Squeeze hard at the top for a full second.",
    "Lower to a completely straight arm; finish the set, then switch arms."
  ],
  "EZ bar reverse curl":[
    "Grip the EZ bar's angled sections with an overhand (palms-down) grip.",
    "Stand tall, elbows pinned to your sides, wrists dead straight.",
    "Curl the bar to upper-chest height keeping the knuckles up the whole way.",
    "Pause briefly at the top without the wrists buckling.",
    "Lower slowly to straight arms — the negative is where forearms grow."
  ],
  "Machine seated plate-loaded preacher curl":[
    "Set the seat so your armpits hook over the top edge of the sloped pad.",
    "Lay your upper arms flat on the pad and grip the machine handles palms-up.",
    "Curl the handles up toward your shoulders, upper arms staying on the pad.",
    "Squeeze at the top, chest staying against the pad.",
    "Lower to a near-full stretch without letting the stack slam, and repeat."
  ],
  "EZ bar overhead tricep extension":[
    "Sit on an upright bench, feet flat, and press the EZ bar overhead with a narrow grip.",
    "Keep your upper arms vertical beside your ears, elbows pointing forward-up.",
    "Bend only your elbows to lower the bar behind your head.",
    "Stop at a deep, comfortable stretch — upper arms still vertical.",
    "Press back to full lockout overhead without flaring the elbows."
  ],
  "Ab wheel rollout":[
    "Kneel on a mat with the wheel under your shoulders, arms straight.",
    "Tuck your hips slightly and squeeze your glutes to lock your lower back flat.",
    "Roll the wheel forward, letting your body extend into one straight line.",
    "Go only as far as you can without your lower back arching.",
    "Pull the wheel back to the start using your abs, exhaling as you return."
  ],
  "Elbow side plank":[
    "Lie on one side with your forearm on the mat, elbow directly under your shoulder.",
    "Stack your legs straight, top foot on bottom foot.",
    "Lift your hips until your body is one straight line from ankles to head.",
    "Hold, breathing steadily, squeezing the bottom-side waist.",
    "When your hips start to sag, the set is over; rest and switch sides."
  ],
  "Bicycle crunch":[
    "Lie on your back, fingertips at your temples, knees up, shoulder blades curled off the mat.",
    "Draw one knee in while extending the other leg out to hover above the floor.",
    "Rotate your ribcage to bring the opposite elbow toward the bent knee.",
    "Switch sides in a smooth pedaling motion — extend, draw in, rotate.",
    "Keep your lower back pressed into the mat and move slowly both directions."
  ],
  "Dumbbell farmer walk":[
    "Deadlift a heavy dumbbell up in each hand — hinge down and stand up with a flat back, don't stoop.",
    "Stand tall: shoulders back and down, ribs stacked over hips, eyes forward.",
    "Walk with short, quick, controlled steps, keeping both dumbbells dead level.",
    "Keep your grip crushed tight and arms straight — no shrugging or swinging.",
    "Walk for the target time or distance, then set the weights down with a flat-back hinge."
  ],
  "Barbell bench press":[
    "Set a flat bench inside a rack; position the bar so your arms are almost fully extended when you lie below it.",
    "Lie flat, plant both feet on the floor, retract and depress your shoulder blades into the bench, and grip the bar slightly wider than shoulder-width with thumbs wrapped around.",
    "Unrack and lower the bar in a controlled path to your mid-chest, keeping your elbows at roughly 45-75° from your torso.",
    "Press the bar back up along the same path until your arms are fully extended.",
    "Inhale and brace your core before each descent; exhale forcefully as you drive the bar up."
  ],
  "Dumbbell bench press":[
    "Sit on a flat bench with a dumbbell on each knee; kick them up one at a time as you lie back.",
    "Hold the dumbbells directly above your chest with arms extended and palms facing forward.",
    "Lower the dumbbells in a controlled arc until your upper arms are level with the bench, elbows at roughly 60-75°.",
    "Press the dumbbells back up and slightly inward along the same arc to the starting position.",
    "To dismount, bring the dumbbells to your thighs and sit up — never drop them to the floor."
  ],
  "Barbell incline bench press":[
    "Set the bench to 30-45° inside a rack; adjust the bar so your arms are nearly extended when lying below it.",
    "Lie back with shoulder blades retracted, feet flat on the floor, and grip the bar slightly wider than shoulder-width.",
    "Unrack and lower the bar toward your upper chest, just below the collarbone, with elbows traveling at about 60-75°.",
    "Drive the bar straight up until your arms are locked out, then re-rack after your final rep.",
    "Brace your core before each descent and exhale forcefully on the press."
  ],
  "Dumbbell incline bench press":[
    "Set the bench to 30-45°; sit at the low end with a dumbbell on each knee, then kick them up as you lie back.",
    "Position the dumbbells at upper-chest level, palms facing forward, elbows below the dumbbells.",
    "Press both dumbbells up and slightly toward each other until your arms are fully extended.",
    "Lower them back in a controlled arc, keeping elbows at 60-75° until they return to upper-chest level.",
    "After the final rep, bring the dumbbells to your knees and sit up to safely dismount."
  ],
  "Dumbbell decline bench press":[
    "Set the bench to a decline angle and secure your feet firmly under the leg pads.",
    "Lie back and position a dumbbell on each side of your lower chest with elbows bent.",
    "Press both dumbbells up and slightly inward until your arms are fully extended.",
    "Lower them under control until your elbows are at about bench level.",
    "After the final rep, bring the dumbbells to your lower chest and sit up by engaging your core."
  ],
  "Dumbbell chest fly":[
    "Lie flat on a bench; press two dumbbells up to the starting position with arms almost fully extended and a fixed slight bend at the elbow.",
    "Keep that elbow angle locked and open your arms wide in a wide arc toward the floor.",
    "Lower until you feel a deep chest stretch — upper arms roughly level with the bench.",
    "Bring both arms back up in the same arc by squeezing your chest, until the dumbbells are back above your chest.",
    "All movement is from the shoulder joint — the elbow angle never changes."
  ],
  "Cable pec fly":[
    "Set both pulleys to chest or shoulder height; stand in the center and grip one handle in each hand.",
    "Step one foot forward into a staggered stance and lean slightly forward with a flat back; arms extend outward with a slight elbow bend.",
    "Sweep both arms forward and together in a wide arc until the handles meet at about chest height in front of you.",
    "Slowly reverse the arc, letting your arms open back until you feel a full chest stretch.",
    "Control the return — the cables shouldn't pull your arms back uncontrolled."
  ],
  "Machine pec fly":[
    "Adjust the seat so the handles align with your mid-chest; choose a weight and set the arm range to a comfortable stretch position.",
    "Sit with your back pressed flat against the pad and grip the handles with the arms open wide.",
    "Bring both pads forward in a wide arc until they nearly meet in front of your chest.",
    "Slowly allow the pads to separate and travel back to the start, feeling a full stretch.",
    "Keep your back against the pad and avoid shrugging your shoulders at any point."
  ],
  "Machine chest press":[
    "Adjust the seat so the handles are at mid-chest level; select a weight.",
    "Sit with your back flat against the pad and grip the handles with a shoulder-width grip.",
    "Press the handles straight forward until your arms are nearly fully extended — avoid hard locking out.",
    "Control the handles back toward your chest until you feel a full stretch.",
    "Keep your feet flat on the floor and your back in full contact with the pad throughout."
  ],
  "Dumbbell pullover":[
    "Lie across a flat bench with only your upper back on the surface; feet flat on the floor, hips slightly dropped.",
    "Hold one dumbbell with both hands and raise it above your chest with arms almost fully extended and a slight elbow bend.",
    "Lower the dumbbell in an arc behind your head toward the floor, feeling a deep stretch across your chest and lats.",
    "Pull the dumbbell back up in the same arc to directly above your chest.",
    "Keep your hips low and the elbow angle fixed throughout — this is an arc, not a pressing motion."
  ],
  "Machine pulldown":[
    "Adjust the thigh pad to secure your legs; grip the bar wider than shoulder-width with an overhand grip and sit down.",
    "Lean slightly back (10-15°), brace your core, and begin with arms fully extended overhead.",
    "Pull the bar toward your upper chest by driving your elbows down and back, squeezing your lats as it comes in.",
    "Slowly allow the bar to rise back up in a controlled path until your arms are fully extended.",
    "Think 'elbows to hips' rather than just pulling with your hands to keep the focus on your lats."
  ],
  "Underhand pulldown":[
    "Sit at the lat pulldown machine; grip the bar shoulder-width with palms facing toward you (underhand).",
    "Secure your legs under the pad, lean slightly back, and begin with arms fully extended overhead.",
    "Pull the bar to your upper chest by driving your elbows down and squeezing your lats.",
    "Slowly let the bar travel back up until your arms are fully extended again.",
    "Avoid using only your biceps to curl the bar down — the drive should come from retracting your shoulder blades first."
  ],
  "Machine seated cable row":[
    "Sit at the cable row station with feet on the foot rests and knees slightly bent; grip the handle with both hands.",
    "Sit upright with your torso at roughly 90° and arms extended toward the pulley — this is the start.",
    "Pull the handle toward your lower abdomen by driving your elbows back and squeezing your shoulder blades together.",
    "Slowly extend your arms back to the starting position while letting your shoulder blades protract.",
    "Keep your torso upright throughout — avoid rocking back to generate momentum."
  ],
  "Barbell bent over row":[
    "Stand over a barbell with feet hip-width apart; hinge at the hips to roughly 45-70°, grip the bar slightly wider than shoulder-width with an overhand grip.",
    "Keep your back flat, chest tall, and let the bar hang at arm's length — this is your start.",
    "Pull the bar up toward your lower chest or upper abdomen by driving your elbows back and up.",
    "Lower the bar back to the hanging position in a controlled path, arms fully extending.",
    "Hold your torso angle fixed throughout — resist the urge to stand up as you pull."
  ],
  "Dumbbell single-arm row":[
    "Place one hand and the same-side knee on a flat bench; hold a dumbbell in the free hand with your arm hanging straight down.",
    "Keep your back flat and parallel to the floor, core braced — this is your start.",
    "Pull the dumbbell up toward your hip by driving your elbow back and up past your torso.",
    "Lower the dumbbell back down in a controlled arc until your arm is fully extended.",
    "Lead with your elbow, not your hand — this keeps the work on your lat rather than your bicep."
  ],
  "Chest-supported machine row":[
    "Adjust the pad height so your chest rests flat against it; set the handles to a comfortable height.",
    "Sit with your chest pinned firmly against the pad and grip the handles.",
    "Pull the handles back by driving your elbows behind you and squeezing your shoulder blades together.",
    "Slowly return the handles to the start, letting your arms extend fully and your shoulder blades protract.",
    "The chest pad removes lower-back involvement — keep it pinned so your back stays isolated."
  ],
  "Straight arm cable pulldown":[
    "Set the cable pulley to the highest position; grab the bar or rope with a shoulder-width overhand grip.",
    "Step back and lean slightly forward with arms extended overhead — this is the start.",
    "With arms kept nearly straight and just a soft elbow bend, pull the bar down in a wide arc until it reaches your thighs.",
    "Slowly reverse the arc, letting your arms rise back to the overhead starting position.",
    "All movement comes from the shoulder joint — elbows stay fixed throughout. This isolates the lats."
  ],
  "Pull-ups":[
    "Grip a pull-up bar with an overhand grip, hands slightly wider than shoulder-width.",
    "Hang with arms fully extended; retract your shoulder blades slightly to engage your lats before pulling.",
    "Pull yourself up by driving your elbows down toward your hips until your chin clears the bar.",
    "Lower yourself in a fully controlled descent until your arms are straight again.",
    "Avoid kipping or using momentum — full control up and down maximizes lat development."
  ],
  "Chin-ups":[
    "Grip the pull-up bar with hands shoulder-width apart or slightly closer, palms facing toward you (underhand/supinated grip).",
    "Hang with arms fully extended; retract your shoulder blades slightly to engage your lats before pulling.",
    "Pull yourself up by driving your elbows down and toward your hips until your chin clears the bar.",
    "Lower yourself in a fully controlled descent until your arms are straight again.",
    "The underhand grip recruits more bicep than a standard pull-up — drive the movement from your back first, not just your arms."
  ],
  "Smith machine bench press":[
    "Set the bench flat inside the Smith machine; position it so the bar sits at arm's reach when you lie below it.",
    "Lie back, retract and depress your shoulder blades into the bench, and grip the bar slightly wider than shoulder-width.",
    "Rotate the bar off the safety hooks to unrack; hold it above your mid-chest with arms extended.",
    "Lower the bar to your mid-chest in a controlled path, keeping elbows at roughly 60-75° from your torso.",
    "Press the bar back up until your arms are fully extended, then re-rack by rotating onto the hooks after your final rep."
  ],
  "Smith machine inverted row":[
    "Set the Smith bar at hip height or lower; lie face-up underneath it with heels on the floor, body straight.",
    "Grip the bar shoulder-width apart with an overhand grip; your arms are extended and your body is in a plank line.",
    "Pull your chest up to the bar by squeezing your shoulder blades together and driving your elbows back.",
    "Lower yourself in a controlled descent until your arms are fully extended.",
    "Keep your hips and core rigid throughout — your entire body moves as one unit."
  ],
  "Dead hang":[
    "Grip a pull-up bar slightly wider than shoulder-width with an overhand grip.",
    "Step or jump up so your full body weight is hanging with arms fully extended.",
    "Allow your shoulders to rise naturally and your spine to decompress; breathe steadily and steadily.",
    "Hold for the target duration, maintaining grip tension without excessive swinging.",
    "Step or lower yourself down carefully once the hold is complete."
  ],
  "Barbell overhead press":[
    "Set a barbell in a rack at upper-chest height; grip it slightly wider than shoulder-width with thumbs wrapped around.",
    "Unrack, step back, feet shoulder-width apart; hold the bar at upper-chest level with elbows forward and just below the bar.",
    "Press the bar straight up — tuck your head back slightly to clear it — until your arms are fully extended.",
    "Lower the bar back to upper-chest level under control.",
    "Keep your core braced and avoid excessive lower-back lean — drive the bar in a straight vertical path."
  ],
  "Dumbbell seated overhead press":[
    "Sit on an upright bench with your back against the pad; hold a dumbbell in each hand at shoulder height, elbows at 90°, palms forward.",
    "Brace your lower back against the pad and plant feet flat on the floor.",
    "Press both dumbbells directly overhead until your arms are fully extended.",
    "Lower them back to shoulder height, elbows returning to 90°.",
    "Avoid arching your lower back as the weight gets heavier — keep your back in contact with the pad."
  ],
  "Dumbbell Arnold press":[
    "Sit on an upright bench with your back against the pad; hold a dumbbell in each hand at shoulder height, palms facing toward you.",
    "Brace your core and plant your feet flat.",
    "As you press the dumbbells up, rotate your palms outward so they face forward by the time your arms are fully extended.",
    "Lower the dumbbells while rotating your palms back inward until they face toward you again at shoulder height.",
    "The rotation should be smooth and continuous from bottom to top — not a two-stage movement."
  ],
  "Dumbbell lateral raise":[
    "Stand upright holding a dumbbell in each hand at your sides with a slight bend at the elbow.",
    "Brace your core and keep your torso completely still throughout — this is a strict isolation movement.",
    "Raise both arms out to the sides in a wide arc until they are parallel to the floor, leading slightly with your elbows.",
    "Lower the dumbbells back to your sides under full control.",
    "Avoid shrugging your traps — keep your neck long and shoulders depressed throughout."
  ],
  "Cable low single-arm lateral raise":[
    "Set a low cable pulley; stand beside the machine and grip the handle with the hand farthest from the pulley.",
    "Stand upright with your near hand bracing lightly on the machine for balance.",
    "Raise your arm out and up in a wide arc until it is parallel to the floor, the cable pulling across your body.",
    "Lower your arm back down slowly against the cable tension.",
    "Lean slightly away from the pulley to increase the range of motion and maintain tension at the start."
  ],
  "Dumbbell front raise":[
    "Stand upright holding a dumbbell in each hand at your front thighs, palms facing down or inward.",
    "Brace your core, keep your torso upright, and arms almost fully straight.",
    "Raise both arms directly forward and up until they are parallel to the floor.",
    "Lower them back to your thighs in a controlled arc.",
    "Avoid rocking your torso — the movement should come entirely from your front deltoids."
  ],
  "EZ bar front raise":[
    "Stand upright holding an EZ bar with both hands on the angled inner grips, palms semi-inward, the bar at your thighs.",
    "Brace your core and keep your torso completely still.",
    "Raise the bar directly forward and up until your arms are parallel to the floor.",
    "Lower the bar back to your thighs in a controlled arc.",
    "Avoid bending your elbows or rocking your torso to assist — the lift comes entirely from your front deltoids."
  ],
  "Machine overhand overhead press":[
    "Adjust the seat so the handles are at shoulder height; select a weight.",
    "Sit with your back flat against the pad, grip the handles with palms forward, elbows at 90° below the handles.",
    "Press the handles directly overhead until your arms are nearly fully extended.",
    "Lower the handles back to shoulder height under control.",
    "Keep your back in contact with the pad throughout and avoid arching or sliding up the seat."
  ],
  "Smith machine seated overhead press":[
    "Set the bench upright at 90° under the Smith machine; position the bar at just above chin height.",
    "Grip the bar slightly wider than shoulder-width; unrack by rotating it off the hooks.",
    "Press the bar straight up along the fixed vertical path until your arms are fully extended.",
    "Lower it back to upper-chest level under control.",
    "Re-rack by rotating the bar back onto the hooks after your final rep."
  ],
  "Cable face pull":[
    "Set the cable pulley to upper-face height; attach a rope and grip one end in each hand, palms facing down.",
    "Step back to create cable tension; stand with feet shoulder-width apart and arms extended toward the pulley.",
    "Pull the rope toward your face by flaring your elbows out and upward to ear level, externally rotating your upper arms.",
    "At the end of the pull your thumbs point behind you and your hands are at ear level — hold for a brief squeeze.",
    "Slowly return the rope to the start under control; keep your torso still throughout."
  ],
  "Dumbbell rear delt fly":[
    "Hold a dumbbell in each hand; hinge at the hips until your torso is roughly parallel to the floor, arms hanging down.",
    "Keep your back flat, core engaged, and a slight bend in your knees.",
    "Raise both arms out to the sides in a wide arc, leading with your elbows, until they are level with your shoulders.",
    "Squeeze your rear delts at the top, then lower the dumbbells back down under control.",
    "Avoid raising your torso as you lift — hold the hinge angle fixed for the entire set."
  ],
  "Dumbbell laying rear delt fly":[
    "Set the bench to 30-45°; lie face-down with your chest resting on the pad, legs off the end.",
    "Hold a dumbbell in each hand hanging below your shoulders with a neutral grip, arms nearly straight.",
    "Raise both arms out to the sides in a wide arc until they are level with your shoulders.",
    "Squeeze your rear delts at the top, then lower the dumbbells back to the hanging start under control.",
    "The face-down position eliminates momentum — control every rep slowly to maximize rear delt activation."
  ],
  "Machine reverse fly":[
    "Adjust the seat and set the arms so you can grip the handles with arms extended forward at shoulder height.",
    "Sit facing the pad with your chest against it (if applicable); grip the handles with palms facing each other.",
    "Pull both handles back and out in a wide arc, squeezing your rear delts and upper back.",
    "Slowly return the handles forward to the start, arms extending fully.",
    "Avoid shrugging your traps — keep your shoulders depressed and the movement driven by your rear delts."
  ],
  "Barbell curl":[
    "Stand upright holding a barbell at hip level with an underhand grip, hands shoulder-width apart.",
    "Pin your upper arms against your sides, feet shoulder-width apart, core braced.",
    "Curl the bar up toward your shoulders by flexing at the elbows, keeping your upper arms stationary.",
    "Lower the bar back to the starting position in a fully controlled arc — don't let it drop.",
    "Avoid rocking your torso or letting your elbows drift forward — the movement is purely at the elbow joint."
  ],
  "Dumbbell curl":[
    "Stand holding a dumbbell in each hand at your sides with palms facing forward.",
    "Pin your upper arms against your torso; keep your shoulders back and chest tall.",
    "Curl both (or alternating) dumbbells toward your shoulders, keeping your upper arms completely still.",
    "Lower the dumbbells back to the starting position under full control.",
    "Keep your elbows aligned with your torso throughout — they should not drift forward as you curl."
  ],
  "Dumbbell hammer curl":[
    "Stand holding a dumbbell in each hand at your sides with palms facing inward (neutral grip).",
    "Pin your upper arms against your sides and brace your core.",
    "Curl both dumbbells up toward your shoulders with palms remaining in the neutral position throughout.",
    "Lower them back to the fully extended starting position under control.",
    "Don't rotate your wrists — maintaining the neutral grip targets the brachialis and brachioradialis."
  ],
  "Cable bar curl":[
    "Set the pulley to the lowest position and attach a straight bar or EZ bar; grip it underhand at shoulder-width.",
    "Stand upright, step back slightly so the cable is taut, and begin with arms extended downward.",
    "Curl the bar up toward your shoulders, keeping your upper arms stationary and elbows pinned to your sides.",
    "Slowly lower the bar against the cable tension until your arms are fully extended.",
    "The cable provides constant tension at the bottom position — use this to work the full arc more effectively than a dumbbell."
  ],
  "Cable rope hammer curl":[
    "Set the pulley to the lowest position and attach a rope; grip one end in each hand with palms facing each other.",
    "Stand upright, step back so the cable is taut, and begin with arms extended downward.",
    "Curl both ends of the rope up toward your shoulders, keeping palms facing each other throughout.",
    "At the top, you can split the rope slightly outward for a stronger peak contraction.",
    "Lower the rope back under control, allowing your arms to fully extend before the next rep."
  ],
  "EZ bar preacher curl":[
    "Adjust the preacher bench so your upper arms rest fully on the pad and your armpits sit at the top edge.",
    "Grip the EZ bar with an underhand grip; start with arms extended down the slope of the pad.",
    "Curl the bar up by flexing at the elbow until your forearms are vertical or just past.",
    "Lower the bar back down slowly all the way to the fully extended position — feel the full stretch.",
    "The eccentric phase on a preacher bench is especially effective — resist the urge to drop the weight."
  ],
  "Barbell skull crusher":[
    "Lie flat on a bench; grip a barbell or EZ bar with hands shoulder-width, arms extended vertically above your chest.",
    "Keep your upper arms pointing straight up at the ceiling — they stay completely stationary.",
    "Bend only at the elbows and lower the bar toward your forehead or just past your head.",
    "Extend your elbows to press the bar back up to the starting position.",
    "Control the descent carefully — bar proximity to your face demands a deliberately slow negative."
  ],
  "Dumbbell skull crusher":[
    "Lie flat on a bench; hold a dumbbell in each hand with arms extended above your chest, palms facing each other.",
    "Keep your upper arms vertical and completely still — they do not move during the exercise.",
    "Bend at the elbows and lower both dumbbells toward the sides of your head.",
    "Extend your arms back up to the starting position by straightening at the elbows.",
    "If your upper arms are swinging, reduce the weight — this should be a pure elbow hinge."
  ],
  "Cable bar pushdown":[
    "Set the cable pulley to the top position; attach a straight bar or V-bar and grip it overhand.",
    "Stand close to the pulley with elbows pinned at your sides at roughly 90°, leaning slightly forward.",
    "Push the bar down by extending at the elbows until your arms are fully straight.",
    "Allow the bar to rise back up under control until your elbows return to about 90°.",
    "Your elbows are the pivot point and must stay pinned to your sides — they should not drift backward or forward."
  ],
  "Cable rope pushdown":[
    "Set the cable to the highest position; attach a rope and grip one end in each hand with palms facing each other.",
    "Stand with elbows pinned at your sides, bent at roughly 90°, leaning slightly forward.",
    "Push the rope down by extending at the elbows; simultaneously spread the ends of the rope apart as you reach full extension.",
    "Control the rope back up, allowing your elbows to return to 90°.",
    "Splitting the rope at the bottom intensifies the peak tricep contraction — make it deliberate."
  ],
  "Cable rope overhead tricep extension":[
    "Set the cable to the highest position; grab a rope with both hands and face away from the machine.",
    "Step forward and raise the rope overhead; bend your elbows so your hands are behind your head with upper arms beside your ears.",
    "Extend your arms overhead by straightening at the elbows until fully locked out.",
    "Lower the rope back behind your head under control, returning to the bent-elbow starting position.",
    "Your upper arms stay pressed against the sides of your head — only your forearms should move."
  ],
  "Dumbbell single-arm overhead tricep extension":[
    "Hold a dumbbell in one hand; sit on a bench with back support and press the dumbbell overhead until your arm is fully extended.",
    "Bend your elbow, lowering the dumbbell behind your head — your upper arm stays vertical beside your head.",
    "Extend your arm back up by contracting your tricep until it is fully straight overhead.",
    "Lower with full control on every rep.",
    "Support your working arm's elbow with your free hand if it tends to drift forward."
  ],
  "Barbell close-grip bench press":[
    "Lie flat on a bench inside a rack; grip the bar narrower than shoulder-width (about fist-width apart) with thumbs wrapped around.",
    "Unrack with arms fully extended above your chest.",
    "Lower the bar to your lower chest/sternum, keeping your elbows tucked close to your ribs — not flaring out.",
    "Press the bar back up along the same path until your arms are fully extended.",
    "The narrow grip and tucked elbows shift the primary load from your chest to your triceps."
  ],
  "Parallel bar dips":[
    "Grip the parallel bars and jump up so your arms are locked out, body suspended above the bars.",
    "Keep your torso upright (leaning forward shifts emphasis to chest) and elbows pointing straight back.",
    "Lower your body by bending at the elbows until your upper arms are at least parallel to the floor.",
    "Push back up by extending your elbows until your arms are fully locked out.",
    "Add weight (dumbbell between legs or a dip belt) once bodyweight reps feel easy."
  ],
  "Diamond push-ups":[
    "Get into a push-up position; bring your hands together under your sternum so your index fingers and thumbs form a diamond shape.",
    "Keep your body in a rigid plank from head to heels with core and glutes braced.",
    "Lower your chest toward the diamond by bending your elbows — they track backward, not flaring outward.",
    "Push back up to the start, fully extending your arms.",
    "Drop to your knees to decrease difficulty or elevate your feet to increase it."
  ],
  "Dumbbell tricep kickback":[
    "Place one hand and the same-side knee on a bench; hold a dumbbell in the free hand with your upper arm parallel to the floor.",
    "Brace your core and keep your back flat — your upper arm stays pinned parallel to the floor for the entire set.",
    "Extend your forearm backward by straightening your elbow until your entire arm is parallel to the floor.",
    "Bend the elbow back to 90° in a controlled return.",
    "Your upper arm must not drop or swing — only your forearm moves at the elbow."
  ],
  "Cable tricep kickback":[
    "Attach a D-handle to the low pulley; stand beside the machine and grip it with one hand, palm facing inward.",
    "Hinge at the hips until your torso is about 45° to the floor; pin your upper arm against your torso, parallel to the floor.",
    "Extend your forearm backward by straightening your elbow until your entire arm is parallel to the floor.",
    "Slowly bend your elbow back to 90° against the cable resistance.",
    "Your upper arm stays completely fixed — only your forearm pivots at the elbow."
  ],
  "Forearm plank":[
    "Kneel and place both forearms flat on the floor, elbows directly under your shoulders, hands in fists or flat.",
    "Extend both legs back into a plank so only your forearms and toes are on the floor; lift your hips until your body is in a straight line.",
    "Brace your core as if absorbing a punch, squeeze your glutes, and keep your hips perfectly level.",
    "Hold this position while breathing steadily — do not hold your breath.",
    "End the hold by dropping your knees to the floor; stop the moment your form begins to break down."
  ],
  "Laying leg raises":[
    "Lie flat on the floor with your arms at your sides or under your glutes for lumbar support.",
    "Begin with your legs extended and lifted just slightly off the floor.",
    "Raise both legs together until they are vertical (or as high as is comfortable), keeping them as straight as possible.",
    "Lower your legs back down slowly — stop just before your heels touch the floor.",
    "Keep your lower back pressed into the floor throughout; if it peels up, raise your legs higher on the descent."
  ],
  "Hanging leg raise":[
    "Grip the vertical knee raise station handles (or a pull-up bar) and hang with arms extended, body straight.",
    "Begin with your legs straight and hanging directly below you.",
    "Raise your legs with knees straight (or slightly bent) until they are at least parallel to the floor — higher if you can.",
    "Lower your legs slowly back to the hanging position without swinging.",
    "Resist momentum — a slow and controlled rep builds far more core strength than swinging."
  ],
  "Decline sit-ups":[
    "Hook your feet securely under the leg pads of a decline bench; lie back with arms crossed or hands lightly behind your head.",
    "Start at the bottom with your torso parallel to the floor and your back flat on the pad.",
    "Curl your torso upward by contracting your abs until your torso is roughly vertical.",
    "Lower back down slowly until your back is flat on the pad again.",
    "If hands are behind your head, they are there only for support — do not pull your neck forward."
  ],
  "Machine crunch":[
    "Adjust the seat height so the arm pads rest on your upper chest or shoulders; select a weight.",
    "Sit with your back against the pad, grip the handles, and brace your core.",
    "Crunch forward by curling your ribcage toward your pelvis using your abs to pull the pads down.",
    "Slowly return to the upright starting position under control.",
    "This is a spinal curl — your hips stay fixed on the seat; only your torso rounds."
  ],
  "Cable rope kneeling crunch":[
    "Set the cable to the top position and attach a rope; kneel below the pulley and grip one end of the rope in each hand at either side of your face.",
    "Keep your hips completely still in the kneeling position — they should not move.",
    "Crunch downward by rounding your spine, pulling your elbows toward your thighs.",
    "Hold the contracted position for a brief count, then slowly rise back to the starting position while keeping cable tension.",
    "Only your abs should be doing the work — your hips must not sink back toward your heels."
  ],
  "Bodyweight Russian twist":[
    "Sit on the floor with knees bent and feet slightly lifted; lean your torso back to roughly 45°.",
    "Hold a weight plate or dumbbell with both hands extended in front of your chest.",
    "Rotate your torso to one side, bringing the weight toward the floor beside your hip.",
    "Rotate all the way to the opposite side in one continuous motion, keeping your feet off the floor.",
    "The rotation comes from your obliques — let your torso lead the movement, not just your arms."
  ],
  "Mountain climber":[
    "Start in a high push-up/plank position with hands directly under your shoulders and your body in a rigid straight line.",
    "Brace your core; hips should be neither sagging nor piked.",
    "Drive one knee toward your chest while the opposite leg remains extended.",
    "As that foot returns to the start, immediately drive the other knee forward in a running alternation.",
    "Keep your hips level at plank height throughout — they should not bounce with each drive."
  ],
  "Barbell hip thrust":[
    "Sit on the floor with your upper back against a bench; roll a loaded barbell over your legs and position it across your hips — use a foam pad for comfort.",
    "Plant your feet flat on the floor hip-width apart, knees bent at roughly 90°, toes slightly out; upper back rests across the middle of the bench.",
    "Drive through your heels, squeeze your glutes, and push your hips up until your thighs are parallel to the floor and your body forms a straight line from knees to shoulders.",
    "Lower your hips back toward the floor under control and repeat.",
    "Keep your chin tucked and avoid looking at the ceiling — this helps prevent lower-back overextension at the top."
  ],
  "Dumbbell hip thrust":[
    "Sit on the floor with your upper back against a bench; place a dumbbell across your hips and hold it with both hands.",
    "Feet flat on the floor hip-width apart, knees bent at about 90°.",
    "Drive through your heels and squeeze your glutes to lift your hips until your body forms a straight line from knees to shoulders.",
    "Lower your hips back toward the floor under control.",
    "Keep your chin tucked; stop at the top when your body is straight — do not hyperextend your lower back."
  ],
  "Smith machine hip thrust":[
    "Place a bench behind you and sit with your upper back against it; position the Smith bar at hip level and use a pad.",
    "Rotate the bar off the hooks to unrack; plant feet flat on the floor hip-width apart, knees at 90°.",
    "Drive your hips up by pressing through your heels and squeezing your glutes until your body is straight.",
    "Lower your hips back down slowly, then re-rack by rotating the bar onto the hooks after your final rep.",
    "Set the safety hooks at a height that will catch the bar if you need to bail."
  ],
  "Glute bridge":[
    "Lie flat on the floor with knees bent, feet flat hip-width apart, arms at your sides.",
    "Press your feet and arms down into the floor for stability.",
    "Drive your hips upward by squeezing your glutes until your body forms a straight line from shoulders to knees.",
    "Hold the top contraction for one to two seconds, then lower your hips to just above the floor — not fully resting.",
    "Keep tension on your glutes by stopping an inch above the floor at the bottom of each rep."
  ],
  "Machine hip thrust":[
    "Adjust the machine's seat and shoulder pad per the guide so your hips can fully extend at the top.",
    "Sit with your back against the seat and feet flat on the footplate hip-width apart.",
    "Drive through your heels and squeeze your glutes to push your hips forward against the pad's resistance.",
    "Hold the fully extended position for one count, then lower under control.",
    "Stop at full hip extension — do not allow your lower back to hyperextend."
  ],
  "Dumbbell forward lunge":[
    "Stand upright holding a dumbbell in each hand at your sides; take a long step forward with one foot.",
    "Keep your torso upright with your front shin nearly vertical and your front knee tracking over your second toe.",
    "Lower your back knee toward the floor until your front thigh is roughly parallel to the floor.",
    "Drive through your front heel to push yourself back up to standing.",
    "Step forward with the opposite foot for alternating lunges, or complete all reps on one side before switching."
  ],
  "Bulgarian split squat":[
    "Place your rear foot on a bench or elevated surface behind you; step your front foot far enough forward so your shin stays vertical when you lower.",
    "Stand tall with torso upright, core braced; hold dumbbells at your sides or a barbell across your back.",
    "Lower your back knee toward the floor by bending both knees simultaneously, keeping your front shin vertical.",
    "Drive through your front heel to push back up to the starting position.",
    "Most of your weight should be on your front foot — the rear foot provides balance, not a push-off."
  ],
  "Machine leg press":[
    "Adjust the seat so your knees are at roughly 90° when feet are flat on the platform, shoulder-width apart with toes slightly out.",
    "Sit with your entire back and glutes in contact with the seat; grip the handles.",
    "Press the platform away until your legs are nearly straight — avoid fully locking your knees.",
    "Slowly bend your knees and lower the platform until your thighs are at about 90°.",
    "Never allow your lower back to peel off the seat — if it does, reduce your range of motion."
  ],
  "Machine hack squat":[
    "Adjust the shoulder pads; step onto the foot plate shoulder-width apart with toes slightly out and back flat against the backrest.",
    "Place your shoulders under the pads and release the safety handles to start.",
    "Lower by bending your knees until your thighs reach at least parallel to the foot plate.",
    "Drive through your heels to push the sled back up until your legs are nearly straight, then engage the safety handles after your final rep.",
    "Keep your heels flat on the platform and avoid letting your knees cave inward throughout."
  ],
  "Smith machine squat":[
    "Set the bar at upper-chest height; position your feet slightly forward of the bar, shoulder-width apart, toes out.",
    "Step under the bar, rest it on your upper traps, and unrack by rotating it off the hooks.",
    "Squat down by bending your knees and hips simultaneously until your thighs are at least parallel to the floor.",
    "Drive through your heels to return to standing, then re-rack after the final rep.",
    "The fixed bar path may feel unusual — move your feet forward until the descent feels natural for your build."
  ],
  "Barbell squat":[
    "Set the bar at shoulder height in a rack; step under and rest it across your upper traps, hands slightly wider than shoulder-width.",
    "Unrack and step back; feet shoulder-width apart, toes turned slightly out, brace your core and keep your chest tall.",
    "Descend by pushing your hips back and bending your knees together — keep your chest up and knees tracking over your toes.",
    "Reach at least parallel depth, then drive through your heels to stand back up.",
    "Always use safety bars set at or just below your parallel depth when training without a spotter."
  ],
  "Machine leg extension":[
    "Adjust the seat back and shin pad so your knee joint aligns with the machine's pivot; set the shin pad at your lower shin.",
    "Sit with your back against the pad, grip the handles, and shins against the pad.",
    "Extend both legs by contracting your quads until your legs are fully straight.",
    "Hold the peak contraction briefly, then lower the pad back to the starting position under control.",
    "Avoid using momentum — the movement is purely from your knee joint, not a swinging motion."
  ],
  "Dumbbell sumo squat":[
    "Stand with feet significantly wider than shoulder-width, toes pointing out at roughly 45°; hold one dumbbell vertically with both hands between your legs.",
    "Keep your torso upright and core braced — the dumbbell hangs freely between your legs.",
    "Bend both knees while pushing them outward in line with your toes; lower until your thighs are parallel or below.",
    "Drive through your heels to straighten your legs back to standing.",
    "Keep your chest tall throughout and avoid rounding your lower back as you descend."
  ],
  "Barbell Romanian deadlift":[
    "Stand holding a barbell at hip level with an overhand grip, feet hip-width apart.",
    "Keep your back flat, chest tall, and a soft bend in your knees.",
    "Hinge at the hips — push them backward — lowering the bar along your legs, keeping it close to your body.",
    "Stop when your hamstrings are fully stretched and before your lower back rounds; re-drive your hips forward.",
    "Squeeze your glutes hard at the top and stand fully before the next rep."
  ],
  "Dumbbell Romanian deadlift":[
    "Stand holding a dumbbell in each hand in front of your thighs, palms facing your body.",
    "Keep your back flat, a soft bend in your knees, and brace your core.",
    "Hinge at the hips and lower the dumbbells along your legs — keep them close to your shins.",
    "Stop when you feel your hamstrings fully stretched and before your lower back rounds.",
    "Drive your hips forward and squeeze your glutes hard to return to standing."
  ],
  "Smith machine Romanian deadlift":[
    "Position your feet slightly forward of the bar; set the bar at mid-thigh height and grip it overhand at shoulder-width.",
    "Unrack by rotating the bar off the hooks; stand tall with the bar in front of your thighs.",
    "Hinge at the hips, pushing them backward as the bar travels down your legs in the fixed path.",
    "Stop when your hamstrings reach their limit, then drive your hips forward to return to standing.",
    "The Smith's fixed vertical path differs from a free bar — adjust your foot position forward until the movement feels natural."
  ],
  "Machine hamstring curl":[
    "Lie face-down on the machine; align your knee joint with the machine pivot and position the pad just above your heels.",
    "Grip the handles for stability and keep your hips pressed flat into the pad.",
    "Curl your legs up by bending your knees, pulling the pad toward your glutes.",
    "Slowly lower the pad back to the starting position under control.",
    "If your hips lift off the pad during the curl, reduce the weight — that's a sign of compensation."
  ],
  "Machine seated leg curl":[
    "Adjust the seat back and the leg pad so your knee joint aligns with the machine pivot; the upper pad should secure your thighs.",
    "Sit with your back against the pad, grip the handles, thighs pressed under the upper pad.",
    "Flex your knees to pull the lower pad toward the floor, contracting your hamstrings.",
    "Slowly raise the pad back to the starting position under control.",
    "Keep your thighs pressed against the upper pad throughout so they don't rise and your hamstrings bear the full load."
  ],
  "Machine seated calf raises":[
    "Sit on the machine and position the knee pads just above your knees; place only the balls of your feet on the footplate with heels hanging off.",
    "Lower your heels as far as possible to achieve a full calf stretch.",
    "Press through the balls of your feet to raise your heels as high as possible, fully contracting your calves.",
    "Lower back down slowly to the full stretch position.",
    "Pause briefly at both the top and bottom to eliminate bounce momentum."
  ],
  "Machine plate-loaded calf raise":[
    "Step onto the platform with only the balls of your feet on the edge; position your shoulders under the pads.",
    "Begin with heels lowered as far as possible to the full stretch.",
    "Press through the balls of your feet to raise your heels as high as possible, squeezing your calves.",
    "Lower your heels back down slowly for the full stretch before the next rep.",
    "Keep your legs fully straight — bending your knees shifts the load away from the gastrocnemius."
  ],
  "Machine horizontal leg press calf raise":[
    "Sit in the leg press machine; place only the balls of your feet at the lower edge of the platform.",
    "Keep your legs nearly straight with just a very slight knee bend — do not engage your quads.",
    "Lower your heels toward the floor as far as the machine allows for a full calf stretch.",
    "Press through the balls of your feet to push the platform away, fully raising your heels.",
    "Pause at the top before lowering; slow, deliberate reps are far more effective than fast bouncing."
  ],
  "Hack squat calf raise":[
    "Step onto the hack squat footplate with only the balls of your feet at the lower edge, heels hanging off; shoulders under the pads.",
    "Keep your legs fully extended — knees straight — and release the safety handles.",
    "Lower your heels as far below the footplate edge as possible for the full calf stretch.",
    "Drive through the balls of your feet to raise your heels as high as possible.",
    "Re-engage the safety handles after your final rep; your legs must remain fully extended throughout the set."
  ],
  "Dumbbell calf raise":[
    "Hold a dumbbell in one hand; stand with the balls of your feet on an elevated surface such as a step or weight plate, heels hanging off.",
    "Hold a stable surface with your free hand for balance.",
    "Lower your heel as far as possible to achieve a full calf stretch.",
    "Press through the ball of your foot to raise your heel as high as possible.",
    "Complete all reps on one foot before switching, or use two dumbbells and work both calves together."
  ],
  "Smith machine calf raise":[
    "Place a step or plate on the floor inside the Smith machine; rest the bar on your upper traps and unrack.",
    "Place only the balls of your feet on the edge of the step, heels hanging off.",
    "Lower your heels as far as possible for a full stretch.",
    "Drive through the balls of your feet to raise your heels as high as possible.",
    "Re-rack after your final rep; the Smith machine allows heavier loading than dumbbells for progressive overload."
  ],
  "Machine hip adduction":[
    "Sit on the adductor machine; adjust the pads so they rest on your inner thighs with your legs spread to the starting position.",
    "Sit with your back flat against the seat and grip the handles.",
    "Squeeze your legs together against the pad resistance, bringing your thighs toward each other.",
    "Slowly allow your legs to spread back to the starting position under control.",
    "Keep your back flat and avoid rounding forward to assist the movement."
  ],
  "Machine hip abduction":[
    "Sit on the abductor machine; adjust the pads so they rest on your outer thighs with your legs together.",
    "Sit with your back flat against the pad and grip the handles.",
    "Push your legs outward against the pad resistance as far as the machine allows.",
    "Slowly bring your thighs back together to the starting position under control.",
    "Lean slightly forward from your hips to bias the glute medius rather than your hip flexors."
  ],
  "Barbell shrug":[
    "Stand over a loaded barbell with feet hip-width apart; grip it overhand just outside hip-width and lift it to a standing position.",
    "Let the bar hang at your thighs with arms completely straight.",
    "Shrug your shoulders straight up toward your ears as high as possible.",
    "Hold the top position for one count, then lower your shoulders back down slowly.",
    "Do not roll your shoulders — the movement is a pure vertical shrug. Arms stay dead-straight throughout."
  ],
  "Dumbbell shrug":[
    "Stand holding a dumbbell in each hand at your sides with arms fully extended.",
    "Stand upright, feet shoulder-width apart, core braced.",
    "Shrug both shoulders straight up toward your ears as high as possible.",
    "Hold the top for one count, then lower your shoulders back down with control.",
    "Arms stay completely straight — do not bend your elbows or roll your shoulders."
  ],
  "Smith machine shrug":[
    "Stand inside the Smith machine; grip the bar in front of your thighs with an overhand grip at shoulder-width.",
    "Unrack by rotating the bar off the hooks; stand with the bar at thigh level, arms straight.",
    "Shrug your shoulders straight up toward your ears as high as possible.",
    "Lower your shoulders back down slowly under control.",
    "Re-rack after your final rep; the fixed bar path makes heavy shrug work safer and more stable."
  ],
  "Dumbbell wrist curl":[
    "Sit at the end of a bench; rest your forearms on your thighs with palms facing up, wrists just past your knees.",
    "Hold a dumbbell in each hand; let them roll toward your fingertips for a full starting stretch.",
    "Curl your wrists upward as far as possible, contracting your forearm flexors.",
    "Lower back to the fully stretched position under control.",
    "Keep your forearms flat on your thighs throughout — only your wrists should move."
  ],
  "Dumbbell wrist extension":[
    "Sit at the end of a bench; rest your forearms on your thighs with palms facing down, wrists just past your knees.",
    "Hold a dumbbell in each hand; let your wrists lower toward the floor for a full starting stretch.",
    "Curl your wrists upward by contracting the extensor muscles on the back of your forearms.",
    "Lower back to the fully stretched position under control.",
    "Use lighter weight than wrist curls — the extensors are smaller and fatigue quickly; high reps with control are ideal."
  ],
  "Push-up":[
    "Place your hands on the floor slightly wider than shoulder-width, arms straight, body in a rigid plank from head to heels.",
    "Engage your core and squeeze your glutes — this locked plank is your starting and finishing position.",
    "Lower your chest toward the floor by bending your elbows at roughly 45° from your torso until your chest nearly touches.",
    "Push the floor away and extend your elbows until your arms are fully straight.",
    "Your hips must not sag or pike — your body moves as one rigid unit every rep."
  ],
  "Bodyweight pike press":[
    "Start in a high plank/push-up position; walk your feet toward your hands until your body forms an inverted V with hips high.",
    "Keep your legs as straight as possible — the closer your feet, the steeper the shoulder angle.",
    "Lower your head toward the floor between your hands by bending your elbows outward and slightly inward.",
    "Push back up until your arms are fully extended, returning to the inverted-V position.",
    "Moving your feet farther from your hands makes the exercise easier; closer makes it harder and more shoulder-dominant."
  ],
  "Wide-grip cable row":[
    "Attach a long straight bar to the low cable; sit on the bench with feet on the foot rests and grip the bar wider than shoulder-width.",
    "Sit upright with arms extended toward the pulley — this is the start.",
    "Pull the bar toward your lower chest by driving your elbows back and out to the sides, squeezing your upper back and rear delts.",
    "Slowly extend your arms back to the start, letting your shoulder blades protract fully.",
    "The wide grip and flared elbows shift the load from your lats to your upper back and rear delts compared to a narrow-grip row."
  ],
  "Cable standing single-arm chest fly":[
    "Set the cable to shoulder or upper-chest height; stand sideways to the machine and grab the handle with the hand farthest from the pulley.",
    "Step away for cable tension and stagger your feet for balance; your working arm extends outward with a chest stretch.",
    "Sweep your arm forward and across your body in a wide arc until your hand crosses the midline in front of your chest.",
    "Slowly reverse the arc, allowing the cable to pull your arm back out to the starting stretch position.",
    "Keep a slight bend in your elbow throughout — all movement is from your shoulder joint."
  ],
  "Back extension":[
    "Adjust the hyperextension bench so the hip pad sits just below your hip bones; hook your feet securely under the ankle rollers.",
    "Cross your arms over your chest; let your torso hang down toward the floor — this is your starting position.",
    "Raise your torso by contracting your lower back and glutes until your body is in a straight horizontal line.",
    "Lower back down to the hanging starting position under control.",
    "Stop at horizontal — do not hyperextend past a straight line, which places excessive strain on your lumbar spine."
  ],
  "Barbell decline bench press":[
    "Lie back on a decline bench and hook your ankles securely under the padded rollers.",
    "Grip the bar slightly wider than shoulder-width and unrack it over your lower chest.",
    "Lower the bar under control to your lower chest, elbows at roughly 45 degrees from your torso.",
    "Press the bar back up to full arm extension without losing the arch in your upper back.",
    "Rerack carefully at the end of the set, since a decline bench is harder to bail out of than a flat one."
  ],
  "Barbell floor press":[
    "Lie flat on the floor with a loaded barbell, knees bent and feet flat.",
    "Grip the bar just outside shoulder width and hold it with arms extended above your chest.",
    "Lower the bar until your upper arms/triceps rest on the floor.",
    "Press the bar back up to full extension, focusing on driving through your triceps.",
    "Reset your breath and brace before each rep since there's no bounce off the floor to help you."
  ],
  "Barbell pullover":[
    "Lie on a flat bench with only your shoulders and upper back supported, hips lower than your shoulders.",
    "Hold a barbell with straight arms directly above your chest.",
    "Keeping your elbows slightly bent and fixed, lower the bar in an arc behind your head until you feel a stretch.",
    "Pull the bar back up along the same arc to the starting position over your chest.",
    "Keep your core braced throughout so your lower back doesn't arch to add extra range."
  ],
  "Dumbbell incline chest fly":[
    "Lie back on an incline bench set to 30-45 degrees, a dumbbell in each hand.",
    "Extend your arms above your chest with a slight bend in your elbows, palms facing each other.",
    "Lower your arms out to the sides in a wide arc until you feel a stretch across your upper chest.",
    "Bring the dumbbells back together above your chest, squeezing your chest at the top.",
    "Keep the same slight elbow bend throughout every rep."
  ],
  "Dumbbell decline chest fly":[
    "Lie back on a decline bench, a dumbbell in each hand held above your lower chest.",
    "Keep a slight, fixed bend in your elbows, palms facing each other.",
    "Lower your arms out to the sides in a wide arc to chest level.",
    "Bring the dumbbells back together above your chest, squeezing at the top.",
    "Have a spotter hand you the dumbbells to get into position safely."
  ],
  "Dumbbell floor press":[
    "Lie flat on the floor with a dumbbell in each hand, knees bent and feet flat.",
    "Curl the dumbbells up to your chest, then press them up to full extension above you.",
    "Lower the dumbbells under control until your triceps rest on the floor.",
    "Press back up to full extension, keeping your wrists stacked over your elbows.",
    "Repeat for the set, then lower the dumbbells to your chest and set them down safely."
  ],
  "Dumbbell neutral bench press":[
    "Lie on a flat bench with a dumbbell in each hand, palms facing each other.",
    "Start with the dumbbells at chest height, elbows bent.",
    "Press the dumbbells straight up, keeping your palms facing each other the entire time.",
    "Bring the dumbbells close together at the top without letting them touch.",
    "Lower back to chest height under control and repeat."
  ],
  "Smith machine incline bench press":[
    "Position an incline bench under the bar of a Smith machine.",
    "Lie back and grip the bar slightly wider than shoulder-width, then twist to unrack it.",
    "Lower the bar to your upper chest under control.",
    "Press the bar back up to full extension along the machine's fixed path.",
    "Twist to rerack the bar securely once your set is finished."
  ],
  "Machine assisted parallel bar dips":[
    "Set the assist weight on the machine's stack — more weight means more assistance.",
    "Kneel or stand on the platform and grip the parallel dip handles.",
    "Lower your body by bending your elbows until your upper arms are roughly parallel to the floor.",
    "Press back up to full arm extension without locking out aggressively.",
    "As you get stronger over time, reduce the assist weight to rely on more of your own bodyweight."
  ],
  "Cable decline chest fly":[
    "Set both pulleys high on a dual-pulley cable station and grip a handle in each hand.",
    "Stand centered between the towers with a slight forward lean, arms extended out to the sides.",
    "Sweep your hands down and together in an arc until they cross in front of your hips.",
    "Squeeze your chest at the bottom of the crossing motion.",
    "Control the return back to the starting position and repeat."
  ],
  "Cable incline chest fly":[
    "Set both pulleys low on a dual-pulley cable station and grip a handle in each hand.",
    "Stand centered between the towers, arms starting down and out to the sides.",
    "Sweep your arms up and in until your hands meet above chest height.",
    "Squeeze your chest at the top before controlling the return.",
    "Keep a slight, fixed bend in your elbows throughout every rep."
  ],
  "Decline push-up":[
    "Place your feet on a sturdy box or bench and your hands on the floor under your shoulders.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward the floor, elbows at roughly 45 degrees.",
    "Press back up to full arm extension without letting your hips sag or pike.",
    "Repeat for the set, keeping your core braced throughout."
  ],
  "Wide-grip push-ups":[
    "Place your hands on the floor noticeably wider than shoulder width.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward the floor, letting your elbows flare out to the sides.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your core braced to prevent your hips from sagging."
  ],
  "Barbell pronated Pendlay row":[
    "Set a barbell on the floor and bend over at the hips until your torso is roughly parallel to the floor.",
    "Grip the bar with hands just outside shoulder width, arms extended straight down.",
    "Pull the bar explosively up to your lower chest, driving your elbows up and back.",
    "Lower the bar back to a full stop on the floor.",
    "Reset your position and repeat for each rep, keeping your back flat throughout."
  ],
  "Barbell rack pull":[
    "Set the safety pins in a squat rack to roughly knee height and load the barbell on top.",
    "Stand at the bar with feet hip-width, hinge down, and grip the bar just outside your shins.",
    "Brace your core and pull the bar up by extending your hips and knees together.",
    "Stand fully upright, squeezing your glutes at the top without leaning back.",
    "Lower the bar back down to the pins under control and reset for the next rep."
  ],
  "Yates row":[
    "Stand over a barbell and bend forward to roughly 45 degrees.",
    "Grip the bar with an underhand grip, hands about shoulder-width apart.",
    "Pull the bar up toward your lower ribs/waist, driving your elbows down and back.",
    "Lower the bar back to the starting position under control.",
    "Keep your torso at the same 45-degree angle throughout the set."
  ],
  "Dumbbell laying incline row":[
    "Set an incline bench to a low angle and lie face-down with your chest against the pad.",
    "Let a dumbbell hang in each hand with your arms fully extended.",
    "Row the dumbbells up toward your hips, driving your elbows back.",
    "Squeeze your shoulder blades together at the top of the row.",
    "Lower the dumbbells back to a full stretch under control and repeat."
  ],
  "Incline dumbbell row":[
    "Set a bench to a steep incline and lie face-down against it, chest supported.",
    "Let a dumbbell hang in each hand with your arms fully extended.",
    "Row the dumbbells up toward your hips, keeping your elbows close to your body.",
    "Squeeze your shoulder blades together at the top.",
    "Lower under control back to a full stretch and repeat."
  ],
  "Kroc row":[
    "Brace one knee and hand on a flat bench, torso roughly parallel to the floor.",
    "Grip a heavy dumbbell in your free hand, arm hanging straight down.",
    "Row the dumbbell up powerfully toward your hip, allowing a small amount of hip and torso rotation.",
    "Lower the dumbbell back to a full stretch under control.",
    "Complete all reps on one side before switching to the other."
  ],
  "Machine high row":[
    "Sit at the machine and adjust the seat so the handles line up with your upper chest.",
    "Grip the handles with your arms extended forward, chest against the pad.",
    "Pull the handles back and down toward your upper chest, driving your elbows up and out.",
    "Squeeze your shoulder blades together at the back of the movement.",
    "Control the return to the starting position and repeat."
  ],
  "Machine pullover":[
    "Sit at the machine and adjust the seat so your shoulders line up with the machine's pivot point.",
    "Grip the overhead lever bar with your arms raised and elbows slightly bent.",
    "Let the lever arc down and forward toward your torso, pulling with your lats.",
    "Continue until the lever reaches roughly chest or stomach height.",
    "Control the return to the starting overhead position and repeat."
  ],
  "Cable rope pullover":[
    "Set the pulley high on a cable station and attach a straight bar.",
    "Stand or kneel facing away from the tower with your arms extended overhead.",
    "Keeping a slight bend in your elbows, pull the bar down and forward in an arc to roughly thigh height.",
    "Squeeze your lats at the bottom of the movement.",
    "Control the return back to the overhead starting position and repeat."
  ],
  "Inverted row":[
    "Set a bar at roughly waist height in a rack.",
    "Lie underneath it and grip the bar with arms extended, body in a straight line, heels on the floor.",
    "Pull your chest up to the bar, driving your elbows back.",
    "Lower back down under control to full arm extension.",
    "Keep your body rigid and straight from head to heels throughout the set."
  ],
  "Supermans":[
    "Lie face-down on the floor with your arms extended forward overhead and legs straight.",
    "Simultaneously lift your arms, chest, and legs off the floor.",
    "Hold briefly at the top, squeezing your glutes and lower back.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, breathing normally throughout."
  ],
  "Scapular pull-ups":[
    "Hang from a pull-up bar with your arms fully extended.",
    "Without bending your elbows, depress your shoulder blades down and together.",
    "Let your body rise a few inches as your shoulder blades pull down.",
    "Pause briefly, then return to a relaxed hang.",
    "Repeat for the set, keeping your elbows essentially straight throughout."
  ],
  "Landmine overhead press":[
    "Anchor a barbell in a landmine attachment or sturdy corner and load the free end with plates.",
    "Stand in a staggered stance and grip the loaded end with both hands at shoulder height.",
    "Press the bar forward and upward, following its natural pivoting arc.",
    "Extend your arms until they're fully reached forward and up.",
    "Lower back to shoulder height under control and repeat."
  ],
  "Barbell seated shoulder press":[
    "Sit upright on a bench with a barbell held at your upper chest, hands just outside shoulder width.",
    "Brace your core to stabilize your torso since you have no leg drive to help.",
    "Press the bar straight up until your arms are fully extended overhead.",
    "Lower the bar back down to your upper chest under control.",
    "Repeat for the set, keeping your torso upright throughout."
  ],
  "Dumbbell scaption raise":[
    "Stand holding a light dumbbell in each hand at your sides.",
    "Raise your arms diagonally, roughly 30 degrees in front of your body, thumbs leading.",
    "Raise until your arms reach shoulder height.",
    "Lower back down under control to the starting position.",
    "Keep a slight bend in your elbows throughout the set."
  ],
  "Cable Y-raise":[
    "Set both pulleys low on a dual-pulley cable station and cross the cables behind you.",
    "Grip a handle in each hand, arms starting down and slightly crossed in front of your hips.",
    "Raise your arms up and out to form a wide \"Y\" shape overhead.",
    "Lower back down under control to the starting position.",
    "Keep a slight bend in your elbows and use light weight throughout."
  ],
  "Cable bar front raise":[
    "Set the pulley low on a cable station and stand facing away from the tower.",
    "Grip the handle or rope with your arm hanging down in front of your thigh.",
    "Raise your arm straight forward to shoulder height.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side, or alternate arms, keeping your torso still throughout."
  ],
  "Plate-loaded shoulder press":[
    "Sit at the machine and adjust the seat so the handles start at shoulder height.",
    "Grip the handles with your back against the pad.",
    "Press the handles up along the machine's fixed path until your arms are extended.",
    "Lower back down under control to shoulder height.",
    "Repeat for the set, keeping your back against the pad throughout."
  ],
  "Barbell drag curl":[
    "Stand holding a barbell with an underhand grip at your thighs, arms extended.",
    "Curl the bar upward while dragging it along the surface of your body.",
    "Let your elbows travel back behind your torso as the bar rises.",
    "Curl until your biceps are fully contracted near your chest.",
    "Lower the bar back down along the same path under control."
  ],
  "21s barbell curl":[
    "Stand holding a barbell at your thighs with an underhand grip.",
    "Perform 7 bottom-half curls, from full extension to your elbow at 90 degrees.",
    "Perform 7 top-half curls, from your elbow at 90 degrees to full contraction.",
    "Finish with 7 full-range curls, from full extension to full contraction.",
    "Keep your elbows pinned at your sides throughout all three phases."
  ],
  "Wide-grip barbell curl":[
    "Stand holding a barbell with your hands noticeably wider than shoulder width.",
    "Keep your elbows tucked at your sides, arms extended at the start.",
    "Curl the bar up toward your shoulders.",
    "Squeeze your biceps at the top before lowering under control.",
    "Repeat for the set without letting your elbows drift forward."
  ],
  "Dumbbell Zottman curl":[
    "Stand holding a dumbbell in each hand at your sides, palms facing forward.",
    "Curl the dumbbells up to shoulder height with a normal underhand grip.",
    "At the top, rotate your wrists so your palms face down.",
    "Lower the dumbbells slowly with this reversed, palms-down grip.",
    "Rotate your wrists back to palms-up at the bottom and repeat."
  ],
  "Dumbbell spider curl":[
    "Drape your torso face-down over a steep incline bench, arms hanging freely in front.",
    "Grip a dumbbell in each hand, arms fully extended.",
    "Curl the dumbbells up while keeping your upper arms pressed against the bench pad.",
    "Squeeze your biceps at the top of the curl.",
    "Lower slowly and fully back to the starting position."
  ],
  "Cross-body hammer curl":[
    "Stand holding a dumbbell in each hand at your sides with a neutral grip.",
    "Curl one dumbbell diagonally up and across your body toward the opposite shoulder.",
    "Squeeze your biceps at the top before lowering back down along the same path.",
    "Repeat with the same arm for all reps, or alternate arms.",
    "Keep your elbow relatively fixed at your side throughout each rep."
  ],
  "Machine bicep curl":[
    "Sit at the machine and rest your upper arms on the angled pad.",
    "Grip the handles with your arms extended.",
    "Curl the handles up using only your forearms, keeping your upper arms on the pad.",
    "Squeeze your biceps at the top before lowering under control.",
    "Repeat for the set, adjusting the seat so your elbows align with the pivot point."
  ],
  "Cable spider curl":[
    "Set the pulley low and drape your torso face-down over a steep incline bench facing the tower.",
    "Grip the attached bar with your arms hanging down, upper arms against the bench pad.",
    "Curl the bar up to a full contraction, keeping your upper arms pinned to the pad.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, using lighter weight than you'd expect due to the constant cable tension."
  ],
  "Dumbbell close-grip floor press":[
    "Lie flat on the floor with a dumbbell in each hand held close together above your chest.",
    "Lower the dumbbells, keeping your elbows tucked tight to your ribs.",
    "Stop once your triceps touch the floor.",
    "Press the dumbbells back up, bringing them slightly together at the top.",
    "Repeat for the set, keeping your wrists stacked over your elbows throughout."
  ],
  "Seated machine tricep extension":[
    "Sit at the machine and adjust the seat so your upper arms are braced by the pads.",
    "Grip the handle with your arms bent.",
    "Extend your arms fully, squeezing your triceps at the top.",
    "Return under control to the starting bent position.",
    "Repeat for the set, keeping your upper arms pinned in place throughout."
  ],
  "Bench dips":[
    "Sit on the edge of a bench and grip it with your hands just behind your hips.",
    "Walk your feet out and lift your hips off the bench, arms supporting your weight.",
    "Lower your body straight down until your elbows reach roughly 90 degrees.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your elbows pointing behind you rather than flaring out."
  ],
  "Close-grip push-ups":[
    "Place your hands close together on the floor under your chest.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward your hands, keeping your elbows tucked tight to your ribs.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your wrists straight throughout."
  ],
  "Barbell reverse curl":[
    "Stand holding a barbell with an overhand grip, arms extended at your thighs.",
    "Keeping your elbows pinned at your sides, curl the bar up toward your shoulders.",
    "Squeeze at the top before lowering under control.",
    "Repeat for the set, keeping your wrists firm and straight throughout.",
    "Use lighter weight than your standard curl since this grip is noticeably weaker."
  ],
  "Dumbbell finger curl":[
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees.",
    "Hold a dumbbell loosely in your open fingers, letting it roll down toward your fingertips.",
    "Curl your fingers closed around the handle.",
    "Open your fingers back out under control, letting the dumbbell roll back down.",
    "Repeat for the set, keeping your wrists still throughout."
  ],
  "Cable wrist curl":[
    "Set the pulley low and attach a straight bar.",
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees, palms up.",
    "Curl your wrists up as far as comfortable.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, keeping your forearms pinned to your thighs throughout."
  ],
  "Cable wrist extension":[
    "Set the pulley low and attach a straight bar.",
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees, palms down.",
    "Extend your wrists upward, lifting the back of your hands.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, keeping your forearms still throughout."
  ],
  "Dumbbell seated rear delt fly":[
    "Sit facing a raised incline bench pad and rest your chest against it.",
    "Let a dumbbell hang in each hand with your arms extended down.",
    "Raise your arms out to the sides with a slight elbow bend, squeezing your shoulder blades together.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your chest pressed against the pad throughout."
  ],
  "Prone dumbbell Y-raise":[
    "Lie face-down on an incline bench with a light dumbbell in each hand.",
    "Let your arms hang straight down and slightly forward.",
    "Raise your arms up and out to form a \"Y\" shape, thumbs leading.",
    "Lower back down under control to the starting position.",
    "Repeat for the set using light weight, since this is a control exercise, not a strength builder."
  ],
  "Cable high reverse fly":[
    "Set both pulleys at shoulder height on a dual-pulley cable station.",
    "Stand centered between the towers and cross your arms in front of your chest to grip the opposite handles.",
    "Sweep your arms outward and back, squeezing your shoulder blades together.",
    "Control the return back to the crossed starting position.",
    "Repeat for the set, keeping a slight bend in your elbows throughout."
  ],
  "Cross-cable reverse fly":[
    "Set both pulleys at shoulder height on a dual-pulley cable station.",
    "Stand between the towers and hinge forward at your hips to roughly 45 degrees.",
    "Reach across your body to grip the opposite handles.",
    "Sweep your arms out and back, squeezing your shoulder blades together.",
    "Control the return to the crossed starting position, keeping your torso hinged throughout."
  ],
  "Barbell high pull":[
    "Stand holding a barbell at your thighs, knees soft, hips slightly hinged.",
    "Pull the bar up close to your body, letting your elbows lead and rise above your hands.",
    "Extend up onto your toes as the bar reaches chest/collarbone height.",
    "Lower the bar back down under control to your thighs.",
    "Repeat for the set, keeping the bar close to your torso throughout."
  ],
  "Dumbbell high pull":[
    "Stand holding a dumbbell in each hand at your thighs, knees soft.",
    "Pull the dumbbells up close to your body, letting your elbows lead and rise above your hands.",
    "Extend up onto your toes as the dumbbells reach chest height.",
    "Lower back down under control to your thighs.",
    "Repeat for the set, keeping the dumbbells close to your torso throughout."
  ],
  "Cable shrug":[
    "Set the pulley low and attach a straight bar or handle.",
    "Stand facing the tower, holding the handle with straight arms.",
    "Shrug your shoulders straight up toward your ears.",
    "Hold briefly at the top, then lower back down under control.",
    "Repeat for the set, keeping your arms locked straight throughout."
  ],
  "Machine standing shrug":[
    "Stand within the machine's frame and grip the side handles.",
    "Keep your arms straight throughout the movement.",
    "Shrug your shoulders straight up, letting the machine's loaded arms rise with you.",
    "Hold briefly at the top, then lower back down under control.",
    "Repeat for the set, keeping your head neutral throughout."
  ],
  "Barbell walking lunge":[
    "Rack a barbell across your upper back and stand tall.",
    "Step forward into a lunge, lowering your back knee toward the floor without touching.",
    "Push through your front heel to stand up and step directly into the next lunge with the opposite leg.",
    "Continue alternating legs, walking forward for the set.",
    "Keep your torso upright throughout to maintain balance with the loaded bar."
  ],
  "Barbell step-up":[
    "Rack a barbell across your upper back and stand in front of a sturdy box.",
    "Place one foot flat on top of the box.",
    "Drive through that heel to lift your body up onto the box.",
    "Stand fully upright with both feet on the box.",
    "Step back down under control and repeat, alternating legs or finishing one side first."
  ],
  "Box squat":[
    "Rack a barbell across your upper back and position a box directly behind you at squat depth.",
    "Squat down, pushing your hips back toward the box.",
    "Sit briefly on the box, relaxing your hips at the bottom without leaning back.",
    "Drive back up to standing under control.",
    "Repeat for the set, keeping your core braced through the pause on the box."
  ],
  "Dumbbell front rack squat":[
    "Hold a dumbbell upright at each shoulder, elbows pointing forward and up.",
    "Stand with feet shoulder-width apart.",
    "Squat down, keeping your torso upright and knees tracking over your toes.",
    "Descend until your thighs are at or below parallel.",
    "Drive back up to standing, keeping the dumbbells racked at your shoulders throughout."
  ],
  "Dumbbell reverse lunge":[
    "Stand tall holding a dumbbell in each hand at your sides.",
    "Step one leg backward into a lunge, lowering your back knee toward the floor.",
    "Keep most of your weight on your front leg throughout the step back.",
    "Push off your front foot to return to standing.",
    "Repeat, alternating legs or finishing one side before switching."
  ],
  "Dumbbell heels-up goblet squat":[
    "Place a small wedge or weight plates under your heels.",
    "Stand with feet closer together than a standard squat, a dumbbell in each hand.",
    "Squat down, keeping your torso tall and knees traveling forward.",
    "Descend until your thighs are at or below parallel.",
    "Drive up through your whole foot to return to standing."
  ],
  "Machine belt squat":[
    "Clip a hip belt onto the machine's loaded mechanism and stand on the raised platform.",
    "Keep your hands free or lightly resting on the side rails.",
    "Squat down, keeping your torso upright as the load travels between your legs.",
    "Descend to your comfortable depth.",
    "Drive through your whole foot to return to standing."
  ],
  "Machine pendulum squat":[
    "Position yourself under the machine's angled shoulder pads, feet on the platform.",
    "Keep your back against the pads throughout the movement.",
    "Squat down as the sled swings along its pivoting arc.",
    "Descend to your comfortable depth, controlling the resistance as it increases.",
    "Drive back up through your whole foot to complete the arc."
  ],
  "Vertical leg press":[
    "Lie on your back on the machine with your knees bent toward your chest, feet on the platform overhead.",
    "Grip the side handles for stability.",
    "Press the platform straight up until your legs are extended, stopping just short of locking your knees.",
    "Lower the platform back down under control to a full range.",
    "Repeat for the set, keeping your lower back pressed into the pad throughout."
  ],
  "Bodyweight squat":[
    "Stand with feet shoulder-width apart, arms extended forward.",
    "Sit your hips back and down, keeping your chest up and heels flat.",
    "Descend as deep as your mobility comfortably allows.",
    "Push through your whole foot to stand back up.",
    "Repeat for the set, keeping your arms forward for balance throughout."
  ],
  "Jump squats":[
    "Stand with feet shoulder-width apart and load into a quarter squat, arms swung back.",
    "Explode upward as hard as you can, swinging your arms forward and up.",
    "Leave the ground with both feet at the top of the jump.",
    "Land softly with bent knees, absorbing the impact.",
    "Reset into the quarter-squat position and repeat for the set."
  ],
  "Wall sit":[
    "Stand with your back against a wall and slide down until your thighs are roughly parallel to the floor.",
    "Keep your knees stacked over your ankles, not pushed past your toes.",
    "Press your back flat against the wall and hold the position.",
    "Breathe normally throughout the hold.",
    "Slide back up the wall to stand once the target time is reached."
  ],
  "Barbell high-bar good morning":[
    "Rack a barbell across your upper back and stand tall.",
    "Keeping a soft, fixed knee bend, hinge forward at your hips.",
    "Lower your torso until it's roughly parallel to the floor, keeping your back flat.",
    "Drive your hips forward to return to standing.",
    "Repeat for the set, starting with very light weight."
  ],
  "Barbell sumo deadlift":[
    "Stand over a barbell with a wide stance, toes turned out.",
    "Grip the bar with your hands inside your knees and set your hips low, chest up.",
    "Drive through the floor, extending your hips and knees together as the bar rises.",
    "Stand fully upright, squeezing your glutes at the top.",
    "Lower the bar back to the floor under control and reset for the next rep."
  ],
  "Barbell stiff-leg deadlifts":[
    "Stand holding a barbell at your thighs, legs almost completely straight.",
    "Hinge forward at your hips, letting the bar slide down close to your legs.",
    "Lower until you feel a strong stretch in your hamstrings.",
    "Drive your hips forward to return to standing.",
    "Repeat for the set, keeping your back flat and knees nearly straight throughout."
  ],
  "Dumbbell single-leg stiff-leg deadlift":[
    "Stand tall on one leg holding a dumbbell in each hand.",
    "Hinge forward at your hips while your free leg extends straight back.",
    "Lower until your torso is roughly parallel to the floor, forming a \"T\" shape with your free leg.",
    "Drive your hips forward to return to standing, bringing your free leg back down.",
    "Complete all reps on one leg before switching sides."
  ],
  "Dumbbell sumo deadlift":[
    "Stand over a single dumbbell with a wide stance, toes turned out.",
    "Grip the top of the dumbbell with both hands between your legs.",
    "Drive through the floor, extending your hips and knees together as you stand.",
    "Stand fully upright, squeezing your glutes at the top.",
    "Lower the dumbbell back to the floor under control and reset."
  ],
  "Machine standing hamstring curl":[
    "Stand at the machine and lean into the chest pad for support.",
    "Brace one ankle behind the padded roller, leg extended straight down.",
    "Curl your heel up toward your glute.",
    "Squeeze at the top before lowering back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Cable pull-through":[
    "Set the pulley low and attach a rope, then face away from the tower with the rope between your legs.",
    "Hinge forward at your hips, letting the rope pull your hands back between your legs.",
    "Keep your back flat and knees softly bent throughout.",
    "Drive your hips forward powerfully to stand up, squeezing your glutes at the top.",
    "Repeat for the set, keeping the rope close to your body as it swings through."
  ],
  "B-stance barbell hip thrust":[
    "Rest your upper back against a bench with a barbell across your hips.",
    "Stagger your feet, planting most of your weight on one foot.",
    "Drive through the planted foot to full hip extension, squeezing that glute at the top.",
    "Lower back down under control without letting your hips drop fully.",
    "Complete all reps on one side before switching feet."
  ],
  "Barbell glute bridge":[
    "Lie on your back on the floor with a barbell across your hips and knees bent.",
    "Plant your feet flat on the floor, shoulder-width apart.",
    "Drive your hips straight up, squeezing your glutes at the top.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your upper back and head resting on the floor throughout."
  ],
  "Curtsy lunge":[
    "Stand tall holding a dumbbell in each hand.",
    "Step one leg diagonally back and across behind your other leg.",
    "Lower until your back knee hovers near the floor, keeping most of your weight on your front leg.",
    "Push through your front heel to return to standing.",
    "Repeat, alternating legs or finishing one side before switching."
  ],
  "Dumbbell single-leg hip thrust":[
    "Rest your upper back against a bench with a single dumbbell resting on your hips.",
    "Plant one foot flat on the floor and extend the other leg straight out.",
    "Drive through the planted foot to full hip extension, keeping the free leg straight.",
    "Lower back down under control without letting your hips drop fully.",
    "Complete all reps on one side before switching legs."
  ],
  "Machine 45-degree back extension":[
    "Position your hips at the top edge of the angled pad, ankles secured under the rollers.",
    "Cross your arms over your chest or hold a plate for added resistance.",
    "Hinge down until you feel a stretch in your hamstrings, keeping your back flat.",
    "Rise back up until your body forms a straight line from shoulders to ankles.",
    "Repeat for the set, squeezing your glutes at the top of each rep."
  ],
  "Machine glute kickback":[
    "Stand at the machine and brace yourself on the frame for support.",
    "Place one foot on the loaded platform behind you.",
    "Drive the working leg back and up in a straight line.",
    "Squeeze your glute at the top before lowering back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Single-leg glute bridge":[
    "Lie on your back with one knee bent and the foot flat on the floor.",
    "Extend the other leg straight out.",
    "Drive your hips up through the planted foot, keeping the extended leg straight.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Frog pump":[
    "Lie on your back with the soles of your feet pressed together and knees splayed wide.",
    "Keep your feet together and knees wide throughout the movement.",
    "Drive your hips straight up, squeezing your glutes hard at the top.",
    "Lower back down under control to the starting position.",
    "Repeat for the set at a higher rep range."
  ],
  "Donkey kicks":[
    "Get on your hands and knees with your back flat.",
    "Keep one knee bent at a fixed 90-degree angle.",
    "Kick that foot up toward the ceiling, driving through your heel.",
    "Squeeze your glute at the top, then lower back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Barbell calf raises":[
    "Rack a barbell across your upper back and stand with the balls of your feet on a small block, heels hanging off.",
    "Lower your heels below the block for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Squeeze your calves hard at the top, then lower back down.",
    "Repeat for the set, keeping your legs relatively straight throughout."
  ],
  "Dumbbell single-leg calf raise":[
    "Hold a dumbbell in one hand and lightly touch a wall with the other for balance.",
    "Stand on one foot on a small block, heel hanging off the back edge.",
    "Lower your heel below the block for a full stretch.",
    "Rise up onto your toes as high as possible, then lower back down.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Dumbbell seated calf raise":[
    "Sit on a bench with your feet on a small block, heels hanging off.",
    "Rest a dumbbell upright on each knee, holding them in place with your hands.",
    "Lower your heels below the block for a full stretch.",
    "Rise up onto your toes, keeping the dumbbells balanced.",
    "Repeat for the set, pausing briefly at the top of each rep."
  ],
  "Machine donkey calf raise":[
    "Bend forward at the hips and brace your waist under the machine's loaded pad.",
    "Place the balls of your feet on the platform, heels hanging off.",
    "Lower your heels for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Repeat for the set, holding the support bar for balance throughout."
  ],
  "Calf raises":[
    "Stand on the edge of a small step with the balls of your feet planted, heels hanging off.",
    "Lower your heels below the step for a deep stretch.",
    "Rise up onto your toes as high as possible.",
    "Pause briefly at the top, then lower back down.",
    "Repeat for the set, lightly touching a wall for balance if needed."
  ],
  "Bodyweight single-leg calf raise":[
    "Stand on one foot on the edge of a small step, heel hanging off the back.",
    "Lower your heel for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Lower back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Side-lying dumbbell hip adduction":[
    "Lie on your side with your top leg bent, foot planted in front of your bottom leg.",
    "Rest a light dumbbell on the ankle of your straight, bottom leg.",
    "Lift the bottom leg straight up toward the bent top leg.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Cable standing hip adduction":[
    "Attach an ankle cuff to the leg farther from the tower and stand sideways to it.",
    "Start with that leg raised out to the side, crossing your body's midline.",
    "Sweep the leg inward, across your body, past your standing leg.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Sumo squat hold":[
    "Take a wide stance with your toes turned out.",
    "Lower into a squat until your thighs are parallel to the floor.",
    "Hold that position, keeping your knees tracking out over your toes.",
    "Keep your torso upright throughout the hold.",
    "Stand back up once the target time is reached."
  ],
  "Cable standing hip abduction":[
    "Attach an ankle cuff to the leg closer to the tower and stand sideways to it.",
    "Start with that leg crossed slightly in front of your standing leg.",
    "Sweep the leg outward, away from your body, as far as comfortable.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Abductor leg raise side lying":[
    "Lie on your side with your legs stacked and straight.",
    "Lift your top leg straight up, keeping it in line with your body.",
    "Raise as high as comfortable without rolling your hips backward.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Clamshells":[
    "Lie on your side with your knees bent and stacked, feet together.",
    "Keep your feet touching throughout the movement.",
    "Open your top knee upward like a hinge.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Bodyweight hip abduction":[
    "Stand tall, lightly holding a wall or chair for balance.",
    "Lift one leg straight out to the side, fully extended.",
    "Raise as high as comfortable while keeping your torso upright.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Dumbbell side bend":[
    "Stand holding a single dumbbell in one hand, letting it hang at your side.",
    "Bend directly sideways toward the dumbbell.",
    "Feel the stretch on the opposite side of your torso at the bottom.",
    "Return to standing under control.",
    "Complete all reps on one side, then switch hands and repeat on the other."
  ],
  "Plate sit-up":[
    "Lie on your back with your knees bent and feet flat on the floor.",
    "Hold a single dumbbell or plate against your chest with both hands.",
    "Curl your torso up to a seated position, keeping the weight clamped to your chest.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your feet anchored throughout."
  ],
  "Cable wood chopper":[
    "Set the pulley high and stand sideways to the tower.",
    "Grip the handle with both hands near one shoulder.",
    "Rotate your torso and pull the handle diagonally down and across your body toward the opposite hip.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Captains chair leg raise":[
    "Rest your forearms on the padded armrests and press your back into the pad.",
    "Let your legs hang straight down to start.",
    "Raise your legs up in front of you, bending your knees toward your chest.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your torso braced against the pad throughout."
  ],
  "Hollow hold":[
    "Lie on your back, then lift your shoulders and legs off the floor at the same time.",
    "Extend your arms overhead and your legs straight.",
    "Keep your lower back pressed into the floor throughout the hold.",
    "Hold the position, breathing normally.",
    "Lower back down once the target time is reached."
  ],
  "V-ups":[
    "Lie flat with your arms extended overhead and legs straight.",
    "Simultaneously fold your torso and legs upward.",
    "Reach your hands toward your toes at the top, balancing on your hips.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, bending your knees slightly if the full straight-leg version is too difficult."
  ],
  "Kettlebell swing": [
    "Stand with feet a little wider than shoulder-width, holding one kettlebell by the handle with both hands in front of your hips.",
    "Push your hips back with a flat back and soft knees, and swing the kettlebell back between your thighs.",
    "Drive your hips forward and stand up fast so the kettlebell swings forward.",
    "Let it rise to chest height with straight arms, glutes tight and body upright.",
    "Let the kettlebell fall, hinge as your arms reach your body, and go straight into the next rep."
  ],
  "Kettlebell goblet squat": [
    "Hold one kettlebell upside-down by the sides of its handle against your chest, elbows tucked down.",
    "Stand with feet shoulder-width apart, toes turned out slightly.",
    "Squat down between your hips, keeping the kettlebell on your chest and your chest up.",
    "Go until your thighs are below parallel and your elbows are inside your knees, heels flat.",
    "Push the floor away to stand back up."
  ],
  "Kettlebell Romanian deadlift": [
    "Stand tall with feet hip-width apart, holding one kettlebell by the handle with both hands in front of your thighs.",
    "Push your hips back with a flat back and a slight knee bend, letting the kettlebell slide down close to your legs.",
    "Lower until the kettlebell reaches mid-shin or your hamstrings stop you, arms hanging straight.",
    "Drive your hips forward to stand back up, keeping the kettlebell close.",
    "Squeeze your glutes at the top and repeat."
  ],
  "Kettlebell sumo deadlift": [
    "Stand in a very wide stance with toes turned out, one kettlebell on the floor between your feet.",
    "Bend your knees and hips with a flat back and grip the handle with both hands, arms straight.",
    "Push through your feet and stand up, keeping your knees pushed out and the kettlebell close.",
    "Finish standing fully upright with the kettlebell hanging in front of your hips.",
    "Lower it back to the floor the same way, hips back and chest up."
  ],
  "Kettlebell single-arm row": [
    "Stand in a staggered stance with your left foot forward and rest your left forearm on your left thigh.",
    "Lean forward about 45 degrees with a flat back, holding one kettlebell in your right hand with the arm hanging straight down.",
    "Pull the kettlebell up beside your body, driving your elbow back toward your hip.",
    "Stop when the kettlebell is beside your lower ribs and your elbow points up behind your back.",
    "Lower it slowly to a straight arm. Do all reps, then switch sides."
  ],
  "Kettlebell floor press": [
    "Lie on your back on the floor with knees bent and feet flat, a kettlebell in each hand.",
    "Start with your upper arms on the floor, elbows bent 90 degrees and forearms vertical, each bell resting on the back of its forearm.",
    "Press both kettlebells straight up until your arms are straight above your chest.",
    "Lower them under control until your upper arms touch the floor.",
    "Pause briefly on the floor, then press again."
  ],
  "Kettlebell single-arm press": [
    "Lie on your back on the floor with knees bent and feet flat, one kettlebell in your right hand, left arm out to the side on the floor.",
    "Start with your right upper arm on the floor, elbow bent 90 degrees and forearm vertical.",
    "Press the kettlebell straight up until your right arm is straight above your shoulder.",
    "Lower it slowly until your upper arm touches the floor.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell upright row": [
    "Stand tall with feet hip-width apart, both hands gripping the handle of one kettlebell in front of your thighs.",
    "Pull the kettlebell straight up along your body, elbows bending out to the sides.",
    "Continue until the kettlebell is just below your chin and your elbows are above your hands.",
    "Pause for a moment at the top.",
    "Lower it slowly until your arms are straight."
  ],
  "Kettlebell curl": [
    "Stand tall with feet hip-width apart, holding one kettlebell by the sides of its handle with both hands, arms straight in front of your thighs.",
    "Keep your elbows pinned to your sides.",
    "Curl the kettlebell up until your elbows are fully bent and it reaches upper-chest height.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arms are straight again."
  ],
  "Kettlebell overhead tricep extension": [
    "Stand tall with feet hip-width apart, holding one kettlebell upside-down by the sides of its handle with both hands.",
    "Press it overhead until your arms are straight.",
    "Bend your elbows and lower the kettlebell behind your head, keeping your elbows pointing up beside your ears.",
    "Stop when your elbows are fully bent and the kettlebell hangs behind your upper back.",
    "Straighten your arms to bring it back overhead."
  ],
  "Kettlebell deadlift single": [
    "Stand with feet hip-width apart and one kettlebell on the floor between your feet.",
    "Push your hips back and bend your knees with a flat back, then grip the handle with both hands.",
    "Push through your feet and stand up, keeping your arms straight and the kettlebell close.",
    "Finish fully upright with the kettlebell hanging in front of your thighs.",
    "Hinge back down and set the kettlebell on the floor under control."
  ],
  "Kettlebell suitcase deadlift": [
    "Stand with one kettlebell on the floor just outside your right foot.",
    "Push your hips back and bend your knees with a flat back, and grip the handle with your right hand.",
    "Stand up, keeping the kettlebell at your side and your shoulders level.",
    "Finish fully upright with the kettlebell hanging beside your right thigh, left arm relaxed.",
    "Lower it back to the floor the same way. Do all reps, then switch sides."
  ],
  "Kettlebell single-leg deadlift": [
    "Stand tall holding one kettlebell in your right hand beside your right thigh.",
    "Shift your weight onto your left leg with a soft knee.",
    "Tip your torso forward and lift your right leg straight back, lowering the kettlebell in front of your left shin.",
    "Stop when your torso and right leg form one straight line parallel to the floor, back flat.",
    "Squeeze your left glute to stand back up. Do all reps, then switch sides."
  ],
  "Kettlebell box squat": [
    "Stand just in front of a low box, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Push your hips back and bend your knees, lowering yourself toward the box.",
    "Sit lightly on the box with your shins vertical and chest up.",
    "Pause for a moment without relaxing.",
    "Push through your heels to stand back up."
  ],
  "Kettlebell front rack squat": [
    "Hold a kettlebell in each hand in the rack position: fists under your chin, elbows tucked, each ball on the back of its forearm.",
    "Stand with feet shoulder-width apart.",
    "Squat down with your chest up, keeping the kettlebells racked at your shoulders.",
    "Go until your thighs are below parallel, heels flat.",
    "Push the floor away to stand back up."
  ],
  "Kettlebell cossack squat": [
    "Stand in a very wide stance, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Shift your weight to the right and bend your right knee, keeping your left leg straight.",
    "Sink into a deep side squat over your right foot, right heel flat and left toes pointing up.",
    "Push through your right foot to return to the middle.",
    "Repeat to the left, alternating sides each rep."
  ],
  "Kettlebell reverse lunge": [
    "Stand tall with feet together, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Step your right foot straight back and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it, torso upright.",
    "Push through your left foot and bring your right foot back to the start.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell lateral lunge": [
    "Stand tall with feet together, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Step your right foot wide out to the right.",
    "Sit your hips back over your bent right knee, keeping your left leg straight and left foot flat.",
    "Push off your right foot to return to standing with feet together.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell step-up": [
    "Stand facing a knee-high box, holding one kettlebell in your right hand at your side.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and step up until you stand tall on the box with both feet.",
    "Step back down with your right foot first, under control.",
    "Do all reps on one leg, then switch sides."
  ],
  "Kettlebell calf raise": [
    "Stand tall with a kettlebell in each hand hanging at your sides, feet hip-width apart.",
    "Push through the balls of your feet and lift your heels as high as possible.",
    "Hold the top for a second with your legs straight.",
    "Lower your heels slowly back to the floor.",
    "Repeat without bouncing."
  ],
  "Kettlebell glute bridge": [
    "Lie on your back on the floor with knees bent and feet flat, hip-width apart.",
    "Rest one kettlebell on its side on your lower belly and hold it in place with both hands.",
    "Push through your heels and lift your hips until your knees, hips and shoulders form a straight line.",
    "Squeeze your glutes at the top, shoulders still on the floor.",
    "Lower your hips slowly back to the floor."
  ],
  "Kettlebell hip thrust": [
    "Sit on the floor with your upper back against the long edge of a flat bench, knees bent and feet flat.",
    "Rest one kettlebell on your hips and hold it with both hands.",
    "Push through your heels and raise your hips until your torso and thighs form a flat line parallel to the floor.",
    "Squeeze your glutes at the top with your shins vertical.",
    "Lower your hips back down under control."
  ],
  "Kettlebell bench press": [
    "Lie on a flat bench with feet flat on the floor, a kettlebell in each hand, each ball resting on the back of its forearm.",
    "Start with the kettlebells beside your chest, elbows bent and below the bench top.",
    "Press both kettlebells up until your arms are straight above your chest.",
    "Lower them slowly until they are beside your chest again.",
    "Keep your shoulder blades pinched throughout."
  ],
  "Kettlebell incline bench press": [
    "Lie back on a bench set at a 30-degree incline, feet flat on the floor, a kettlebell in each hand resting on the back of its forearm.",
    "Start with the kettlebells beside your upper chest, elbows bent.",
    "Press both kettlebells straight up until your arms are straight above your shoulders.",
    "Lower them slowly back beside your upper chest.",
    "Repeat, keeping your shoulder blades back."
  ],
  "Kettlebell floor fly": [
    "Lie on your back on the floor with knees bent, a kettlebell in each hand resting on the back of its forearm.",
    "Start with both arms straight up above your chest, kettlebells close together.",
    "Open your arms out to the sides in a wide arc, elbows slightly bent.",
    "Stop when your upper arms touch the floor.",
    "Squeeze your chest to bring the kettlebells back together above you."
  ],
  "Kettlebell pullover": [
    "Lie on your back on a flat bench with feet flat on the floor, holding one kettlebell upside-down by the sides of its handle.",
    "Start with your arms straight up above your chest.",
    "Lower the kettlebell back over your face and behind your head, elbows slightly bent.",
    "Stop when your arms are stretched back in line with your body.",
    "Pull the kettlebell back along the same arc until it is above your chest."
  ],
  "Kettlebell seated overhead press": [
    "Sit upright on a flat bench with feet flat on the floor, a kettlebell in each hand.",
    "Rack both kettlebells at your shoulders, elbows tucked, each ball on the back of its forearm.",
    "Press both kettlebells up until your arms are straight overhead.",
    "Lower them under control back to your shoulders.",
    "Stay tall and repeat."
  ],
  "Kettlebell push press": [
    "Stand with a kettlebell in each hand racked at your shoulders, each ball on the back of its forearm.",
    "Dip into a shallow quarter squat with your torso upright.",
    "Drive up hard with your legs and press both kettlebells overhead in one motion.",
    "Lock your arms out with your legs fully straight.",
    "Lower the kettlebells back to the rack and reset."
  ],
  "Kettlebell Z press": [
    "Sit on the floor with both legs straight out in front and slightly apart, torso upright.",
    "Rack a kettlebell at each shoulder, each ball on the back of its forearm.",
    "Press both kettlebells up until your arms are straight overhead.",
    "Keep your torso upright; don't lean back.",
    "Lower the kettlebells under control back to your shoulders."
  ],
  "Kettlebell front raise": [
    "Stand tall holding one kettlebell by its handle with both hands, arms straight in front of your thighs.",
    "Raise the kettlebell forward with straight arms.",
    "Stop at shoulder height with the kettlebell hanging below your hands, torso upright.",
    "Pause for a moment.",
    "Lower it slowly back to your thighs."
  ],
  "Kettlebell single-arm floor press": [
    "Lie on your back on the floor with knees bent and feet flat, one kettlebell in your right hand, left arm out to the side on the floor.",
    "Start with your right upper arm on the floor, elbow bent 90 degrees and forearm vertical.",
    "Press the kettlebell straight up until your right arm is straight above your shoulder.",
    "Lower it slowly until your upper arm touches the floor.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm chest press": [
    "Lie on a flat bench with feet flat on the floor, one kettlebell in your right hand resting on the back of your forearm, left hand on your stomach.",
    "Start with your right elbow bent and below the bench top, kettlebell beside your chest.",
    "Press the kettlebell up until your right arm is straight above your chest.",
    "Lower it slowly back beside your chest.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell pec fly": [
    "Lie on a flat bench with feet on the floor, a kettlebell in each hand resting on the back of its forearm.",
    "Start with both arms straight up above your chest, kettlebells close together.",
    "Open your arms out to the sides in a wide arc with elbows slightly bent.",
    "Stop when your arms are level with the bench top and your chest is stretched.",
    "Squeeze your chest to bring the kettlebells back together."
  ],
  "Kettlebell single-arm lateral raise": [
    "Stand tall with feet hip-width apart, one kettlebell in your right hand at your side and your left hand on your hip.",
    "Raise your right arm out to the side with a slight bend in the elbow.",
    "Stop at shoulder height with the kettlebell hanging below your hand, shoulders level.",
    "Pause for a moment.",
    "Lower slowly to your side. Do all reps, then switch sides."
  ],
  "Kettlebell shrug": [
    "Stand tall with feet hip-width apart, a kettlebell in each hand hanging at your sides.",
    "Keep your arms straight and your head level.",
    "Lift your shoulders as high as possible toward your ears.",
    "Hold for a second at the top.",
    "Lower your shoulders slowly all the way down."
  ],
  "Kettlebell row": [
    "Stand with feet hip-width apart and a kettlebell in each hand.",
    "Bend your knees slightly and lean forward about 45 degrees with a flat back, arms hanging straight down.",
    "Pull both kettlebells up beside your lower ribs, elbows pointing up behind you.",
    "Squeeze your shoulder blades together for a moment.",
    "Lower the kettlebells slowly until your arms are straight."
  ],
  "Kettlebell gorilla row": [
    "Stand in a wide stance with two kettlebells on the floor between your feet.",
    "Hinge your hips back and bend your knees with a flat back, and grip one handle in each hand.",
    "Row the right kettlebell up beside your ribs while pressing the left one into the floor.",
    "Lower the right kettlebell back to the floor.",
    "Row the left kettlebell the same way, alternating sides each rep."
  ],
  "Kettlebell rear delt row": [
    "Stand with feet hip-width apart, gripping the handle of one kettlebell with both hands.",
    "Bend your knees slightly and lean forward about 45 degrees with a flat back, arms hanging straight down.",
    "Pull the kettlebell up toward your chest, flaring your elbows out wide to the sides.",
    "Stop with the kettlebell just below your chest and your elbows level with your shoulders.",
    "Lower it slowly until your arms are straight."
  ],
  "Kettlebell single-arm rear delt fly": [
    "Stand in a staggered stance and lean forward about 45 degrees with a flat back, left hand braced on your left thigh.",
    "Hold one kettlebell in your right hand with the arm hanging straight down.",
    "Sweep your right arm out to the side with a slight bend in the elbow.",
    "Stop when your arm is level with your shoulder.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell drag curl": [
    "Stand tall with feet hip-width apart, both hands gripping the handle of one kettlebell against the front of your thighs.",
    "Pull your elbows back behind your body and slide the kettlebell up along your torso.",
    "Continue until the kettlebell reaches your lower chest, elbows far back.",
    "Squeeze your biceps for a moment.",
    "Lower it slowly along your body until your arms are straight."
  ],
  "Kettlebell concentration curl": [
    "Sit on a flat bench with feet wide and lean forward, left hand on your left knee.",
    "Hold one kettlebell in your right hand and brace the back of your right upper arm against the inside of your right thigh.",
    "Start with your arm straight down, then curl the kettlebell up toward your shoulder.",
    "Squeeze your biceps at the top with your elbow fully bent.",
    "Lower slowly to a straight arm. Do all reps, then switch sides."
  ],
  "Kettlebell preacher curl": [
    "Sit at a preacher curl bench with the backs of both upper arms resting on the angled pad.",
    "Hold one kettlebell upside-down by the sides of its handle with both hands, arms almost straight.",
    "Curl the kettlebell up until your elbows are fully bent and it is near your chin.",
    "Squeeze your biceps, keeping your upper arms on the pad.",
    "Lower slowly until your arms are almost straight."
  ],
  "Kettlebell reverse curl": [
    "Stand tall with feet hip-width apart, gripping the handle of one kettlebell with both hands, palms facing down.",
    "Start with your arms straight in front of your thighs, elbows pinned to your sides.",
    "Curl the kettlebell up until your elbows are fully bent and it reaches upper-chest height.",
    "Keep your knuckles facing up and your wrists straight at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Kettlebell goblet curl": [
    "Hold one kettlebell upside-down by the sides of its handle and sink into a deep squat, heels flat.",
    "Rest your elbows on the insides of your knees with your arms extended down between them.",
    "Curl the kettlebell up to your chest, keeping your elbows on your knees.",
    "Squeeze your biceps at the top while holding the squat.",
    "Lower slowly until your arms are straight."
  ],
  "Kettlebell skull crusher": [
    "Lie on a flat bench with feet on the floor, holding one kettlebell upside-down by the sides of its handle.",
    "Start with your arms straight up above your chest.",
    "Bend your elbows and lower the kettlebell toward your forehead, elbows pointing at the ceiling.",
    "Stop when your elbows are fully bent and the kettlebell is just behind the top of your head.",
    "Straighten your arms to return to the start."
  ],
  "Kettlebell Tate press": [
    "Lie on a flat bench holding a kettlebell in each hand by the handle, arms straight up above your chest.",
    "Bend your elbows and let them flare out to the sides.",
    "Lower the kettlebells inward until they touch the middle of your chest lightly, elbows pointing out.",
    "Straighten your elbows to press the kettlebells back up.",
    "Keep your upper arms still throughout."
  ],
  "Kettlebell wrist curl": [
    "Sit on a flat bench and lean forward, resting your right forearm along your right thigh with the palm up and the wrist just past the knee.",
    "Hold one kettlebell in your right hand and steady the forearm with your left hand.",
    "Let your wrist bend down so the kettlebell hangs low.",
    "Curl your wrist up as high as possible.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell wrist extension": [
    "Sit on a flat bench and lean forward, resting your right forearm along your right thigh with the palm down and the wrist just past the knee.",
    "Hold one kettlebell in your right hand and steady the forearm with your left hand.",
    "Let your wrist bend down so your knuckles point at the floor.",
    "Lift the back of your hand up as high as possible.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell farmers carry": [
    "Stand between two kettlebells and pick them up with a flat back, one in each hand.",
    "Stand tall with your shoulders back and arms straight at your sides.",
    "Walk forward with short, steady steps.",
    "Keep your torso upright and your shoulders level the whole way.",
    "Set the kettlebells down under control when the set is done."
  ],
  "Kettlebell Russian twist": [
    "Sit on the floor with knees bent and heels lightly on the floor, holding one kettlebell upside-down by the sides of its handle in front of your chest.",
    "Lean back about 45 degrees with a straight back.",
    "Rotate your torso to the right and bring the kettlebell beside your right hip.",
    "Rotate to the left and bring it beside your left hip.",
    "Keep alternating sides, one twist per rep."
  ],
  "Kettlebell sit-up": [
    "Lie on your back with knees bent and feet flat on the floor.",
    "Hold one kettlebell upside-down by the sides of its handle against your chest.",
    "Curl your torso up off the floor until you are sitting fully upright.",
    "Pause with your chest close to your thighs.",
    "Lower yourself slowly back to the floor."
  ],
  "Kettlebell windmill": [
    "Stand in a wide stance with both feet turned 45 degrees to the left, one kettlebell locked out overhead in your right hand.",
    "Look up at the kettlebell and push your hips out to the right.",
    "Tilt your torso down to the left, sliding your left hand down the inside of your left leg.",
    "Reach toward the floor beside your left foot, keeping your right arm vertical.",
    "Stand back up the same way. Do all reps, then switch sides."
  ],
  "Kettlebell wood chopper": [
    "Stand with feet wider than shoulder-width, holding one kettlebell upside-down by the sides of its handle, arms nearly straight.",
    "Bend your knees and rotate down to the left until the kettlebell is beside the outside of your left knee.",
    "Stand up and swing the kettlebell diagonally across your body.",
    "Finish with the kettlebell above your right shoulder, torso rotated right and left heel pivoting.",
    "Return along the same path. Do all reps, then switch sides."
  ],
  "Kettlebell hollow hold": [
    "Lie on your back with legs straight, holding one kettlebell upside-down by the sides of its handle above your chest.",
    "Press your lower back into the floor and lift your shoulders and straight legs slightly off the floor.",
    "Reach your arms back beside your ears so the kettlebell is just off the floor.",
    "Hold this shallow banana shape with your legs about 30 degrees up.",
    "Keep breathing and hold for the target time, then lower everything to the floor."
  ],
  "Kettlebell thruster": [
    "Stand with a kettlebell in each hand racked at your shoulders, each ball on the back of its forearm.",
    "Squat down until your thighs are below parallel, chest up and kettlebells still racked.",
    "Drive up out of the squat.",
    "As you reach standing, press both kettlebells overhead in one continuous motion.",
    "Lower the kettlebells to the rack and go straight into the next squat."
  ],
  "Kettlebell clean and press": [
    "Stand with feet shoulder-width apart and a kettlebell in each hand, hinge at the hips and let both hang between your knees.",
    "Drive your hips forward and pull the kettlebells up close to your body.",
    "Catch them in the rack position at your shoulders, elbows tucked.",
    "Press both kettlebells straight overhead to a full lockout.",
    "Lower them to the rack, then back down between your knees."
  ],
  "Kettlebell single-arm swing": [
    "Stand tall holding one kettlebell by the handle in your right hand in front of your hips.",
    "Hinge your hips back with a flat back and swing the kettlebell back between your thighs.",
    "Snap your hips forward and stand tall so the kettlebell swings forward.",
    "Let it rise to chest height with your right arm straight, left arm swinging freely.",
    "Let it fall and hinge again. Do all reps, then switch hands."
  ],
  "Kettlebell single-arm snatch": [
    "Stand with feet shoulder-width apart, hinge at the hips and let one kettlebell hang between your knees in your right hand.",
    "Drive your hips forward and pull the kettlebell up close to your body, elbow high.",
    "As it passes head height, punch your hand upward so the kettlebell rolls onto the back of your forearm.",
    "Finish with your right arm locked straight overhead, body fully upright.",
    "Lower it close to your body back between your knees. Do all reps, then switch sides."
  ],
  "Kettlebell goblet good morning": [
    "Stand with feet hip-width apart, holding one kettlebell upside-down by the sides of its handle against your upper chest.",
    "Keep a slight bend in your knees and push your hips back.",
    "Tilt your torso forward with a flat back until it is almost parallel to the floor.",
    "Feel the stretch in your hamstrings.",
    "Drive your hips forward to stand tall again."
  ],
  "Kettlebell staggered deadlift": [
    "Stand with a kettlebell in each hand at your sides, left foot flat in front and right foot one foot-length behind on its toes.",
    "Push your hips back with a flat back and a slight bend in the front knee.",
    "Lower the kettlebells along your front leg until they reach mid-shin.",
    "Drive your hips forward to stand tall again.",
    "Do all reps, then switch your stance."
  ],
  "Kettlebell bottoms-up overhead press": [
    "Stand with feet shoulder-width apart, a kettlebell in each hand held bottoms-up: ball balanced above the fist, base pointing at the ceiling.",
    "Start with both fists at shoulder height, elbows bent and tucked.",
    "Press both kettlebells up slowly, keeping each ball balanced above its fist.",
    "Finish with both arms straight overhead.",
    "Lower under control back to shoulder height."
  ],
  "Kettlebell bottoms-up single-arm overhead press": [
    "Stand with feet shoulder-width apart, left arm relaxed at your side.",
    "Hold one kettlebell bottoms-up in your right hand at shoulder height, ball balanced above the fist.",
    "Press it up slowly, keeping the ball above your fist.",
    "Finish with your right arm straight overhead.",
    "Lower under control. Do all reps, then switch sides."
  ],
  "Kettlebell kneeling bottoms-up overhead press": [
    "Kneel on your left knee with your right foot flat in front, right knee bent 90 degrees, torso tall.",
    "Hold one kettlebell bottoms-up in your left hand at shoulder height, ball balanced above the fist.",
    "Press it up slowly until your left arm is straight overhead.",
    "Keep the ball balanced and your torso upright.",
    "Lower under control. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm Z press": [
    "Sit on the floor with both legs straight out in front and slightly apart, torso upright.",
    "Rack one kettlebell at your right shoulder, the ball on the back of your forearm, left hand on your left thigh.",
    "Press the kettlebell up until your right arm is straight overhead.",
    "Keep your torso upright without leaning.",
    "Lower it to the rack. Do all reps, then switch sides."
  ],
  "Kettlebell alternating Z press": [
    "Sit on the floor with both legs straight out in front and slightly apart, a kettlebell racked at each shoulder.",
    "Press the right kettlebell straight overhead while the left stays racked.",
    "Lower the right kettlebell back to the rack.",
    "Press the left kettlebell overhead while the right stays racked.",
    "Keep alternating arms, torso upright throughout."
  ],
  "Kettlebell single-arm push press": [
    "Stand with one kettlebell racked at your right shoulder, the ball on the back of your forearm, left arm out to the side.",
    "Dip into a shallow quarter squat with your torso upright.",
    "Drive up hard with your legs and press the kettlebell overhead in one motion.",
    "Lock your right arm out with your legs fully straight.",
    "Lower it to the rack. Do all reps, then switch sides."
  ],
  "Kettlebell long-lever lateral raise": [
    "Stand tall with your left hand on your hip.",
    "Grip one kettlebell in your right hand so the ball points away from you, in line with your arm.",
    "Start with your right arm at your side, ball pointing down.",
    "Raise your arm out to the side to shoulder height, the ball pointing straight out past your fist.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell incline shrug": [
    "Lie chest-down on a bench set at a 45-degree incline, toes on the floor.",
    "Hold a kettlebell in each hand, arms hanging straight down toward the floor.",
    "Pull your shoulders up and back, squeezing your shoulder blades together with straight arms.",
    "Hold for a second at the top.",
    "Lower slowly until your shoulder blades spread apart."
  ],
  "Kettlebell shrug single": [
    "Stand tall with feet hip-width apart, both hands gripping the handle of one kettlebell in front of your thighs.",
    "Keep your arms straight.",
    "Lift your shoulders as high as possible toward your ears.",
    "Hold for a second at the top.",
    "Lower your shoulders slowly all the way down."
  ],
  "Kettlebell silverback shrug": [
    "Stand with feet hip-width apart and a kettlebell in each hand.",
    "Bend your knees slightly and lean forward about 30 degrees with a flat back, arms hanging straight down.",
    "Pull your shoulders up and back, squeezing your shoulder blades together with straight arms.",
    "Hold for a second without changing your torso angle.",
    "Lower slowly until your shoulders drop forward."
  ],
  "Kettlebell upright row single": [
    "Stand tall with your left hand on your hip, one kettlebell in your right hand in front of your right thigh.",
    "Pull the kettlebell straight up close to your body, bending your elbow out to the side.",
    "Stop at chest height with your right elbow high above your hand.",
    "Pause for a moment.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm Pendlay row": [
    "Stand with feet hip-width apart and one kettlebell on the floor below your right shoulder.",
    "Bend your knees and hinge until your torso is parallel to the floor, back flat, left hand on your left knee.",
    "Grip the handle with your right hand, arm straight.",
    "Pull the kettlebell up beside your lower ribs, elbow pointing at the ceiling.",
    "Lower it back to the floor and pause. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm row on bench": [
    "Place your left knee and left hand on a flat bench, right foot on the floor, torso parallel to the floor.",
    "Hold one kettlebell in your right hand with the arm hanging straight down.",
    "Pull the kettlebell up beside your lower ribs, elbow pointing at the ceiling.",
    "Squeeze your back for a moment.",
    "Lower slowly to a straight arm. Do all reps, then switch sides."
  ],
  "Kettlebell alternating row": [
    "Stand with feet hip-width apart, a kettlebell in each hand, and lean forward about 45 degrees with a flat back.",
    "Let both arms hang straight down.",
    "Pull the right kettlebell up beside your right ribs while the left arm stays straight.",
    "Lower the right kettlebell, then pull the left one up beside your left ribs.",
    "Keep alternating sides without changing your torso angle."
  ],
  "Kettlebell row single": [
    "Stand with feet hip-width apart, gripping the handle of one kettlebell with both hands.",
    "Bend your knees slightly and lean forward about 45 degrees with a flat back, arms hanging straight down.",
    "Pull the kettlebell up until it touches your stomach, elbows pointing back past your ribs.",
    "Squeeze your shoulder blades together.",
    "Lower slowly until your arms are straight."
  ],
  "Kettlebell rear delt row double": [
    "Stand with feet hip-width apart, a kettlebell in each hand, and lean forward about 45 degrees with a flat back.",
    "Let both arms hang straight down.",
    "Pull both kettlebells up, flaring your elbows out wide to the sides.",
    "Stop with your elbows level with your shoulders and the kettlebells beside your chest.",
    "Lower slowly until your arms are straight."
  ],
  "Kettlebell single-arm rear delt row": [
    "Stand in a staggered stance and lean forward about 45 degrees with a flat back, left hand braced on your left thigh.",
    "Hold one kettlebell in your right hand with the arm hanging straight down.",
    "Pull the kettlebell up, flaring your right elbow out wide to the side.",
    "Stop with your elbow level with your shoulder and the kettlebell beside your chest.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm curl": [
    "Stand tall with feet hip-width apart, one kettlebell in your right hand, palm facing forward, left arm relaxed.",
    "Keep your right elbow pinned to your side.",
    "Curl the kettlebell up until your elbow is fully bent and it reaches shoulder height.",
    "Squeeze your biceps for a moment.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm reverse curl": [
    "Stand tall with feet hip-width apart, one kettlebell in your right hand with the palm facing down, left arm relaxed.",
    "Keep your right elbow pinned to your side.",
    "Curl the kettlebell up until your elbow is fully bent and it reaches shoulder height, knuckles leading.",
    "Pause with your wrist straight.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell decline skull crusher": [
    "Lie on a bench set at a 20-degree decline with your shins hooked under the foot pads.",
    "Hold one kettlebell upside-down by the sides of its handle, arms straight up above your chest.",
    "Bend your elbows and lower the kettlebell toward your forehead, elbows pointing up.",
    "Stop when your elbows are fully bent and the kettlebell is just behind the top of your head.",
    "Straighten your arms to return to the start."
  ],
  "Kettlebell Larsen press": [
    "Lie on a flat bench with a kettlebell in each hand, each ball resting on the back of its forearm.",
    "Lift both legs and hold them straight out, level with the bench, feet off the floor.",
    "Start with the kettlebells beside your chest, elbows bent.",
    "Press both kettlebells up until your arms are straight above your chest.",
    "Lower slowly, keeping your legs straight and off the floor."
  ],
  "Kettlebell single-arm Larsen press": [
    "Lie on a flat bench with one kettlebell in your right hand resting on the back of your forearm, left hand on your stomach.",
    "Lift both legs and hold them straight out, level with the bench.",
    "Start with the kettlebell beside your chest, right elbow bent.",
    "Press it up until your right arm is straight above your chest.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell guillotine bench press": [
    "Lie on a flat bench with a kettlebell in each hand, arms straight up above your collarbones.",
    "Flare your elbows straight out to the sides.",
    "Lower the kettlebells slowly toward the sides of your neck and collarbones, elbows level with your shoulders.",
    "Stop when you feel a stretch across your upper chest.",
    "Press back up along the same path."
  ],
  "Kettlebell high incline bench press": [
    "Sit back on a bench set at a steep 60-degree incline, feet flat on the floor, a kettlebell in each hand resting on the back of its forearm.",
    "Start with the kettlebells beside your upper chest, elbows bent.",
    "Press both kettlebells up until your arms are straight and the bells are above your shoulders.",
    "Lower them slowly back beside your upper chest.",
    "Repeat, keeping your back on the pad."
  ],
  "Kettlebell single-arm incline chest press": [
    "Lie back on a bench set at a 30-degree incline, feet flat on the floor, one kettlebell in your right hand resting on the back of your forearm.",
    "Rest your left hand on your stomach.",
    "Start with the kettlebell beside your upper chest, right elbow bent.",
    "Press it up until your right arm is straight above your right shoulder.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm floor fly": [
    "Lie on your back on the floor with knees bent, one kettlebell in your right hand resting on the back of your forearm, left arm on the floor beside you.",
    "Start with your right arm straight up above your chest.",
    "Open your right arm out to the side in a wide arc, elbow slightly bent.",
    "Stop when your upper arm rests on the floor.",
    "Squeeze your chest to bring it back up. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm chest fly": [
    "Lie on a flat bench with feet on the floor, one kettlebell in your right hand resting on the back of your forearm, left hand on your stomach.",
    "Start with your right arm straight up above your chest.",
    "Open your right arm out to the side in a wide arc, elbow slightly bent.",
    "Stop when your arm is level with the bench top.",
    "Squeeze your chest to bring it back up. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm pullover": [
    "Lie on your back on a flat bench with feet flat on the floor, one kettlebell held by the handle in your right hand, left hand on your stomach.",
    "Start with your right arm straight up above your chest.",
    "Lower the kettlebell back over your face with your elbow slightly bent.",
    "Stop when your arm is stretched back beyond your head, in line with your body.",
    "Pull it back above your chest. Do all reps, then switch sides."
  ],
  "Kettlebell bench wrist curl": [
    "Kneel on the floor beside a flat bench and rest both forearms across it, palms up, wrists just past the far edge.",
    "Grip the handle of one kettlebell with both hands.",
    "Let your wrists bend down so the kettlebell hangs low.",
    "Curl your wrists up as far as they go, forearms flat on the bench.",
    "Lower slowly and repeat."
  ],
  "Kettlebell bench wrist extension": [
    "Kneel on the floor beside a flat bench and rest both forearms across it, palms down, wrists just past the far edge.",
    "Grip the handle of one kettlebell with both hands.",
    "Let your wrists bend down so your knuckles point at the floor.",
    "Lift your knuckles as high as they go, forearms flat on the bench.",
    "Lower slowly and repeat."
  ],
  "Kettlebell alternating curtsy lunge": [
    "Stand tall with feet hip-width apart, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Step your right foot diagonally back behind your left leg and bend both knees.",
    "Lower until your right knee is just above the floor, hips facing forward.",
    "Push through your left foot to return to standing.",
    "Repeat with the left foot behind the right, alternating each rep."
  ],
  "Kettlebell alternating forward lunge": [
    "Stand tall with feet together and a kettlebell in each hand at your sides.",
    "Step your right foot forward and lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push off your right foot to return to standing.",
    "Step forward with your left foot and lunge the same way.",
    "Keep alternating legs with your torso upright."
  ],
  "Kettlebell alternating lateral lunge": [
    "Stand tall with feet together, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Step your right foot wide to the right and sit your hips back over your bent right knee, left leg straight.",
    "Push off your right foot to return to the middle.",
    "Step your left foot wide to the left and lunge the same way.",
    "Keep alternating sides."
  ],
  "Kettlebell alternating reverse lunge": [
    "Stand tall with feet together and a kettlebell in each hand at your sides.",
    "Step your right foot straight back and lower until your left thigh is parallel to the floor.",
    "Push through your left foot to return to standing.",
    "Step your left foot back and lunge the same way.",
    "Keep alternating legs with your torso upright."
  ],
  "Kettlebell alternating single-arm thruster": [
    "Stand with feet shoulder-width apart, a kettlebell racked at each shoulder.",
    "Squat down until your thighs are below parallel, chest up.",
    "Drive up and, as you stand, press the right kettlebell overhead while the left stays racked.",
    "Lower the right kettlebell to the rack and squat again.",
    "On the next rep press the left kettlebell, alternating each time."
  ],
  "Kettlebell alternating swing": [
    "Stand with feet a little wider than shoulder-width, one kettlebell in your right hand.",
    "Hinge your hips back and swing the kettlebell back between your thighs.",
    "Snap your hips forward so the kettlebell floats up to chest height.",
    "At the top, pass the handle from your right hand to your left.",
    "Let it swing back in your left hand and repeat, switching hands at the top of every rep."
  ],
  "Kettlebell assisted Bulgarian split squat": [
    "Stand one long stride in front of a flat bench, beside a sturdy upright post.",
    "Rest the top of your right foot on the bench behind you, hold the post with your left hand and a kettlebell in your right hand at your side.",
    "Bend your left knee and lower until your left thigh is parallel to the floor.",
    "Push through your left foot to stand back up.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell chest press single": [
    "Lie on a flat bench with feet flat on the floor, holding one kettlebell upside-down by the sides of its handle above your chest.",
    "Start with the kettlebell just above the middle of your chest, elbows bent and tucked.",
    "Press it straight up until both arms are straight.",
    "Lower slowly back to just above your chest.",
    "Repeat, keeping your elbows close to your ribs."
  ],
  "Kettlebell clean and jerk": [
    "Stand with feet shoulder-width apart and a kettlebell in each hand, hinge and let both hang between your knees.",
    "Drive your hips forward and clean both kettlebells to the rack at your shoulders.",
    "Dip slightly, drive up hard, then drop into a shallow quarter squat as you punch both arms straight overhead.",
    "Stand up fully with your arms locked out.",
    "Lower the kettlebells to the rack, then back between your knees."
  ],
  "Kettlebell conventional deadlift double": [
    "Stand with feet hip-width apart and one kettlebell on the floor just outside each foot.",
    "Push your hips back and bend your knees with a flat back, and grip one handle in each hand.",
    "Push through your feet and stand up with your arms straight.",
    "Finish fully upright with the kettlebells hanging at your sides.",
    "Hinge back down and set both kettlebells on the floor."
  ],
  "Kettlebell deficit reverse lunge": [
    "Stand on a low platform with feet together, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Step your right foot straight back and down onto the floor behind the platform.",
    "Lower until your left thigh is below parallel and your right knee is just above the floor.",
    "Push through your left foot to step back up onto the platform.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell farmers march": [
    "Stand tall with feet together and a kettlebell in each hand at your sides.",
    "Lift your left knee to hip height, standing on your right leg.",
    "Lower your left foot to the same spot.",
    "Lift your right knee to hip height.",
    "Keep marching in place with your torso upright and shoulders level."
  ],
  "Kettlebell figure-four hip thrust": [
    "Sit with your upper back against the long edge of a flat bench, left foot flat on the floor.",
    "Cross your right ankle over your left knee and rest one kettlebell on your hips, held with both hands.",
    "Push through your left heel and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your left glute at the top.",
    "Lower slowly. Do all reps, then switch legs."
  ],
  "Kettlebell forward lunge double": [
    "Stand tall with feet together and a kettlebell in each hand at your sides.",
    "Step your right foot one long stride forward and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push off your right foot to return to the start.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell front rack cossack squat": [
    "Stand in a very wide stance with a kettlebell racked at each shoulder.",
    "Shift your weight to the right and bend your right knee, keeping your left leg straight.",
    "Sink into a deep side squat over your right foot, right heel flat and left toes pointing up.",
    "Push through your right foot to return to the middle.",
    "Repeat to the left, alternating sides."
  ],
  "Kettlebell front rack curtsy lunge double": [
    "Stand tall with feet hip-width apart and a kettlebell racked at each shoulder.",
    "Step your right foot diagonally back and across behind your left leg.",
    "Bend both knees until your right knee is just above the floor behind your left heel.",
    "Push through your left foot to return to standing.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell front rack deficit reverse lunge": [
    "Stand on a low platform with feet together and a kettlebell racked at each shoulder.",
    "Step your right foot straight back and down onto the floor behind the platform.",
    "Lower until your left thigh is below parallel and your right knee is just above the floor.",
    "Push through your left foot to step back up.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell front rack forward lunge double": [
    "Stand tall with feet together and a kettlebell racked at each shoulder.",
    "Step your right foot one long stride forward and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push off your right foot to return to the start.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell front rack lateral lunge double": [
    "Stand tall with feet together and a kettlebell racked at each shoulder.",
    "Step your right foot wide out to the right.",
    "Sit your hips back over your bent right knee, left leg straight and left foot flat, chest up.",
    "Push off your right foot to return to standing.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell front rack reverse lunge double": [
    "Stand tall with feet together and a kettlebell racked at each shoulder.",
    "Step your right foot straight back and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to return to the start.",
    "Do all reps, then switch legs."
  ],
  "Kettlebell front rack single-arm lateral lunge": [
    "Stand tall with feet together, one kettlebell racked at your right shoulder and your left arm relaxed.",
    "Step your right foot wide out to the right.",
    "Sit your hips back over your bent right knee, left leg straight and chest up.",
    "Push off your right foot to return to standing.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell front rack step-up": [
    "Stand facing a knee-high box with a kettlebell racked at each shoulder.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and step up until you stand tall on the box with both feet.",
    "Step back down with your right foot first.",
    "Do all reps on one leg, then switch."
  ],
  "Kettlebell front rack step-up knee drive": [
    "Stand facing a knee-high box with a kettlebell racked at each shoulder.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box, driving your right knee up to hip height.",
    "Hold for a moment on your left leg.",
    "Lower your right foot back to the floor. Do all reps, then switch legs."
  ],
  "Kettlebell full swing": [
    "Stand with feet a little wider than shoulder-width, both hands on the handle of one kettlebell.",
    "Hinge your hips back and swing the kettlebell back between your thighs.",
    "Snap your hips forward and let the kettlebell swing up past chest height.",
    "Finish with both arms straight overhead beside your ears, the base of the kettlebell pointing at the ceiling.",
    "Let it fall back along the same arc and hinge into the next rep."
  ],
  "Kettlebell goblet calf raise": [
    "Stand tall holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Keep your feet hip-width apart and flat on the floor.",
    "Lift your heels as high as possible, rising onto the balls of your feet.",
    "Hold the top for a second with your legs straight.",
    "Lower your heels slowly back to the floor."
  ],
  "Kettlebell goblet cossack squat": [
    "Stand in a very wide stance, holding one kettlebell upside-down by the sides of its handle against your chest.",
    "Shift to the right and bend your right knee, left leg straight.",
    "Sink into a deep side squat over your right foot, heel flat and left toes pointing up.",
    "Push through your right foot to return to the middle.",
    "Repeat to the left, alternating sides."
  ],
  "Kettlebell half-kneeling goblet Romanian deadlift": [
    "Kneel on your right knee with your left foot flat in front, left knee bent 90 degrees.",
    "Hold one kettlebell upside-down by the sides of its handle against your chest, torso tall.",
    "Push your hips back toward your right heel and tilt your torso forward with a flat back.",
    "Stop when your torso is about 60 degrees forward over your left thigh.",
    "Drive your hips forward to return upright. Do all reps, then switch sides."
  ],
  "Kettlebell half-kneeling Romanian deadlift": [
    "Kneel on your right knee with your left foot flat in front, left knee bent 90 degrees.",
    "Hold a kettlebell in each hand at your sides, torso tall.",
    "Push your hips back toward your right heel and tilt your torso forward with a flat back.",
    "Lower the kettlebells until they are just above the floor on either side of your left foot.",
    "Drive your hips forward to return upright. Do all reps, then switch sides."
  ],
  "Kettlebell hang clean and jerk": [
    "Stand with feet shoulder-width apart, a kettlebell in each hand hanging just above your knees, torso leaning forward slightly.",
    "Drive your hips forward and clean both kettlebells to the rack at your shoulders.",
    "Dip slightly, drive up, then drop into a shallow quarter squat as you punch both arms overhead.",
    "Stand up fully with your arms locked out.",
    "Lower the kettlebells to the rack, then back to the hang."
  ],
  "Kettlebell hang clean and press": [
    "Stand with feet shoulder-width apart, a kettlebell in each hand hanging just above your knees, torso leaning forward slightly.",
    "Drive your hips forward and clean both kettlebells to the rack at your shoulders.",
    "Stand tall, then press both kettlebells straight overhead with your legs straight.",
    "Lock your arms out fully.",
    "Lower the kettlebells to the rack, then back to the hang."
  ],
  "Kettlebell hang squat clean and jerk": [
    "Stand with feet shoulder-width apart, a kettlebell in each hand hanging just above your knees.",
    "Drive your hips forward, pull the kettlebells up and drop into a deep squat, catching them in the rack at your shoulders.",
    "Stand up out of the squat with the kettlebells racked.",
    "Dip slightly and drive both kettlebells overhead to a full lockout.",
    "Lower them to the rack, then back to the hang."
  ],
  "Kettlebell heels-up goblet squat": [
    "Stand with both heels on a low wedge, toes on the floor, feet hip-width apart.",
    "Hold one kettlebell upside-down by the sides of its handle against your chest.",
    "Squat down, letting your knees travel forward over your toes, torso upright.",
    "Go until your thighs are below parallel, heels still on the wedge.",
    "Push back up to standing."
  ],
  "Kettlebell incline guillotine bench press": [
    "Lie back on a bench set at a 30-degree incline with a kettlebell in each hand, arms straight above your collarbones.",
    "Flare your elbows straight out to the sides.",
    "Lower the kettlebells slowly until they are level with your collarbones and neck, elbows level with your shoulders.",
    "Stop when you feel a stretch across your upper chest.",
    "Press back up along the same path."
  ],
  "Kettlebell lateral lunge single": [
    "Stand tall with feet together, both hands gripping the handle of one kettlebell in front of your thighs.",
    "Step your right foot wide out to the right.",
    "Sit your hips back over your bent right knee with a flat back, lowering the kettlebell until it hangs just above the floor between your feet.",
    "Push off your right foot to return to standing.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell seated calf raise": [
    "Sit on the end of a flat bench with knees bent 90 degrees and the balls of both feet on a weight plate.",
    "Stand one kettlebell upright on your right thigh just above the knee and hold its handle with your right hand.",
    "Let your heels drop below the edge of the plate.",
    "Lift your heels as high as possible.",
    "Lower slowly and repeat."
  ],
  "Kettlebell seated calf raise double": [
    "Sit on the end of a flat bench with knees bent 90 degrees and the balls of both feet on a weight plate.",
    "Stand a kettlebell upright on each thigh just above the knee and hold each handle.",
    "Let your heels drop below the edge of the plate.",
    "Lift your heels as high as possible.",
    "Lower slowly and repeat."
  ],
  "Kettlebell shoulder extension": [
    "Stand with feet hip-width apart, knees slightly bent, leaning forward about 20 degrees with a flat back.",
    "Hold a kettlebell in each hand with your arms hanging straight down.",
    "Sweep both straight arms back past your hips.",
    "Lift them back and up as far as they go without changing your torso angle.",
    "Lower slowly to the start."
  ],
  "Kettlebell silverback shrug single": [
    "Stand with feet hip-width apart, both hands gripping the handle of one kettlebell.",
    "Bend your knees slightly and lean forward about 30 degrees with a flat back, arms hanging straight down.",
    "Pull your shoulders up and back, squeezing your shoulder blades together with straight arms.",
    "Hold for a second.",
    "Lower slowly until your shoulders drop forward."
  ],
  "Kettlebell single-arm calf raise": [
    "Stand on both feet, hip-width apart, with one kettlebell in your right hand at your side and your left hand on your hip.",
    "Lift both heels as high as possible, rising onto the balls of your feet.",
    "Hold the top for a second with your legs straight.",
    "Lower your heels slowly back to the floor.",
    "Do all reps, then switch the kettlebell to the other hand."
  ],
  "Kettlebell single-arm clean and jerk": [
    "Stand with feet shoulder-width apart, hinge and let one kettlebell hang between your knees in your right hand.",
    "Drive your hips forward and clean the kettlebell to the rack at your right shoulder.",
    "Dip slightly, drive up, then drop into a shallow quarter squat as you punch your right arm overhead.",
    "Stand up fully with your arm locked out.",
    "Lower to the rack, then between your knees. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm clean and press": [
    "Stand with feet shoulder-width apart, hinge and let one kettlebell hang between your knees in your right hand.",
    "Drive your hips forward and clean the kettlebell to the rack at your right shoulder.",
    "Stand tall and press it straight overhead with your legs straight.",
    "Lock your right arm out fully.",
    "Lower to the rack, then between your knees. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm curtsy lunge": [
    "Stand tall with feet hip-width apart, one kettlebell in your right hand at your side.",
    "Step your right foot diagonally back and across behind your left leg.",
    "Bend both knees until your right knee is just above the floor, hips square.",
    "Push through your left foot to return to standing.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm farmers march": [
    "Stand tall with feet together, one kettlebell in your right hand at your side.",
    "Lift your left knee to hip height, standing on your right leg.",
    "Lower your left foot to the same spot.",
    "Lift your right knee to hip height.",
    "Keep marching in place without leaning. Switch hands for the next set."
  ],
  "Kettlebell single-arm farmers walk": [
    "Stand beside one kettlebell and pick it up with a flat back in your right hand.",
    "Stand tall with your shoulders back and level, left arm relaxed.",
    "Walk forward with short, steady steps.",
    "Keep your torso upright the whole way without leaning toward the kettlebell.",
    "Set it down, switch hands and walk back."
  ],
  "Kettlebell single-arm forward lunge": [
    "Stand tall with feet together, one kettlebell in your right hand at your side.",
    "Step your right foot one long stride forward and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push off your right foot to return to the start.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm front rack step-up": [
    "Stand facing a knee-high box with one kettlebell racked at your right shoulder.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and step up until you stand tall on the box with both feet.",
    "Step back down with your right foot first.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm front rack step-up knee drive": [
    "Stand facing a knee-high box with one kettlebell racked at your right shoulder.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box, driving your right knee up to hip height.",
    "Hold for a moment on your left leg.",
    "Lower your right foot to the floor. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm hang clean and jerk": [
    "Stand with feet shoulder-width apart, one kettlebell in your right hand hanging just above your knees, torso leaning forward slightly.",
    "Drive your hips forward and clean the kettlebell to the rack at your right shoulder.",
    "Dip slightly, drive up, then drop into a shallow quarter squat as you punch your right arm overhead.",
    "Stand up fully with your arm locked out.",
    "Lower to the rack, then to the hang. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm hang clean and press": [
    "Stand with feet shoulder-width apart, one kettlebell in your right hand hanging just above your knees, torso leaning forward slightly.",
    "Drive your hips forward and clean the kettlebell to the rack at your right shoulder.",
    "Stand tall and press it straight overhead with your legs straight.",
    "Lock your right arm out fully.",
    "Lower to the rack, then to the hang. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm high incline chest press": [
    "Sit back on a bench set at a steep 60-degree incline, feet flat on the floor.",
    "Hold one kettlebell in your right hand beside your right shoulder, the ball on the back of your forearm, left hand on your thigh.",
    "Press the kettlebell up until your right arm is straight above your shoulder.",
    "Lower it slowly back beside your shoulder.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm reverse lunge": [
    "Stand tall with feet together, one kettlebell in your right hand at your side.",
    "Step your right foot straight back and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to return to the start.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm shoulder extension": [
    "Stand with feet hip-width apart, knees slightly bent, leaning forward about 20 degrees with a flat back.",
    "Hold one kettlebell in your right hand with the arm hanging straight down, left hand on your hip.",
    "Sweep your straight right arm back past your hip.",
    "Lift it back and up as far as it goes without changing your torso angle.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm step-up balance": [
    "Stand facing a knee-high box, one kettlebell in your right hand at your side.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand tall on the box on that leg only.",
    "Let your right leg hang straight beside the box without touching it and hold your balance.",
    "Lower your right foot to the floor. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm step-up knee drive": [
    "Stand facing a knee-high box, one kettlebell in your right hand at your side.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box, driving your right knee up to hip height.",
    "Hold for a moment on your left leg.",
    "Lower your right foot to the floor. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm thruster": [
    "Stand with feet shoulder-width apart, one kettlebell racked at your right shoulder, left arm out to the side.",
    "Squat down until your thighs are below parallel, chest up.",
    "Drive up out of the squat.",
    "As you reach standing, press the kettlebell overhead until your right arm is locked out.",
    "Lower it to the rack and squat again. Do all reps, then switch sides."
  ],
  "Kettlebell single-leg calf raise": [
    "Stand facing a sturdy upright post, one kettlebell in your right hand at your side, left hand on the post.",
    "Stand on your right foot only and hook your left foot behind your right ankle.",
    "Lift your right heel as high as possible.",
    "Hold the top for a second with your leg straight.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell single-leg glute bridge": [
    "Lie on your back with your left knee bent and left foot flat, one kettlebell resting on your lower belly, held with both hands.",
    "Hold your right leg straight in the air, in line with your left thigh.",
    "Push through your left heel and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your left glute at the top.",
    "Lower slowly. Do all reps, then switch legs."
  ],
  "Kettlebell single-leg hip thrust": [
    "Sit with your upper back against the long edge of a flat bench, left foot flat on the floor and one kettlebell on your hips.",
    "Hold your right leg straight out in the air.",
    "Push through your left heel and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your left glute at the top, left shin vertical.",
    "Lower slowly. Do all reps, then switch legs."
  ],
  "Kettlebell single-leg single-arm calf raise": [
    "Stand facing a sturdy upright post with the ball of your right foot on the edge of a weight plate, left foot hooked behind your right ankle.",
    "Hold one kettlebell in your right hand at your side and the post with your left hand.",
    "Let your right heel drop below the edge of the plate.",
    "Lift your heel as high as possible and pause.",
    "Lower slowly. Do all reps, then switch sides."
  ],
  "Kettlebell snatch double": [
    "Stand with feet shoulder-width apart and a kettlebell in each hand, hinge and let both hang between your knees.",
    "Drive your hips forward and pull both kettlebells up close to your body, elbows high.",
    "As they pass head height, punch both hands upward so each ball rolls onto the back of its forearm.",
    "Finish with both arms locked straight overhead, body fully upright.",
    "Lower the kettlebells close to your body back between your knees."
  ],
  "Kettlebell spinal Jefferson curl": [
    "Stand on top of a low box with your toes at the front edge, feet together, both hands gripping the handle of one kettlebell.",
    "Tuck your chin to your chest and start rounding your upper back.",
    "Keep rolling down slowly, legs straight, letting the kettlebell slide down past your knees.",
    "Stop when your whole spine is rounded and the kettlebell hangs below the top of the box.",
    "Roll back up slowly, one vertebra at a time."
  ],
  "Kettlebell squat clean and jerk": [
    "Stand with feet shoulder-width apart and a kettlebell in each hand, hinge and let both hang between your knees.",
    "Drive your hips forward, pull the kettlebells up and drop into a deep squat, catching them in the rack.",
    "Stand up out of the squat with the kettlebells racked.",
    "Dip slightly and drive both kettlebells overhead to a full lockout.",
    "Lower them to the rack, then back between your knees."
  ],
  "Kettlebell staggered deadlift single": [
    "Stand with your left foot flat in front and your right foot one foot-length behind on its toes, both hands gripping one kettlebell in front of your thighs.",
    "Push your hips back with a flat back and a slight bend in the front knee.",
    "Lower the kettlebell in front of your front leg until it reaches mid-shin.",
    "Drive your hips forward to stand tall again.",
    "Do all reps, then switch your stance."
  ],
  "Kettlebell standing tricep extension": [
    "Stand tall with feet hip-width apart, holding one kettlebell upside-down by the sides of its handle.",
    "Press it overhead until both arms are straight.",
    "Bend your elbows and lower the kettlebell behind your head, elbows pointing at the ceiling.",
    "Stop when the kettlebell is behind your neck between your shoulder blades.",
    "Straighten your arms to raise it back overhead."
  ],
  "Kettlebell step-up double": [
    "Stand facing a knee-high box with a kettlebell in each hand at your sides.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and step up until you stand tall on the box with both feet.",
    "Step back down with your right foot first.",
    "Do all reps on one leg, then switch."
  ],
  "Kettlebell swing double": [
    "Stand with feet wider than shoulder-width, a kettlebell in each hand hanging in front of your hips.",
    "Hinge your hips back with a flat back and swing both kettlebells back between your thighs.",
    "Snap your hips forward and stand tall so both kettlebells swing forward.",
    "Let them rise to chest height with straight arms, side by side.",
    "Let them fall and hinge into the next rep."
  ],
  "Kettlebell tibialis raise": [
    "Sit on the edge of a tall bench so your lower legs hang without touching the floor, hands gripping the bench edge.",
    "Hook the handle of one kettlebell over the top of your right foot near the toes.",
    "Let your toes point down so the kettlebell hangs low.",
    "Pull your toes up toward your shin as far as possible, keeping your knee still.",
    "Lower slowly. Do all reps, then switch feet."
  ],
  "Kettlebell walking farmers march": [
    "Stand tall with feet together and a kettlebell in each hand at your sides.",
    "Lift your left knee to hip height, then step that foot forward.",
    "Lift your right knee to hip height, then step that foot forward.",
    "Keep walking with high knees, torso upright and shoulders level.",
    "Set the kettlebells down under control at the end."
  ],
  "Kettlebell walkover push-up": [
    "Stand one kettlebell upright on the floor and get into a push-up position with your right hand on its handle and your left hand on the floor.",
    "Lower your chest until it is level with the kettlebell.",
    "Push back up to straight arms.",
    "Walk your hands across so your left hand is on the handle and your right hand is on the floor on the other side.",
    "Do a push-up on that side and keep alternating."
  ],
  "Kettlebell windmill bottom hand": [
    "Stand in a wide stance with both feet turned 45 degrees to the left, one kettlebell in your left hand and your right arm pointing straight up.",
    "Look up at your right hand and push your hips out to the right.",
    "Tilt your torso down to the left, lowering the kettlebell along the inside of your left leg.",
    "Stop when the kettlebell is just above the floor beside your left foot, both arms in one vertical line.",
    "Stand back up the same way. Do all reps, then switch sides."
  ],
  "Kettlebell single-arm front rack forward lunge": [
    "Stand tall with feet together, one kettlebell racked at your right shoulder and your left arm relaxed.",
    "Step your right foot one long stride forward and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push off your right foot to return to the start.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell single-arm front rack reverse lunge": [
    "Stand tall with feet together, one kettlebell racked at your right shoulder and your left arm relaxed.",
    "Step your right foot straight back and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to return to the start.",
    "Do all reps, then switch sides."
  ],
  "Kettlebell staggered swing": [
    "Stand with your left foot flat in front and your right foot one foot-length behind on its toes, both hands on the handle of one kettlebell.",
    "Hinge your hips back with a flat back and swing the kettlebell back between your thighs.",
    "Snap your hips forward and stand tall so the kettlebell swings forward.",
    "Let it rise to chest height with straight arms, feet still staggered.",
    "Let it fall and hinge again. Switch your stance for the next set."
  ],
  "Kettlebell kickstand squat": [
    "Stand with your left foot flat in front and your right foot one foot-length behind on its toes.",
    "Hold one kettlebell upside-down by the sides of its handle against your chest.",
    "Squat down over your left leg, torso upright.",
    "Go until your left thigh is parallel to the floor, right heel still lifted.",
    "Push through your left foot to stand. Do all reps, then switch legs."
  ],
  "Dumbbell alternating Arnold press": [
    "Stand with feet shoulder-width apart and hold both dumbbells in front of your shoulders, palms facing you.",
    "Press the right dumbbell up while turning your palm to face forward.",
    "Lock your right arm out overhead, keeping the left dumbbell at your shoulder.",
    "Lower the right dumbbell and turn the palm back toward you.",
    "Repeat with the left arm; one press on each side is one rep."
  ],
  "Dumbbell alternating forward lunge": [
    "Stand tall with feet together, a dumbbell in each hand at your sides.",
    "Step forward with your right foot and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push through your right foot to step back to the start.",
    "Repeat with the left foot; one lunge on each side is one rep."
  ],
  "Dumbbell alternating lateral lunge": [
    "Stand tall with feet together, a dumbbell in each hand at your sides.",
    "Step wide to the right and sit your hips back over your right knee.",
    "Lower until your right thigh is near parallel, the dumbbells on either side of your right shin and your left leg straight.",
    "Push off your right foot to return to the start.",
    "Repeat to the left; one lunge on each side is one rep."
  ],
  "Dumbbell alternating overhead press": [
    "Stand with feet shoulder-width apart and hold both dumbbells at shoulder height, palms facing forward.",
    "Press the right dumbbell straight overhead until your arm is locked out.",
    "Lower it back to your shoulder under control.",
    "Press the left dumbbell overhead the same way.",
    "Lower it; one press on each side is one rep."
  ],
  "Dumbbell alternating Pendlay row": [
    "Place two dumbbells on the floor, hinge forward until your torso is parallel to the floor and grip them.",
    "Pull the right dumbbell up to your lower ribs while the left stays on the floor.",
    "Lower the right dumbbell back to the floor and let it settle.",
    "Pull the left dumbbell up to your lower ribs.",
    "Lower it to the floor; one row on each side is one rep."
  ],
  "Dumbbell alternating rear delt fly": [
    "Hold a dumbbell in each hand and hinge forward with a flat back until your torso is almost parallel to the floor.",
    "Let both arms hang under your chest, palms facing each other.",
    "Raise your right arm out to the side to shoulder height.",
    "Lower it slowly, then raise your left arm the same way.",
    "Lower it; one raise on each side is one rep."
  ],
  "Dumbbell alternating reverse lunge": [
    "Stand tall with feet together, a dumbbell in each hand at your sides.",
    "Step straight back with your right foot and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to bring the right foot back to the start.",
    "Repeat stepping back with the left foot; one lunge on each side is one rep."
  ],
  "Dumbbell alternating single-arm thruster": [
    "Stand with feet shoulder-width apart and hold both dumbbells at your shoulders, palms facing each other.",
    "Squat down until your thighs are at least parallel to the floor.",
    "Drive up and press the right dumbbell overhead as you reach standing.",
    "Lower it to your shoulder and squat again.",
    "Drive up and press the left dumbbell; one press on each side is one rep."
  ],
  "Dumbbell alternating Z press": [
    "Sit on the floor with your legs straight and slightly apart, torso upright, both dumbbells at shoulder height.",
    "Press the right dumbbell straight overhead until your arm is locked out.",
    "Lower it back to your shoulder.",
    "Press the left dumbbell overhead the same way.",
    "Lower it; one press on each side is one rep."
  ],
  "Dumbbell bent-arm lateral raise": [
    "Stand tall with a dumbbell in each hand, elbows bent 90 degrees and tucked against your sides, forearms pointing forward.",
    "Raise both elbows out to the sides, keeping the 90-degree bend.",
    "Stop when your upper arms are level with your shoulders and your forearms are parallel to the floor.",
    "Pause for a moment at the top.",
    "Lower your elbows slowly back to your sides."
  ],
  "Dumbbell bench wrist curl": [
    "Kneel beside a flat bench and rest both forearms across it, palms up, wrists just past the far edge.",
    "Hold a dumbbell in each hand and let your wrists bend down.",
    "Curl your wrists up as far as they go.",
    "Squeeze your forearms for a moment at the top.",
    "Lower slowly back to the stretched position."
  ],
  "Dumbbell bench wrist extension": [
    "Kneel beside a flat bench and rest both forearms across it, palms down, wrists just past the far edge.",
    "Hold a dumbbell in each hand and let your wrists bend down.",
    "Lift your knuckles up as high as they go, forearms flat on the bench.",
    "Pause for a moment at the top.",
    "Lower slowly until your knuckles point at the floor."
  ],
  "Dumbbell box squat": [
    "Stand just in front of a low box with a dumbbell in each hand at your sides.",
    "Push your hips back and bend your knees.",
    "Lower until you sit lightly on the box, chest up.",
    "Pause briefly without relaxing.",
    "Drive through your feet and stand tall."
  ],
  "Dumbbell clean and press": [
    "Stand with feet shoulder-width apart, hinge at the hips with a flat back and let the dumbbells hang just below your knees.",
    "Drive your hips forward and pull the dumbbells up close to your body.",
    "Catch them at your shoulders, palms facing each other.",
    "Press both dumbbells overhead until your arms are locked out.",
    "Lower them to your shoulders, then back down to the start."
  ],
  "Dumbbell cossack squat": [
    "Stand in a very wide stance holding one dumbbell upright against your chest with both hands.",
    "Shift your weight to the right and bend your right knee.",
    "Sit into a deep side squat over your right heel, left leg straight with the toes up.",
    "Push through your right foot to return to the middle.",
    "Repeat for all reps, then switch sides."
  ],
  "Dumbbell crunch": [
    "Lie on your back with knees bent and feet flat, holding one dumbbell against your upper chest.",
    "Tighten your abs and lift your head and shoulders off the floor.",
    "Curl up until your shoulder blades are off the floor.",
    "Squeeze your abs for a moment.",
    "Lower slowly back to the floor."
  ],
  "Dumbbell Cuban press": [
    "Stand tall with a dumbbell in each hand and lift your elbows out to the sides to shoulder height, forearms hanging down.",
    "Keeping your upper arms still, rotate your forearms up until they point at the ceiling.",
    "Press both dumbbells straight overhead.",
    "Lower them back to the goalpost position.",
    "Rotate your forearms down again and lower your arms."
  ],
  "Dumbbell curtsy deficit lunge": [
    "Stand on a low platform with a dumbbell in each hand at your sides.",
    "Reach your right foot back and across behind your left leg, down to the floor.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left heel to stand back up on the platform.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell decline guillotine bench press": [
    "Lie on a decline bench with your feet hooked and hold the dumbbells straight up above your collarbones.",
    "Flare your elbows out to the sides at 90 degrees from your torso.",
    "Lower the dumbbells slowly toward the sides of your neck and collarbones.",
    "Stop when your elbows are level with your shoulders.",
    "Press back up along the same path."
  ],
  "Dumbbell decline neutral bench press": [
    "Lie on a decline bench with your feet hooked and hold the dumbbells beside your lower chest, palms facing each other.",
    "Keep your elbows tucked close to your ribs.",
    "Press both dumbbells up until your arms are straight.",
    "Pause briefly at the top.",
    "Lower slowly back to the sides of your lower chest."
  ],
  "Dumbbell decline single-arm bench press": [
    "Lie on a decline bench with your feet hooked, one dumbbell in your right hand beside your chest and your left hand on your stomach.",
    "Brace your abs and keep your shoulders level.",
    "Press the dumbbell up until your right arm is straight.",
    "Lower it slowly to the side of your chest.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell decline skull crusher": [
    "Lie on a decline bench with your feet hooked and hold the dumbbells straight up above your shoulders, palms facing each other.",
    "Keeping your upper arms still, bend your elbows.",
    "Lower the dumbbells until they are beside your ears.",
    "Straighten your elbows to press the dumbbells back up.",
    "Squeeze your triceps at the top."
  ],
  "Dumbbell decline squeeze press": [
    "Lie on a decline bench with your feet hooked and hold the dumbbells on your chest, palms facing each other and the dumbbells pressed together.",
    "Squeeze the dumbbells against each other.",
    "Press them up until your arms are straight, still squeezing.",
    "Pause briefly at the top.",
    "Lower slowly to your chest without letting them separate."
  ],
  "Dumbbell deficit reverse lunge": [
    "Stand on a low platform with a dumbbell in each hand at your sides.",
    "Step your right foot straight back and down onto the floor.",
    "Bend both knees until your left thigh is below parallel and your right knee is just above the floor.",
    "Push through your left foot to bring your right foot back onto the platform.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell drag curl": [
    "Stand tall with a dumbbell in each hand against the front of your thighs, palms facing forward.",
    "Pull your elbows back behind your body and slide the dumbbells up along your torso.",
    "Continue until the dumbbells reach your lower chest.",
    "Squeeze your biceps for a moment.",
    "Lower them slowly along your body until your arms are straight."
  ],
  "Dumbbell elbow side plank": [
    "Lie on your right side with your legs straight and feet stacked, right forearm on the floor with the elbow under your shoulder.",
    "Rest one dumbbell on your top hip and hold it there with your left hand.",
    "Lift your hips until your body forms a straight line.",
    "Hold the position, keeping your hips high.",
    "Lower your hips, then repeat on the other side."
  ],
  "Dumbbell elevated push-up": [
    "Place two dumbbells on the floor shoulder-width apart with the handles parallel.",
    "Grip the handles and step back into a straight-body plank with your arms straight.",
    "Bend your elbows and lower your chest between the dumbbells.",
    "Go a little below the level of your hands if your shoulders allow.",
    "Push back up until your arms are straight."
  ],
  "Dumbbell feet-down Russian twist": [
    "Sit on the floor with knees bent and heels on the floor, holding one dumbbell by its ends in front of your chest.",
    "Lean back about 45 degrees with a straight back.",
    "Rotate your torso to the right and bring the dumbbell beside your right hip.",
    "Rotate to the left and bring it beside your left hip.",
    "Keep alternating; one twist to each side is one rep."
  ],
  "Dumbbell feet-elevated glute bridge": [
    "Lie on your back with both heels on a bench, knees bent about 90 degrees, and one dumbbell across your hips.",
    "Hold the dumbbell in place with both hands.",
    "Push through your heels and lift your hips until your knees, hips and shoulders form a straight line.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips slowly to the floor."
  ],
  "Dumbbell feet-elevated single-leg glute bridge": [
    "Lie on your back with your left heel on a bench, left knee bent about 90 degrees, and one dumbbell across your hips.",
    "Lift your right leg straight up and keep it there.",
    "Push through your left heel and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell feet-elevated figure-four glute bridge": [
    "Lie on your back with your left heel on a bench and your left knee bent about 90 degrees.",
    "Cross your right ankle over your left knee and rest one dumbbell across your hips.",
    "Push through your left heel and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell feet-elevated staggered glute bridge": [
    "Lie on your back with both feet on a bench: left foot flat and close to your hips, right heel further away.",
    "Rest one dumbbell across your hips and hold it with both hands.",
    "Push mainly through your left foot and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glutes for a moment at the top.",
    "Lower slowly, finish all reps, then switch the foot positions."
  ],
  "Dumbbell figure-four glute bridge": [
    "Lie on your back with your left knee bent and your left foot flat on the floor.",
    "Cross your right ankle over your left knee and rest one dumbbell across your hips.",
    "Push through your left heel and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell figure-four hip thrust": [
    "Sit on the floor with your upper back against the side of a bench, left foot flat on the floor.",
    "Cross your right ankle over your left knee and hold one dumbbell on your hips.",
    "Push through your left heel and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell figure-four heels-elevated hip thrust": [
    "Sit on the floor with your upper back against the side of a bench and your left heel on a low platform.",
    "Cross your right ankle over your left knee and hold one dumbbell on your hips.",
    "Push through your left heel and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell heels-elevated hip thrust": [
    "Sit on the floor with your upper back against the side of a bench and both heels on a low platform.",
    "Hold one dumbbell on your hips with both hands.",
    "Push through your heels and raise your hips until your torso and thighs are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips slowly toward the floor."
  ],
  "Dumbbell single-leg heels-elevated hip thrust": [
    "Sit on the floor with your upper back against the side of a bench and your left heel on a low platform.",
    "Lift your right leg off the floor and hold one dumbbell on your hips.",
    "Push through your left heel and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell staggered hip thrust": [
    "Sit on the floor with your upper back against the side of a bench, left foot flat under your knee and right heel a foot-length further forward.",
    "Hold one dumbbell on your hips with both hands.",
    "Push mainly through your left foot and raise your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower slowly, finish all reps, then switch the foot positions."
  ],
  "Dumbbell glute bridge": [
    "Lie on your back with knees bent and feet flat, one dumbbell resting across your hips.",
    "Hold the dumbbell in place with both hands.",
    "Push through your heels and lift your hips until your knees, hips and shoulders form a straight line.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips slowly to the floor."
  ],
  "Dumbbell single-leg glute bridge": [
    "Lie on your back with your left knee bent and foot flat, one dumbbell resting across your hips.",
    "Lift your right leg straight out in line with your left thigh.",
    "Push through your left heel and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glute for a moment at the top.",
    "Lower slowly, finish all reps, then switch legs."
  ],
  "Dumbbell staggered glute bridge": [
    "Lie on your back with knees bent: left foot flat and close to your hips, right heel a foot-length further away.",
    "Rest one dumbbell across your hips and hold it with both hands.",
    "Push mainly through your left foot and lift your hips until your left knee, hips and shoulders form a straight line.",
    "Squeeze your glutes for a moment at the top.",
    "Lower slowly, finish all reps, then switch the foot positions."
  ],
  "Dumbbell flat preacher curl": [
    "Sit at a preacher bench with the arm pad set flat and rest both upper arms on it, palms up, a dumbbell in each hand.",
    "Start with your arms almost straight along the pad.",
    "Curl the dumbbells up until your forearms are vertical.",
    "Squeeze your biceps for a moment.",
    "Lower slowly until your arms are almost straight again."
  ],
  "Dumbbell floor fly": [
    "Lie on your back on the floor with knees bent and hold the dumbbells straight up above your chest, palms facing each other.",
    "Bend your elbows slightly and keep that bend.",
    "Open your arms out to the sides until your upper arms rest lightly on the floor.",
    "Squeeze your chest and bring the dumbbells back together above it.",
    "Pause briefly at the top before the next rep."
  ],
  "Dumbbell front rack cossack squat": [
    "Stand in a very wide stance with a dumbbell at each shoulder, palms facing each other.",
    "Shift your weight to the right and bend your right knee.",
    "Sit into a deep side squat over your right heel, left leg straight with the toes up.",
    "Push through your right foot to return to the middle.",
    "Repeat for all reps, then switch sides."
  ],
  "Dumbbell front rack curtsy deficit lunge": [
    "Stand on a low platform with a dumbbell at each shoulder, palms facing each other.",
    "Reach your right foot back and across behind your left leg, down to the floor.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left heel to stand back up on the platform.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell front rack deficit reverse lunge": [
    "Stand on a low platform with a dumbbell at each shoulder, palms facing each other.",
    "Step your right foot straight back and down onto the floor.",
    "Bend both knees until your left thigh is below parallel and your right knee is just above the floor.",
    "Push through your left foot to bring your right foot back onto the platform.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell front rack step-up": [
    "Stand facing a knee-high box with a dumbbell at each shoulder, palms facing each other.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Bring your right foot up beside the left.",
    "Step down with your right foot under control, finish all reps, then switch legs."
  ],
  "Dumbbell front rack step-up knee drive": [
    "Stand facing a knee-high box with a dumbbell at each shoulder, palms facing each other.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch legs."
  ],
  "Dumbbell full front raise": [
    "Stand tall with a dumbbell in each hand in front of your thighs, palms facing down.",
    "Raise both straight arms forward to shoulder height.",
    "Keep going until your arms are vertical overhead.",
    "Pause briefly with your biceps beside your ears.",
    "Lower slowly along the same arc to your thighs."
  ],
  "Dumbbell full lateral raise": [
    "Stand tall with a dumbbell in each hand at your sides.",
    "Raise both straight arms out to the sides to shoulder height.",
    "Keep going until your arms are vertical and the dumbbells are close together overhead.",
    "Pause briefly at the top.",
    "Lower slowly along the same arc to your sides."
  ],
  "Dumbbell goblet alternating curtsy lunge": [
    "Stand tall with feet hip-width apart, holding one dumbbell upright against your chest.",
    "Step your right foot back and across behind your left leg.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left heel to return to standing.",
    "Repeat with the left foot; one lunge on each side is one rep."
  ],
  "Dumbbell goblet Bulgarian split squat": [
    "Stand in front of a flat bench holding one dumbbell upright against your chest.",
    "Rest the top of your right foot on the bench behind you, left foot well in front.",
    "Bend your left knee and lower until your left thigh is parallel to the floor.",
    "Push through your left foot to stand back up.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell goblet cossack squat": [
    "Stand in a very wide stance holding one dumbbell upright against your chest.",
    "Shift your weight to the left and bend your left knee.",
    "Sit into a deep side squat over your left heel, right leg straight with the toes up.",
    "Push through your left foot to return to the middle.",
    "Repeat for all reps, then switch sides."
  ],
  "Dumbbell goblet curtsy deficit lunge": [
    "Stand on a low platform holding one dumbbell upright against your chest.",
    "Reach your right foot back and across behind your left leg, down to the floor.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left heel to stand back up on the platform.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell goblet curtsy lunge": [
    "Stand tall with feet hip-width apart, holding one dumbbell upright against your chest.",
    "Step your right foot back and across behind your left leg.",
    "Bend both knees until your right knee is just above the floor behind your left heel.",
    "Push through your left heel to return to standing.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell goblet deficit reverse lunge": [
    "Stand on a low platform holding one dumbbell upright against your chest.",
    "Step your right foot straight back and down onto the floor.",
    "Bend both knees until your left thigh is below parallel and your right knee is just above the floor.",
    "Push through your left foot to bring your right foot back onto the platform.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell goblet forward lunge": [
    "Stand tall with feet together, holding one dumbbell upright against your chest.",
    "Step forward with your right foot and bend both knees.",
    "Lower until your right thigh is parallel to the floor and your left knee is just above it.",
    "Push through your right foot to step back to the start.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell goblet good morning": [
    "Stand with feet hip-width apart, knees slightly bent, holding one dumbbell upright against your chest.",
    "Push your hips back and lean your torso forward with a flat back.",
    "Lower until your torso is almost parallel to the floor.",
    "Drive your hips forward to stand back up.",
    "Squeeze your glutes at the top."
  ],
  "Dumbbell goblet lateral lunge": [
    "Stand tall with feet together, holding one dumbbell upright against your chest.",
    "Step wide to the right with your right foot.",
    "Sit your hips back over your bent right knee, left leg straight.",
    "Push off your right foot to return to the start.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell goblet reverse lunge": [
    "Stand tall with feet together, holding one dumbbell upright against your chest.",
    "Step straight back with your right foot and bend both knees.",
    "Lower until your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to bring the right foot back to the start.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell goblet side step-up": [
    "Stand sideways beside a knee-high box, holding one dumbbell upright against your chest.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and rise straight up until it is straight.",
    "Bring your right foot up beside the left.",
    "Lower your right foot to the floor under control, finish all reps, then switch sides."
  ],
  "Dumbbell goblet split squat": [
    "Stand in a split stance, left foot forward and right foot back on its toes, holding one dumbbell upright against your chest.",
    "Bend both knees and lower straight down.",
    "Stop when your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to straighten both legs.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell goblet step-up": [
    "Stand facing a knee-high box, holding one dumbbell upright against your chest.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Bring your right foot up beside the left.",
    "Step down with your right foot under control, finish all reps, then switch legs."
  ],
  "Dumbbell guillotine bench press": [
    "Lie on a flat bench and hold the dumbbells straight up above your collarbones.",
    "Flare your elbows out to the sides at 90 degrees from your torso.",
    "Lower the dumbbells slowly toward the sides of your neck and collarbones.",
    "Stop when your elbows are level with your shoulders.",
    "Press back up along the same path."
  ],
  "Dumbbell guillotine incline bench press": [
    "Lie back on a bench set at about 30 degrees and hold the dumbbells straight up above your collarbones.",
    "Flare your elbows out to the sides at 90 degrees from your torso.",
    "Lower the dumbbells slowly toward the sides of your collarbones.",
    "Stop when your elbows are level with your shoulders.",
    "Press back up along the same path."
  ],
  "Dumbbell half-kneeling goblet Romanian deadlift": [
    "Kneel on your right knee with your left foot flat in front, holding one dumbbell upright against your chest.",
    "Push your hips back toward your right heel.",
    "Tip your torso forward with a flat back until it is almost parallel to the floor.",
    "Squeeze your glutes and bring your hips forward to return upright.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell half-kneeling Romanian deadlift": [
    "Kneel on your right knee with your left foot flat in front, a dumbbell in each hand at your sides.",
    "Push your hips back toward your right heel.",
    "Tip your torso forward with a flat back and lower the dumbbells on either side of your left foot.",
    "Squeeze your glutes and bring your hips forward to return upright.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell half-kneeling overhead press": [
    "Kneel on your right knee with your left foot flat in front and hold both dumbbells at shoulder height, palms facing forward.",
    "Squeeze your glutes and brace your abs.",
    "Press both dumbbells overhead until your arms are straight.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell half-kneeling single-arm overhead press": [
    "Kneel on your right knee with your left foot flat in front and hold one dumbbell at your right shoulder, left hand on your hip.",
    "Squeeze your glutes and brace your abs.",
    "Press the dumbbell overhead until your right arm is straight.",
    "Lower it slowly back to your shoulder.",
    "Finish all reps, then switch sides and the kneeling leg."
  ],
  "Dumbbell half-kneeling wood chopper": [
    "Kneel on your right knee with your left foot flat in front, holding one dumbbell by its ends beside your right hip.",
    "Rotate your torso and lift the dumbbell diagonally across your body.",
    "Finish with the dumbbell high above your left shoulder, arms nearly straight.",
    "Lower it along the same diagonal to your right hip.",
    "Finish all reps, then switch sides and the kneeling leg."
  ],
  "Dumbbell bench-braced flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold a dumbbell in each hand, palms up.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell bench-braced hammer flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold a dumbbell in each hand, palms facing in.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell bench-braced reverse flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold a dumbbell in each hand, palms down.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell bench-braced incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold a dumbbell in each hand, palms up.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell bench-braced hammer incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold a dumbbell in each hand, palms facing in.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell bench-braced reverse incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold a dumbbell in each hand, palms down.",
    "Straighten your elbows fully, keeping your upper arms on the bench.",
    "Curl both dumbbells up to your shoulders.",
    "Lower slowly until your arms are straight again."
  ],
  "Dumbbell single-arm bench-braced flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold one dumbbell in your right hand, palms up, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench-braced hammer flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold one dumbbell in your right hand, palms facing in, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench-braced reverse flat curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lift your hips until your torso is level.",
    "Hold one dumbbell in your right hand, palms down, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench-braced incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold one dumbbell in your right hand, palms up, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench-braced hammer incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold one dumbbell in your right hand, palms facing in, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench-braced reverse incline curl": [
    "Sit on the floor with your upper back and the backs of your upper arms against the side of a flat bench, feet flat, then lower your hips close to the floor.",
    "Hold one dumbbell in your right hand, palms down, and rest your left hand on your stomach.",
    "Straighten your right elbow fully, keeping the upper arm on the bench.",
    "Curl the dumbbell up to your shoulder.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell bench-braced single-arm overhead tricep extension": [
    "Lie on your left side against a bench set at about 45 degrees and hold the top of the backrest with your left arm.",
    "Hold one dumbbell in your right hand and press the back of your right elbow against the top of the backrest, upper arm pointing up.",
    "Bend your elbow and lower the dumbbell behind your head.",
    "Straighten your elbow until the dumbbell points at the ceiling.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell Bayesian lateral raise": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand.",
    "Let your arms hang straight down on either side of the bench.",
    "Raise both arms out to the sides, keeping them straight.",
    "Stop when your arms are about parallel to the floor.",
    "Lower slowly until your arms hang freely again."
  ],
  "Dumbbell standing Bayesian lateral raise": [
    "Stand with feet hip-width apart, a dumbbell in each hand, and lean your torso slightly forward with a flat back.",
    "Let your arms hang straight down.",
    "Raise both arms out to the sides, keeping them straight.",
    "Stop when your arms are about parallel to the floor.",
    "Lower slowly without changing your torso angle."
  ],
  "Dumbbell cross-body Romanian deadlift": [
    "Stand with feet shoulder-width apart, holding one dumbbell in your right hand in front of your thigh.",
    "Push your hips back, keeping your knees almost straight and your back flat.",
    "Reach the dumbbell diagonally down toward your left shin.",
    "Push your hips forward to stand back up.",
    "Finish all reps, then switch hands and reach toward the right leg."
  ],
  "Dumbbell hand side plank": [
    "Lie on your right side with your legs straight and feet stacked, right hand on the floor under your shoulder.",
    "Rest one dumbbell on your top hip and hold it there with your left hand.",
    "Straighten your right arm and lift your hips until your body forms a straight line.",
    "Hold the position, keeping your hips high.",
    "Lower your hips, then repeat on the other side."
  ],
  "Dumbbell side plank up-down": [
    "Lie on your right side with your feet stacked and your right forearm on the floor, elbow under your shoulder, one dumbbell on your top hip.",
    "Lift your hips until your body forms a straight line.",
    "Lower your hips until they almost touch the floor.",
    "Lift them back up, a little higher than a straight line.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell incline skullover": [
    "Lie back on a bench set at about 30 degrees and hold the dumbbells straight up above your shoulders, palms facing each other.",
    "Bend your elbows fully, keeping your upper arms still.",
    "Let your upper arms tip back beside your head until you feel a stretch in your triceps.",
    "Bring your upper arms back until your elbows point at the ceiling.",
    "Straighten your elbows to press the dumbbells up."
  ],
  "Dumbbell high incline skullover": [
    "Lie back on a bench set at about 60 degrees and hold the dumbbells straight up above your shoulders, palms facing each other.",
    "Bend your elbows fully, keeping your upper arms still.",
    "Let your upper arms tip back beside your head until you feel a stretch in your triceps.",
    "Bring your upper arms back until your elbows point at the ceiling.",
    "Straighten your elbows to press the dumbbells up."
  ],
  "Dumbbell rolling tricep extension": [
    "Lie on a flat bench and hold the dumbbells straight up above your shoulders, palms facing each other.",
    "Bend your elbows fully, keeping your upper arms still.",
    "Let your upper arms roll back beside your head until you feel a stretch in your triceps.",
    "Bring your upper arms back until your elbows point at the ceiling.",
    "Straighten your elbows to press the dumbbells up."
  ],
  "Dumbbell knee lawnmower row": [
    "Stand in a staggered stance with your left foot forward and your left hand on your left knee, a dumbbell in your right hand.",
    "Hinge forward with a flat back and let the dumbbell hang below your shoulder, palm facing back.",
    "Pull the dumbbell up, rotating your hand as it rises.",
    "Finish with your upper arm against your side and your palm facing forward.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Dumbbell single-arm row knee": [
    "Stand in a staggered stance with your left foot forward and rest your left elbow on your left thigh.",
    "Hold a dumbbell in your right hand with your palm facing inward and let it hang straight down.",
    "Pull the dumbbell up toward your lower ribs, elbow close to your body.",
    "Squeeze your back for a moment at the top.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Dumbbell kneeling single-arm row": [
    "Place your left knee and left hand on a flat bench, right foot on the floor, back flat.",
    "Hold a dumbbell in your right hand and let it hang straight down.",
    "Pull the dumbbell up to your lower ribs, elbow pointing at the ceiling.",
    "Squeeze your back for a moment at the top.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Dumbbell row bilateral": [
    "Hold a dumbbell in each hand and hinge forward at the hips with a flat back.",
    "Let your arms hang straight down below your shoulders, palms facing each other.",
    "Pull both dumbbells up to your lower ribs, elbows pointing at the ceiling.",
    "Squeeze your back for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell supinated row": [
    "Hold a dumbbell in each hand and hinge forward at the hips with a flat back.",
    "Let your arms hang straight down with your palms facing forward.",
    "Pull both dumbbells up toward your waist, elbows close to your ribs.",
    "Squeeze your back for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell lateral lunge reach": [
    "Stand tall with feet together, holding one dumbbell by its ends against your chest.",
    "Take a large step to the right and bend your right knee, left leg straight.",
    "Lower until your right thigh is parallel to the floor while reaching the dumbbell toward the floor in front of your right foot.",
    "Push through your right heel to return to the start.",
    "Repeat on the left; one lunge on each side is one rep."
  ],
  "Dumbbell laying curl": [
    "Lie on your back on a flat bench with a dumbbell in each hand, palms up, upper arms beside your torso.",
    "Start with your elbows bent and the dumbbells pointing at the ceiling.",
    "Lower the dumbbells toward your sides until your elbows are fully straight.",
    "Curl them back up without moving your upper arms.",
    "Squeeze your biceps at the top."
  ],
  "Dumbbell offset squat": [
    "Stand with feet shoulder-width apart and hold one dumbbell on top of your right shoulder.",
    "Brace your abs and keep your shoulders level.",
    "Push your hips back and squat until your thighs are parallel to the floor.",
    "Drive through your feet to stand back up without twisting.",
    "Finish all reps, then move the dumbbell to the other shoulder."
  ],
  "Dumbbell plank pull-through": [
    "Get into a high plank with your feet wide and one dumbbell on the floor just outside your right hand.",
    "Reach under your chest with your left hand and grip the dumbbell.",
    "Pull it across to the floor outside your left side and put your left hand back down.",
    "Reach under with your right hand and pull it back to the right.",
    "Keep alternating; one pull to each side is one rep."
  ],
  "Dumbbell Y press": [
    "Stand tall and hold a dumbbell in each hand at shoulder level, palms facing each other.",
    "Keep your elbows bent and close to your body.",
    "Press the dumbbells up and outward until your arms are straight in a Y shape.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell seated Y press": [
    "Sit on a bench with an upright back support and hold a dumbbell in each hand at shoulder level, palms facing each other.",
    "Keep your elbows bent and close to your body.",
    "Press the dumbbells up and outward until your arms are straight in a Y shape.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell six-way lateral raise": [
    "Stand tall with a dumbbell in each hand at your sides.",
    "Raise both straight arms out to the sides to shoulder height.",
    "Bring your arms together in front of you at shoulder height.",
    "Raise them straight overhead.",
    "Reverse each step: down to the front, out to the sides, then down to your sides."
  ],
  "Dumbbell standing hip abduction": [
    "Stand tall beside a post or rack and hold it with your left hand.",
    "Hold one dumbbell against the outside of your right thigh with your right hand.",
    "Lift your straight right leg out to the side as far as your hip allows.",
    "Pause briefly at the top.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Dumbbell suitcase crunch": [
    "Lie on your back with both legs straight up and hold one dumbbell by its ends above your chest, arms straight.",
    "Tighten your abs and lift your head and shoulders off the floor.",
    "Reach the dumbbell up toward your feet.",
    "Pause briefly at the top.",
    "Lower your upper back slowly to the floor."
  ],
  "Dumbbell service exercise": [
    "Stand tall with one dumbbell in your right hand at your side.",
    "Curl it across your body toward your left shoulder.",
    "Bring the dumbbell over your right shoulder, rotating your palm and elbow out so the elbow points up.",
    "Straighten your arm to press the dumbbell overhead.",
    "Lower your arm out to your side with the palm turning down, then switch sides after all reps."
  ],
  "Dumbbell hang clean and press": [
    "Stand with feet shoulder-width apart, lean forward slightly with a flat back and let the dumbbells hang just above your knees.",
    "Drive your hips forward and pull the dumbbells up close to your body.",
    "Catch them at your shoulders, palms facing each other.",
    "Press both dumbbells overhead until your arms are locked out.",
    "Lower them to your shoulders, then back to the hang."
  ],
  "Dumbbell head-on-bench rear delt fly": [
    "Stand behind an incline bench with a dumbbell in each hand, bend your knees and hinge forward.",
    "Rest your forehead on the top of the bench, dumbbells together under your chest.",
    "Raise both arms out to the sides to shoulder height, elbows slightly bent.",
    "Pause at the top.",
    "Lower slowly to the start."
  ],
  "Dumbbell heels-up narrow goblet squat": [
    "Stand with your heels on a low wedge and your feet close together, holding one dumbbell upright against your chest.",
    "Bend your knees and let them travel forward.",
    "Squat as deep as you can with an upright torso.",
    "Pause briefly at the bottom.",
    "Drive through your feet to stand back up."
  ],
  "Dumbbell high incline bench press": [
    "Lie back on a bench set at about 60 degrees with a dumbbell in each hand beside your upper chest.",
    "Plant your feet and pull your shoulder blades back.",
    "Press both dumbbells up until your arms are straight above your shoulders.",
    "Pause briefly at the top.",
    "Lower slowly to the sides of your upper chest."
  ],
  "Dumbbell hollow hold": [
    "Lie on your back holding one dumbbell by its ends, arms stretched beyond your head and legs straight.",
    "Press your lower back into the floor.",
    "Lift your shoulders, arms and legs a little off the floor.",
    "Hold the shallow curved position without letting your back arch.",
    "Lower your arms and legs to the floor to finish."
  ],
  "Dumbbell incline front raise": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand, palms facing down.",
    "Let your arms hang straight down beside the bench.",
    "Raise both straight arms forward to shoulder height.",
    "Pause briefly at the top.",
    "Lower slowly until your arms hang straight again."
  ],
  "Dumbbell incline hammer curl": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand, palms facing each other.",
    "Let your arms hang straight down toward the floor.",
    "Curl both dumbbells up, thumbs on top, without moving your upper arms.",
    "Squeeze at the top with the dumbbells in front of your shoulders.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell incline reverse curl": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand in an overhand grip, palms facing back.",
    "Let your arms hang straight down toward the floor.",
    "Curl both dumbbells up, knuckles on top, without moving your upper arms.",
    "Squeeze at the top with the dumbbells in front of your shoulders.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell incline skull crusher": [
    "Lie back on a bench set at about 30 degrees and hold the dumbbells straight up, palms facing each other.",
    "Keeping your upper arms still, bend your elbows.",
    "Lower the dumbbells until they are beside your ears.",
    "Straighten your elbows to press the dumbbells back up.",
    "Squeeze your triceps at the top."
  ],
  "Dumbbell incline twisting curl": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand, palms facing each other.",
    "Let your arms hang straight down toward the floor.",
    "Curl both dumbbells up, turning your palms upward as they rise.",
    "Finish with the dumbbells in front of your shoulders, palms facing them.",
    "Lower slowly, turning your palms back in."
  ],
  "Dumbbell incline Zottman curl": [
    "Lie back on a bench set at about 45 degrees with a dumbbell in each hand, palms facing forward.",
    "Curl both dumbbells up to your shoulders with your palms up.",
    "At the top, turn your hands over so your palms face down.",
    "Lower slowly with your palms down until your arms are straight.",
    "Turn your palms forward again for the next rep."
  ],
  "Dumbbell internally rotated chest fly": [
    "Lie on a flat bench and hold the dumbbells above your chest in an overhand grip, palms facing your feet.",
    "Bend your elbows slightly and keep that bend.",
    "Open your arms out to the sides, palms still facing your feet.",
    "Stop before the dumbbells go behind your body.",
    "Squeeze your chest and bring the dumbbells back together at the top."
  ],
  "Dumbbell internally rotated floor fly": [
    "Lie on your back on the floor with knees bent and hold the dumbbells above your chest in an overhand grip, palms facing your feet.",
    "Bend your elbows slightly and keep that bend.",
    "Open your arms out to the sides, palms still facing your feet.",
    "Stop before the dumbbells go behind your body.",
    "Squeeze your chest and bring the dumbbells back together at the top."
  ],
  "Dumbbell internally rotated incline chest fly": [
    "Lie back on a bench set at about 30 degrees and hold the dumbbells above your chest in an overhand grip, palms facing your feet.",
    "Bend your elbows slightly and keep that bend.",
    "Open your arms out to the sides, palms still facing your feet.",
    "Stop before the dumbbells go behind your body.",
    "Squeeze your chest and bring the dumbbells back together at the top."
  ],
  "Dumbbell internally rotated rear delt fly": [
    "Hold a dumbbell in each hand and hinge forward with a flat back until your torso is almost parallel to the floor.",
    "Let your arms hang under your chest in an overhand grip, thumbs pointing toward each other.",
    "Raise both arms out to the sides to shoulder height, thumbs pointing down.",
    "Pause briefly at the top.",
    "Lower slowly to the start."
  ],
  "Dumbbell internally rotated single-arm floor fly": [
    "Lie on your back on the floor with knees bent, one dumbbell in your right hand above your chest, palm facing your feet.",
    "Rest your left hand on your stomach.",
    "Open your right arm out to the side until the upper arm rests lightly on the floor.",
    "Squeeze your chest and bring the dumbbell back above it.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell kickstand squat": [
    "Stand with feet hip-width apart, holding one dumbbell upright against your chest.",
    "Slide your right foot back until its toes are level with your left heel, right heel lifted.",
    "Push your hips back and squat until your left thigh is parallel to the floor.",
    "Drive through your left foot to stand back up.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell kneeling wood chopper": [
    "Kneel on both knees with your hips straight, holding one dumbbell by its ends beside your right hip.",
    "Rotate your torso and lift the dumbbell diagonally across your body.",
    "Finish with the dumbbell high above your left shoulder, arms nearly straight.",
    "Lower it along the same diagonal to your right hip.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell Larsen press": [
    "Lie on a flat bench with a dumbbell in each hand beside your chest.",
    "Lift both legs and hold them straight out, level with the bench.",
    "Press both dumbbells up until your arms are straight.",
    "Lower slowly to the sides of your chest.",
    "Keep your legs off the floor until the set is done."
  ],
  "Dumbbell laying 30-degree shrug": [
    "Lie on your left side against a bench set at about 30 degrees and hold the bench with your left hand.",
    "Hold one dumbbell in your right hand and let the straight arm hang down across your body.",
    "Pull your right shoulder blade back and up toward the ceiling without bending your elbow.",
    "Pause briefly at the top.",
    "Let the shoulder drop forward slowly, finish all reps, then switch sides."
  ],
  "Dumbbell laying incline lateral raise": [
    "Lie on your left side against a bench set at about 45 degrees and hold the bench with your left hand.",
    "Hold one dumbbell in your right hand, arm almost straight, hanging across the front of your body.",
    "Raise your right arm out and up, keeping the elbow almost straight.",
    "Stop when the dumbbell points at the ceiling.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Dumbbell laying reverse fly": [
    "Lie face down on a bench set at a low incline, about 15 to 30 degrees, with a dumbbell in each hand.",
    "Let your arms hang straight down with your palms facing each other.",
    "Raise both arms out to the sides to shoulder height, elbows slightly bent.",
    "Pause at the top and squeeze your shoulder blades together.",
    "Lower slowly to the start."
  ],
  "Dumbbell laying reverse fly internally rotated": [
    "Lie face down on a bench set at a low incline, about 15 to 30 degrees, with a dumbbell in each hand.",
    "Let your arms hang straight down in an overhand grip, thumbs pointing toward each other.",
    "Raise both arms out to the sides to shoulder height, elbows slightly bent.",
    "Pause at the top and squeeze your shoulder blades together.",
    "Lower slowly to the start."
  ],
  "Dumbbell laying row": [
    "Lie face down on a bench with a dumbbell in each hand hanging beneath your shoulders.",
    "Keep your chest supported and your neck in line with your back.",
    "Pull your elbows up and back until the dumbbells are beside the bench.",
    "Squeeze your shoulder blades together at the top.",
    "Lower slowly until your arms are fully straight."
  ],
  "Dumbbell laying silverback shrug": [
    "Lie face down on a bench set at about 45 degrees with a dumbbell in each hand.",
    "Let your arms hang straight down and your shoulders drop forward.",
    "Pull your shoulder blades back toward the ceiling without bending your elbows.",
    "Pause at the top.",
    "Let your shoulders drop forward again slowly."
  ],
  "Dumbbell leg curl": [
    "Lie face down on a flat bench with your knees at the end and hold the front of the bench.",
    "Squeeze one dumbbell upright between the arches of your feet.",
    "Bend your knees and raise the dumbbell until the soles of your shoes face the ceiling.",
    "Squeeze your hamstrings for a moment.",
    "Lower slowly until your legs are straight."
  ],
  "Dumbbell leg extension": [
    "Sit on the end of a tall bench so your lower legs hang down, and hold the bench behind your hips.",
    "Squeeze one dumbbell upright between the arches of your feet.",
    "Straighten your knees until your legs are parallel to the floor.",
    "Squeeze your quads for a moment.",
    "Lower slowly until your knees are bent 90 degrees."
  ],
  "Dumbbell long-lever Russian twist": [
    "Sit on the floor with knees bent and feet flat, holding one dumbbell by its ends with your arms straight out in front.",
    "Lean back about 45 degrees with a straight back.",
    "Rotate your torso to the right, bringing the dumbbell toward the floor on that side.",
    "Return to the center, then rotate to the left.",
    "Keep alternating; one twist to each side is one rep."
  ],
  "Dumbbell neutral alternating overhead press": [
    "Stand with feet shoulder-width apart and hold both dumbbells in front of your shoulders, palms facing each other.",
    "Press the right dumbbell straight overhead until your arm is locked out.",
    "Lower it back to your shoulder.",
    "Press the left dumbbell overhead the same way.",
    "Lower it; one press on each side is one rep."
  ],
  "Dumbbell neutral high incline bench press": [
    "Lie back on a bench set at about 60 degrees with a dumbbell in each hand beside your upper chest, palms facing each other.",
    "Keep your elbows tucked close to your ribs.",
    "Press both dumbbells up until your arms are straight above your shoulders.",
    "Pause briefly at the top.",
    "Lower slowly to the sides of your upper chest."
  ],
  "Dumbbell neutral incline bench press": [
    "Lie back on a bench set at about 30 degrees with a dumbbell in each hand beside your upper chest, palms facing each other.",
    "Keep your elbows tucked close to your ribs.",
    "Press both dumbbells up until your arms are straight above your shoulders.",
    "Pause briefly at the top.",
    "Lower slowly to the sides of your upper chest."
  ],
  "Dumbbell neutral overhead press": [
    "Stand with feet shoulder-width apart and hold both dumbbells in front of your shoulders, palms facing each other.",
    "Keep your elbows pointing forward.",
    "Press both dumbbells straight overhead until your arms are locked out.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell neutral seated overhead press": [
    "Sit on a bench with an upright back support and hold both dumbbells in front of your shoulders, palms facing each other.",
    "Keep your elbows pointing forward.",
    "Press both dumbbells straight overhead until your arms are locked out.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell overhead press": [
    "Stand with feet shoulder-width apart and hold both dumbbells at shoulder height, palms facing forward.",
    "Brace your abs and squeeze your glutes.",
    "Press both dumbbells straight overhead until your arms are locked out.",
    "Pause briefly at the top.",
    "Lower slowly back to shoulder height."
  ],
  "Dumbbell overhead side bend": [
    "Stand with feet shoulder-width apart and hold one dumbbell by its ends straight overhead.",
    "Brace your abs and keep your arms beside your ears.",
    "Bend your torso to the right as far as you can without twisting.",
    "Use your side muscles to return upright.",
    "Finish all reps, then bend to the left."
  ],
  "Dumbbell overhead squat": [
    "Stand with feet shoulder-width apart and press both dumbbells overhead until your arms are locked out.",
    "Brace your abs and keep your arms vertical.",
    "Push your hips back and squat as deep as you can with your arms still straight.",
    "Pause briefly at the bottom.",
    "Drive through your feet to stand, dumbbells still overhead."
  ],
  "Dumbbell overhead tricep extension": [
    "Stand tall and hold one dumbbell upright overhead with both hands cupping its top end.",
    "Keep your upper arms beside your ears.",
    "Bend your elbows and lower the dumbbell behind your head.",
    "Stop when your elbows are fully bent.",
    "Straighten your arms to raise the dumbbell overhead again."
  ],
  "Dumbbell Pendlay row": [
    "Place two dumbbells on the floor, hinge forward until your torso is parallel to the floor and grip them.",
    "Brace your abs with your back flat and arms straight.",
    "Pull both dumbbells up to your lower ribs.",
    "Lower them back to the floor.",
    "Let them settle completely before the next rep."
  ],
  "Dumbbell preacher curl": [
    "Sit at a preacher bench with your chest against the pad and both upper arms on the sloped pad, a dumbbell in each hand.",
    "Start with your arms almost straight, palms up.",
    "Curl both dumbbells up toward your shoulders.",
    "Squeeze your biceps for a moment.",
    "Lower slowly until your arms are almost straight again."
  ],
  "Dumbbell push press": [
    "Stand with feet shoulder-width apart and hold both dumbbells at your shoulders, palms facing each other.",
    "Dip by bending your knees a little, torso upright.",
    "Drive up through your legs and press the dumbbells overhead in one motion.",
    "Lock your arms out with your legs straight.",
    "Lower the dumbbells to your shoulders and reset."
  ],
  "Dumbbell rear delt row": [
    "Hold a dumbbell in each hand and hinge forward about 45 degrees with a flat back, palms facing back.",
    "Let your arms hang straight down.",
    "Pull the dumbbells up toward your chest, elbows flaring out wide.",
    "Stop when your elbows are level with your shoulders.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell renegade row": [
    "Get into a high plank with each hand gripping a dumbbell on the floor, feet shoulder-width or wider.",
    "Brace your abs and keep your hips level.",
    "Row the right dumbbell up to your ribs, elbow close to your body.",
    "Lower it to the floor and row the left dumbbell.",
    "Keep alternating; one row on each side is one rep."
  ],
  "Dumbbell reverse curl": [
    "Stand tall with a dumbbell in each hand in front of your thighs, palms facing back.",
    "Keep your elbows pinned to your sides.",
    "Curl both dumbbells up, knuckles on top, to shoulder height.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell reverse-grip bench press": [
    "Lie on a flat bench with a dumbbell in each hand beside your lower chest, palms facing your head.",
    "Tuck your elbows close to your ribs.",
    "Press both dumbbells up until your arms are straight above your chest.",
    "Pause briefly at the top.",
    "Lower slowly to the sides of your lower chest."
  ],
  "Dumbbell Russian twist": [
    "Sit on the floor with knees bent, holding one dumbbell by its ends in front of your chest.",
    "Lean back about 45 degrees with a straight back and lift your feet a little off the floor.",
    "Rotate your torso to the right and bring the dumbbell beside your right hip.",
    "Rotate to the left and bring it beside your left hip.",
    "Keep alternating; one twist to each side is one rep."
  ],
  "Dumbbell seated Arnold press": [
    "Sit on a bench with an upright back support, holding both dumbbells in front of your shoulders, palms facing you.",
    "Swing your elbows out to the sides as you start to press, turning your palms forward.",
    "Press overhead until your arms are locked out.",
    "Pause briefly at the top.",
    "Lower slowly, turning your palms back toward you."
  ],
  "Dumbbell seated bent-arm lateral raise": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand, elbows bent 90 degrees and tucked against your sides.",
    "Raise both elbows out to the sides, keeping the 90-degree bend.",
    "Stop when your upper arms are level with your shoulders and your forearms are parallel to the floor.",
    "Pause briefly at the top.",
    "Lower your elbows slowly back to your sides."
  ],
  "Dumbbell seated curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand, palms facing forward.",
    "Let your arms hang straight down with your elbows close to your sides.",
    "Curl both dumbbells up toward your shoulders.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell seated full lateral raise": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand at your sides.",
    "Raise both straight arms out to the sides to shoulder height.",
    "Keep going until your arms are vertical overhead.",
    "Pause briefly at the top.",
    "Lower slowly along the same arc to your sides."
  ],
  "Dumbbell seated hammer curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand, palms facing each other.",
    "Let your arms hang straight down with your elbows close to your sides.",
    "Curl both dumbbells up toward your shoulders with your thumbs on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell seated overhead tricep extension": [
    "Sit on a bench with an upright back support and hold one dumbbell upright overhead with both hands cupping its top end.",
    "Keep your upper arms beside your ears.",
    "Bend your elbows and lower the dumbbell behind your head.",
    "Stop when your elbows are fully bent.",
    "Straighten your arms to raise the dumbbell overhead again."
  ],
  "Dumbbell seated rear delt row": [
    "Sit on the end of a flat bench with your feet together and fold forward with a flat back, a dumbbell in each hand.",
    "Let your arms hang straight down beside your shins, palms facing back.",
    "Pull the dumbbells up, elbows flaring out wide.",
    "Stop when your elbows are level with your shoulders.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell seated reverse curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand in an overhand grip, palms facing back.",
    "Let your arms hang straight down with your elbows close to your sides.",
    "Curl both dumbbells up to shoulder height with your knuckles on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell seated shrug": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand hanging at your sides.",
    "Let your shoulders relax and drop.",
    "Shrug your shoulders straight up as high as they go.",
    "Pause at the top.",
    "Lower slowly to the full stretch."
  ],
  "Dumbbell seated single-arm Arnold press": [
    "Sit on a bench with an upright back support, holding one dumbbell in front of your right shoulder, palm facing you.",
    "Swing your elbow out to the side as you start to press, turning your palm forward.",
    "Press overhead until your arm is locked out.",
    "Pause briefly at the top.",
    "Lower slowly, turning your palm back toward you, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand, palm facing forward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm full lateral raise": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand at your side.",
    "Raise your straight arm out to the side to shoulder height.",
    "Keep going until your arm is vertical overhead.",
    "Pause briefly at the top.",
    "Lower slowly along the same arc to your side, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm hammer curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand, palm facing inward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder with your thumb on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm lateral raise": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand at your side.",
    "Raise your arm out to the side with a slight bend in your elbow.",
    "Stop when your arm is level with your shoulder.",
    "Pause briefly at the top.",
    "Lower slowly to your side, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm reverse curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand in an overhand grip, palm facing back.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up to shoulder height with your knuckles on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell seated single-arm Zottman curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding one dumbbell in your right hand, palm facing forward.",
    "Curl the dumbbell up to your shoulder with your palm up.",
    "At the top, turn your hand over so your palm faces down.",
    "Lower slowly with your palm down until your arm is straight.",
    "Turn your palm forward again for the next rep, finish all reps, then switch arms."
  ],
  "Dumbbell seated Zottman curl": [
    "Sit on the end of a flat bench with your feet flat on the floor, holding a dumbbell in each hand, palms facing forward.",
    "Curl both dumbbells up to your shoulders with your palms up.",
    "At the top, turn your hands over so your palms face down.",
    "Lower slowly with your palms down until your arms are straight.",
    "Turn your palms forward again for the next rep."
  ],
  "Dumbbell seated tibialis raise": [
    "Sit on a bench with your knees bent 90 degrees and both heels on the edge of a low step or plate.",
    "Stand one dumbbell on each thigh just above the knee and hold them there.",
    "Let your toes drop below the level of the step.",
    "Raise your toes straight up toward the ceiling.",
    "Hold briefly, then lower slowly."
  ],
  "Dumbbell standing tibialis raise": [
    "Stand with only your heels on the edge of a low step or plate, your back lightly against a wall.",
    "Hold a dumbbell in each hand at your sides.",
    "Let your toes drop below the level of the step.",
    "Raise your toes straight up toward the ceiling.",
    "Hold briefly, then lower slowly."
  ],
  "Dumbbell shoulder extension": [
    "Stand with feet hip-width apart, a dumbbell in each hand, and lean forward slightly with a flat back.",
    "Let your arms hang straight down.",
    "Sweep both straight arms back and up behind your body.",
    "Pause when they are as high as they go.",
    "Lower slowly until your arms hang straight down."
  ],
  "Dumbbell side step-up": [
    "Stand sideways beside a box with a dumbbell in each hand at your sides.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and rise straight up until it is straight.",
    "Bring your right foot up beside the left.",
    "Lower your right foot to the floor under control, finish all reps, then switch sides."
  ],
  "Dumbbell silverback shrug": [
    "Stand with feet hip-width apart, knees slightly bent, and lean forward about 30 degrees with a dumbbell in each hand.",
    "Let your arms hang straight down and your shoulders drop forward.",
    "Pull your shoulders up and back, squeezing your shoulder blades together.",
    "Pause at the top.",
    "Lower slowly without changing your torso angle."
  ],
  "Dumbbell single-arm Arnold press": [
    "Stand tall with feet hip-width apart, holding one dumbbell in front of your right shoulder, palm facing you.",
    "Swing your elbow out to the side as you start to press, turning your palm forward.",
    "Press overhead until your arm is locked out.",
    "Pause briefly at the top.",
    "Lower slowly, turning your palm back toward you, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench wrist curl": [
    "Kneel beside a flat bench and rest your right forearm across it, palm up, wrist just past the far edge.",
    "Hold one dumbbell in your right hand and press the forearm down with your left hand.",
    "Let your wrist bend down.",
    "Curl your wrist up as far as it goes.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm bench wrist extension": [
    "Kneel beside a flat bench and rest your right forearm across it, palm down, wrist just past the far edge.",
    "Hold one dumbbell in your right hand and press the forearm down with your left hand.",
    "Let your wrist bend down.",
    "Lift your knuckles up as high as they go.",
    "Lower slowly, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm chest press": [
    "Lie on a flat bench holding one dumbbell above your chest with your right arm straight, left hand on your stomach.",
    "Keep your torso level and stable.",
    "Lower the dumbbell to the side of your chest.",
    "Press it back up until your arm is straight.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm press": [
    "Lie on a flat bench and press both dumbbells up until your arms are straight.",
    "Keep your left arm locked out for the whole set.",
    "Lower the right dumbbell to the side of your chest.",
    "Press it back up until your right arm is straight.",
    "Finish all reps, then hold the right arm up and press with the left."
  ],
  "Dumbbell alternating single-arm press": [
    "Lie on a flat bench and press both dumbbells up until your arms are straight.",
    "Keeping your left arm locked out, lower the right dumbbell to the side of your chest.",
    "Press it back up until your right arm is straight.",
    "Keeping your right arm locked out, lower the left dumbbell.",
    "Press it back up; one press on each side is one rep."
  ],
  "Dumbbell decline alternating single-arm press": [
    "Lie on a decline bench with your feet hooked and press both dumbbells up until your arms are straight.",
    "Keeping your left arm locked out, lower the right dumbbell to the side of your chest.",
    "Press it back up until your right arm is straight.",
    "Keeping your right arm locked out, lower the left dumbbell.",
    "Press it back up; one press on each side is one rep."
  ],
  "Dumbbell single-arm clean and press": [
    "Stand with feet shoulder-width apart holding one dumbbell in your right hand, then hinge at the hips with a flat back and let the dumbbell hang between your knees.",
    "Drive your hips forward and pull the dumbbell up close to your body.",
    "Catch it at your right shoulder, palm facing inward.",
    "Press the dumbbell overhead until your arm is locked out.",
    "Lower it to your shoulder, then back down; finish all reps, then switch arms."
  ],
  "Dumbbell single-arm hang clean and press": [
    "Stand with feet shoulder-width apart holding one dumbbell in your right hand, then lean forward slightly with a flat back and let the dumbbell hang just above your right knee.",
    "Drive your hips forward and pull the dumbbell up close to your body.",
    "Catch it at your right shoulder, palm facing inward.",
    "Press the dumbbell overhead until your arm is locked out.",
    "Lower it to your shoulder, then back down; finish all reps, then switch arms."
  ],
  "Dumbbell single-arm floor fly": [
    "Lie on your back on the floor with knees bent, one dumbbell in your right hand above your chest, palm facing inward.",
    "Rest your left hand on your stomach.",
    "Open your right arm out to the side until the upper arm rests lightly on the floor.",
    "Squeeze your chest and bring the dumbbell back above it.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm front rack step-up": [
    "Stand facing a knee-high box with one dumbbell at your right shoulder, palm facing inward.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Bring your right foot up beside the left.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Dumbbell single-arm front rack step-up knee drive": [
    "Stand facing a knee-high box with one dumbbell at your right shoulder, palm facing inward.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Dumbbell single-arm full lateral raise": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand at your side.",
    "Raise your straight arm out to the side to shoulder height.",
    "Keep going until your arm is vertical overhead.",
    "Pause briefly at the top.",
    "Lower slowly along the same arc to your side, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm hammer curl": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand, palm facing inward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder with your thumb on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm high incline chest press": [
    "Lie back on a bench set at about 60 degrees with one dumbbell in your right hand beside your upper chest, left hand on your stomach.",
    "Brace your abs and keep your shoulders level.",
    "Press the dumbbell up until your right arm is straight above your shoulder.",
    "Lower it slowly to the side of your upper chest.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline chest press": [
    "Lie back on a bench set at about 30 degrees with one dumbbell in your right hand beside your upper chest, left hand on your stomach.",
    "Brace your abs and keep your shoulders level.",
    "Press the dumbbell up until your right arm is straight above your shoulder.",
    "Lower it slowly to the side of your upper chest.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline curl": [
    "Lie back on a bench set at about 45 degrees, holding one dumbbell in your right hand, palm facing forward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline hammer curl": [
    "Lie back on a bench set at about 45 degrees, holding one dumbbell in your right hand, palm facing inward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder with your thumb on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline reverse curl": [
    "Lie back on a bench set at about 45 degrees, holding one dumbbell in your right hand in an overhand grip, palm facing back.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up to shoulder height with your knuckles on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline skull crusher": [
    "Lie back on a bench set at about 30 degrees and hold one dumbbell straight up in your right hand, palm facing inward.",
    "Hold the back of your right upper arm with your left hand.",
    "Bend your elbow and lower the dumbbell until it is beside your ear.",
    "Straighten your elbow to press the dumbbell back up.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm incline twisting curl": [
    "Lie back on a bench set at about 45 degrees, holding one dumbbell in your right hand, palm facing inward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up, turning your palm upward as it rises.",
    "Finish with your palm facing your shoulder and squeeze.",
    "Lower slowly, turning your palm back in, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm Larsen press": [
    "Lie on a flat bench with one dumbbell in your right hand beside your chest, left hand on your stomach.",
    "Lift both legs and hold them straight out, level with the bench.",
    "Press the dumbbell up until your right arm is straight.",
    "Lower it slowly to the side of your chest.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm lateral raise": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand at your side.",
    "Raise your arm out to the side with a slight bend in your elbow.",
    "Stop when your arm is level with your shoulder.",
    "Pause briefly at the top.",
    "Lower slowly to your side, finish all reps, then switch arms."
  ],
  "Dumbbell single-arm neutral overhead press": [
    "Stand with feet shoulder-width apart and hold one dumbbell in front of your right shoulder, palm facing inward.",
    "Rest your left hand on your hip and brace your abs.",
    "Press the dumbbell straight overhead until your arm is locked out.",
    "Lower slowly back to your shoulder.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm overhead press": [
    "Stand with feet shoulder-width apart and hold one dumbbell at your right shoulder, palm facing forward.",
    "Rest your left hand on your hip and brace your abs.",
    "Press the dumbbell straight overhead until your arm is locked out.",
    "Lower slowly back to your shoulder.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm Pendlay row": [
    "Place one dumbbell on the floor, hinge forward until your torso is parallel to the floor and rest your left hand on your left knee.",
    "Grip the dumbbell with your right hand, arm straight.",
    "Pull it up to your lower ribs.",
    "Lower it to the floor and let it settle.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm preacher curl": [
    "Sit at a preacher bench with your chest against the pad and your right upper arm on the sloped pad, one dumbbell in your right hand.",
    "Start with your arm almost straight, palm up.",
    "Curl the dumbbell up toward your shoulder.",
    "Lower slowly until your arm is almost straight again.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm pullover": [
    "Lie on your back on a flat bench with one dumbbell in your right hand above your chest, left hand on your stomach.",
    "Bend your elbow slightly and keep that bend.",
    "Lower the dumbbell back beyond your head until your arm is in line with your body.",
    "Pull it back up above your chest.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm push press": [
    "Stand with feet shoulder-width apart and hold one dumbbell at your right shoulder, palm facing inward.",
    "Dip by bending your knees a little, torso upright.",
    "Drive up through your legs and press the dumbbell overhead in one motion.",
    "Lock your arm out, then lower the dumbbell to your shoulder.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm rear delt row": [
    "Stand in a staggered stance, lean forward about 45 degrees with a flat back and rest your left hand on your left knee.",
    "Hold one dumbbell in your right hand, arm hanging straight down, palm facing back.",
    "Pull the dumbbell up toward your chest, elbow flaring out wide.",
    "Stop when your elbow is level with your shoulder, then lower slowly.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm seated overhead tricep extension": [
    "Sit on a bench with an upright back support and hold one dumbbell overhead in your right hand.",
    "Hold your right upper arm just below the elbow with your left hand.",
    "Bend your elbow and lower the dumbbell behind your neck.",
    "Straighten your arm to raise the dumbbell overhead again.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm shoulder extension": [
    "Stand in a staggered stance, lean forward about 30 degrees with a flat back and rest your left hand on your left thigh.",
    "Hold one dumbbell in your right hand, arm hanging straight down.",
    "Sweep your straight arm back and up behind your body.",
    "Pause at the top, then lower slowly.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm skull crusher": [
    "Lie on a flat bench and hold one dumbbell straight up above your right shoulder, palm facing inward.",
    "Hold the back of your right upper arm with your left hand.",
    "Bend your elbow and lower the dumbbell until it is beside your ear.",
    "Straighten your elbow to press the dumbbell back up.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm spider curl": [
    "Lie face down on a bench set at about 45 degrees and hold the bench with your left hand.",
    "Hold one dumbbell in your right hand, arm hanging straight down, palm facing forward.",
    "Curl the dumbbell up toward your shoulder without moving your upper arm.",
    "Squeeze at the top, then lower slowly.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm step-up": [
    "Stand facing a knee-high box with one dumbbell in your right hand at your side.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Bring your right foot up beside the left.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Dumbbell single-arm step-up knee drive": [
    "Stand facing a knee-high box with one dumbbell in your right hand at your side.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Dumbbell step-up knee drive": [
    "Stand facing a knee-high box with a dumbbell in each hand at your sides.",
    "Place your left foot flat on top of the box.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Dumbbell single-arm thruster": [
    "Stand with feet shoulder-width apart and hold one dumbbell at your right shoulder, palm facing inward.",
    "Squat down until your thighs are at least parallel to the floor.",
    "Drive up and press the dumbbell overhead as you reach standing.",
    "Lower the dumbbell to your shoulder and go straight into the next squat.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm upright row": [
    "Stand tall with one dumbbell in your right hand in front of your thigh, palm facing your body.",
    "Rest your left hand on your hip.",
    "Pull the dumbbell straight up along your body, elbow rising out to the side.",
    "Stop at lower-chest height, then lower slowly.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-arm Z press": [
    "Sit on the floor with your legs straight and slightly apart, torso upright, one dumbbell at your right shoulder.",
    "Rest your left hand on your left thigh.",
    "Press the dumbbell straight overhead until your arm is locked out.",
    "Lower slowly back to your shoulder.",
    "Finish all reps, then switch arms."
  ],
  "Dumbbell single-leg single-arm deadlift": [
    "Stand tall with one dumbbell in your right hand beside your thigh.",
    "Balance on your left leg and tip your torso forward as your right leg lifts straight back.",
    "Lower the dumbbell toward the floor until your torso and right leg are close to parallel with it.",
    "Push through your left heel to stand back up.",
    "Finish all reps, then switch sides."
  ],
  "Dumbbell sit-up": [
    "Lie on your back with knees bent and feet flat, holding one dumbbell against your upper chest.",
    "Tighten your abs and lift your head and shoulders.",
    "Keep rolling up until your torso is upright.",
    "Pause briefly at the top.",
    "Lower slowly back to the floor."
  ],
  "Dumbbell spinal Jefferson curl": [
    "Stand tall on a low platform with a dumbbell in each hand in front of your thighs.",
    "Tuck your chin and round your upper back forward.",
    "Keep rolling down through your spine, reaching the dumbbells toward your feet.",
    "Pause at the bottom with your legs straight.",
    "Roll back up one vertebra at a time."
  ],
  "Dumbbell split squat": [
    "Stand in a split stance, left foot forward and right foot back on its toes, a dumbbell in each hand at your sides.",
    "Bend both knees and lower straight down.",
    "Stop when your left thigh is parallel to the floor and your right knee is just above it.",
    "Push through your left foot to straighten both legs.",
    "Finish all reps, then switch legs."
  ],
  "Dumbbell squeeze press": [
    "Lie on a flat bench and hold the dumbbells on your chest, palms facing each other and the dumbbells pressed together.",
    "Squeeze the dumbbells against each other.",
    "Press them up until your arms are straight, still squeezing.",
    "Pause briefly at the top.",
    "Lower slowly to your chest without letting them separate."
  ],
  "Dumbbell staggered deadlift": [
    "Stand with your left foot flat and your right foot a foot-length behind on its toes, a dumbbell in each hand.",
    "Push your hips back and lean forward with a flat back.",
    "Lower the dumbbells along the front leg to mid-shin.",
    "Drive your hips forward to stand back up.",
    "Finish all reps, then switch the front leg."
  ],
  "Dumbbell standing single-arm curl": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand, palm facing forward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up toward your shoulder.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell standing single-arm reverse curl": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand in an overhand grip, palm facing back.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up to shoulder height with your knuckles on top.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Dumbbell standing single-arm twisting curl": [
    "Stand tall with feet hip-width apart, holding one dumbbell in your right hand, palm facing inward.",
    "Let your arm hang straight down with your elbow close to your side.",
    "Curl the dumbbell up, turning your palm upward as it rises.",
    "Finish with your palm facing your shoulder and squeeze.",
    "Lower slowly, turning your palm back in, finish all reps, then switch arms."
  ],
  "Dumbbell twisting curl": [
    "Stand tall with feet hip-width apart, holding a dumbbell in each hand, palms facing each other.",
    "Let your arms hang straight down with your elbows close to your sides.",
    "Curl both dumbbells up, turning your palms upward as they rise.",
    "Finish with your palms facing your shoulders and squeeze.",
    "Lower slowly, turning your palms back in."
  ],
  "Dumbbell swing": [
    "Stand with feet a little wider than your shoulders, gripping one end of a dumbbell with both hands.",
    "Hinge at the hips and swing the dumbbell back between your thighs.",
    "Drive your hips forward hard and let the dumbbell swing up.",
    "Stop when your arms are at chest height and you are standing tall.",
    "Let it swing back down and go straight into the next rep."
  ],
  "Dumbbell Tate press": [
    "Lie on a flat bench and hold the dumbbells straight up above your chest, palms facing your feet.",
    "Bend your elbows and let them flare out to the sides.",
    "Lower the inner ends of the dumbbells toward the middle of your chest.",
    "Touch your chest lightly.",
    "Straighten your elbows to press the dumbbells back up."
  ],
  "Dumbbell thruster": [
    "Stand with feet shoulder-width apart and hold both dumbbells at your shoulders, palms facing each other.",
    "Squat down until your thighs are at least parallel to the floor.",
    "Drive up and press both dumbbells overhead as you reach standing.",
    "Lock your arms out with your legs straight.",
    "Lower the dumbbells to your shoulders and go straight into the next squat."
  ],
  "Dumbbell upright row": [
    "Stand tall with a dumbbell in each hand in front of your thighs, palms facing your body.",
    "Pull both dumbbells straight up along your body, elbows rising out to the sides.",
    "Stop at upper-chest height with your elbows above your hands.",
    "Pause briefly at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Dumbbell wood chopper": [
    "Stand with feet wider than your shoulders, holding one dumbbell by its ends.",
    "Bend your knees and rotate to bring the dumbbell outside your right knee.",
    "Stand up and rotate, lifting the dumbbell diagonally across your body.",
    "Finish with the dumbbell high above your left shoulder, right heel lifted.",
    "Lower along the same diagonal, finish all reps, then switch sides."
  ],
  "Dumbbell Z press": [
    "Sit on the floor with your legs straight and slightly apart, torso upright, both dumbbells at shoulder height.",
    "Brace your abs and keep your chest up.",
    "Press both dumbbells straight overhead until your arms are locked out.",
    "Pause briefly at the top.",
    "Lower slowly back to your shoulders."
  ],
  "Dumbbell assisted Bulgarian split squat": [
    "Stand in front of a flat bench beside a post or rack, one dumbbell in your right hand.",
    "Rest the top of your right foot on the bench behind you and hold the post with your left hand.",
    "Bend your left knee and lower until your left thigh is parallel to the floor.",
    "Push through your left foot to stand back up.",
    "Finish all reps, then switch legs."
  ],
  "Barbell low-bar squat": [
    "Set the barbell low across your rear shoulders and grip it wide.",
    "Stand tall with your feet shoulder-width apart.",
    "Push your hips back and bend your knees, leaning your torso forward.",
    "Lower until your thighs are parallel to the floor.",
    "Drive your hips up and stand tall."
  ],
  "Barbell front squat bodybuilding": [
    "Rest the barbell across the front of your shoulders and cross your arms over it.",
    "Stand tall with your feet shoulder-width apart.",
    "Bend your knees and hips and squat straight down with your elbows high.",
    "Lower until your thighs are parallel to the floor.",
    "Push through your feet and stand back up."
  ],
  "Barbell heels-up back squat": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand with your heels on a wedge and your feet hip-width apart.",
    "Bend your knees forward and squat straight down with your torso upright.",
    "Lower until your hips are below your knees.",
    "Push through your feet and stand back up."
  ],
  "Barbell heels-up front squat": [
    "Rest the barbell across the front of your shoulders with your elbows lifted high.",
    "Stand with your heels on a wedge and your feet hip-width apart.",
    "Bend your knees forward and squat straight down with your torso upright.",
    "Lower until your hips are below your knees.",
    "Push through your feet and stand back up."
  ],
  "Barbell Zercher squat": [
    "Hold the barbell in the crooks of your elbows, tight against your stomach.",
    "Stand tall with your feet shoulder-width apart.",
    "Bend your knees and hips and squat down with your chest up.",
    "Lower until your elbows are between your knees and your thighs are parallel to the floor.",
    "Push through your feet and stand back up."
  ],
  "Barbell kickstand squat": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Place your right foot slightly behind your left, toes level with the left heel and heel lifted.",
    "Push your hips back and squat down on your left leg.",
    "Lower until your left thigh is parallel to the floor.",
    "Push through your left foot to stand, finish all reps, then switch sides."
  ],
  "Barbell cossack squat": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand in a very wide stance with your toes turned out slightly.",
    "Shift your weight to the right and bend your right knee, keeping your left leg straight.",
    "Sit as deep as you can over your right foot with your chest up.",
    "Push back to the middle and repeat to the left."
  ],
  "Barbell split squat": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Step your left foot forward and your right foot back, the back heel lifted.",
    "Bend both knees and lower your body straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise, finish all reps, then switch sides."
  ],
  "Barbell Bulgarian split squat": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand in front of a bench and rest the top of your right foot on it behind you.",
    "Bend your left knee and lower your hips straight down.",
    "Lower until your left thigh is parallel to the floor.",
    "Push through your left foot to rise, finish all reps, then switch sides."
  ],
  "Barbell landmine sissy squat": [
    "Hold the free end of a landmine barbell against your chest with both hands cupped under it.",
    "Stand tall with your feet hip-width apart.",
    "Push your knees forward and lean back, rising onto the balls of your feet.",
    "Lower until your calves meet the backs of your thighs.",
    "Straighten your knees to return to standing."
  ],
  "Barbell forward lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand tall with your feet together.",
    "Step your left foot forward and plant it flat.",
    "Bend both knees until your left thigh is parallel to the floor.",
    "Push off your left foot to step back, then repeat with the right leg."
  ],
  "Barbell reverse lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand tall with your feet together.",
    "Step your right foot straight back and land on the ball of the foot.",
    "Bend both knees until your left thigh is parallel to the floor.",
    "Push through your left foot to stand, then repeat with the other leg."
  ],
  "Barbell lateral lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand tall with your feet together.",
    "Take a wide step out to the right.",
    "Bend your right knee and sit your hips back, keeping your left leg straight.",
    "Push off your right foot to return, then repeat to the left."
  ],
  "Barbell curtsy lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand tall with your feet hip-width apart.",
    "Step your right foot back and across behind your left leg.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left foot to stand, then repeat on the other side."
  ],
  "Barbell deficit lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand on a low platform with your feet together.",
    "Step your right foot straight back and down onto the floor behind the platform.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left foot to step back up, finish all reps, then switch sides."
  ],
  "Barbell curtsy deficit lunge": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand on a low platform with your feet together.",
    "Step your right foot back and across behind your left leg, down onto the floor.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left foot to step back up, finish all reps, then switch sides."
  ],
  "Barbell front rack deficit lunge": [
    "Rest the barbell across the front of your shoulders with your elbows lifted high.",
    "Stand on a low platform with your feet together.",
    "Step your right foot straight back and down onto the floor behind the platform.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left foot to step back up, finish all reps, then switch sides."
  ],
  "Barbell Zercher deficit lunge": [
    "Hold the barbell in the crooks of your elbows, tight against your stomach.",
    "Stand on a low platform with your feet together.",
    "Step your right foot straight back and down onto the floor behind the platform.",
    "Bend both knees until your right knee is just above the floor.",
    "Push through your left foot to step back up, finish all reps, then switch sides."
  ],
  "Barbell side step-up": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand with a knee-high box at your left side and place your left foot flat on it.",
    "Push through your left leg and rise until it is straight.",
    "Bring your right foot up beside the left.",
    "Lower your right foot back to the floor under control, finish all reps, then switch sides."
  ],
  "Barbell step-up knee drive": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand facing a knee-high box and place your left foot flat on top of it.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Barbell front rack step-up": [
    "Rest the barbell across the front of your shoulders with your elbows lifted high.",
    "Stand facing a knee-high box and place your left foot flat on top of it.",
    "Push through your left leg and stand up on the box.",
    "Bring your right foot up beside the left and stand tall.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Barbell front rack step-up knee drive": [
    "Rest the barbell across the front of your shoulders with your elbows lifted high.",
    "Stand facing a knee-high box and place your left foot flat on top of it.",
    "Push through your left leg and stand up on the box.",
    "Drive your right knee up until your thigh is parallel to the floor.",
    "Step down with your right foot under control, finish all reps, then switch sides."
  ],
  "Barbell feet-elevated glute bridge": [
    "Sit on the floor, roll the barbell over your legs to the crease of your hips and lie back.",
    "Rest both heels on a bench with your knees bent about 90 degrees.",
    "Push through your heels and lift your hips until your body is straight from knees to shoulders.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips to the floor under control."
  ],
  "Barbell feet-elevated single-leg glute bridge": [
    "Sit on the floor, roll the barbell over your legs to the crease of your hips and lie back.",
    "Rest your left heel on a bench with the knee bent and lift your right leg straight up.",
    "Push through your left heel and lift your hips until your body is straight from knee to shoulders.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips to the floor under control, finish all reps, then switch sides."
  ],
  "Barbell feet-elevated figure-four glute bridge": [
    "Sit on the floor, roll the barbell over your legs to the crease of your hips and lie back.",
    "Rest your left heel on a bench with the knee bent and cross your right ankle over your left knee.",
    "Push through your left heel and lift your hips until your body is straight from knee to shoulders.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips to the floor under control, finish all reps, then switch sides."
  ],
  "Barbell feet-elevated staggered glute bridge": [
    "Sit on the floor, roll the barbell over your legs to the crease of your hips and lie back.",
    "Put your left foot flat on a bench close to your hips and your right heel further away on the bench.",
    "Push through your left heel and lift your hips until your body is straight from knee to shoulders.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips to the floor under control, finish all reps, then switch sides."
  ],
  "Barbell figure-four hip thrust": [
    "Sit on the floor with your upper back against a bench and roll the barbell to the crease of your hips.",
    "Plant your left foot flat with the knee bent and cross your right ankle over your left knee.",
    "Push through your left heel and lift your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch sides."
  ],
  "Barbell figure-four heels-elevated hip thrust": [
    "Sit on the floor with your upper back against a bench and roll the barbell to the crease of your hips.",
    "Rest your left heel on a low step and cross your right ankle over your left knee.",
    "Push through your left heel and lift your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch sides."
  ],
  "Barbell heels-elevated hip thrust": [
    "Sit on the floor with your upper back against a bench and roll the barbell to the crease of your hips.",
    "Rest both heels on a low step with your knees bent.",
    "Push through your heels and lift your hips until your torso and thighs are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control."
  ],
  "Barbell single-leg hip thrust": [
    "Sit on the floor with your upper back against a bench and roll the barbell to the crease of your hips.",
    "Plant your left foot flat with the knee bent and hold your right leg straight out off the floor.",
    "Push through your left heel and lift your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch sides."
  ],
  "Barbell single-leg heels-elevated hip thrust": [
    "Sit on the floor with your upper back against a bench and roll the barbell to the crease of your hips.",
    "Rest your left heel on a low step and hold your right leg straight out off the floor.",
    "Push through your left heel and lift your hips until your torso and left thigh are parallel to the floor.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch sides."
  ],
  "Barbell block conventional deadlift": [
    "Stand with your feet hip-width apart and the bar over the middle of your feet, plates on blocks.",
    "Hinge down and grip the bar just outside your legs with a flat back.",
    "Push through your feet and lift the bar off the blocks, keeping it close to your legs.",
    "Stand up by driving your hips forward until you are fully upright.",
    "Lower the bar back onto the blocks under control."
  ],
  "Barbell deficit conventional deadlift": [
    "Stand on a low platform with your feet hip-width apart and the bar over the middle of your feet.",
    "Hinge down, bend your knees and grip the bar just outside your legs with a flat back.",
    "Push through your feet and lift the bar, keeping it close to your legs.",
    "Stand up by driving your hips forward until you are fully upright.",
    "Lower the bar to the floor under control."
  ],
  "Barbell snatch-grip deadlift": [
    "Stand with your feet hip-width apart and the bar over the middle of your feet.",
    "Squat down and grip the bar very wide with a flat back and your chest up.",
    "Push through your feet and lift the bar, keeping it close to your legs.",
    "Stand tall with the bar in the crease of your hips.",
    "Lower the bar to the floor under control."
  ],
  "Barbell snatch-grip Romanian deadlift": [
    "Stand tall holding the bar with a very wide grip in the crease of your hips.",
    "Bend your knees slightly and keep them there.",
    "Push your hips back and slide the bar down your thighs with a flat back.",
    "Lower until the bar is at mid-shin or your hamstrings are fully stretched.",
    "Drive your hips forward to stand tall."
  ],
  "Barbell Jefferson deadlift": [
    "Stand over the barbell with one foot on each side, feet wider than your shoulders and toes turned out.",
    "Squat down and grip the bar with one hand in front of you and one behind.",
    "Keep your chest up and push through both feet to lift the bar.",
    "Stand tall with the bar hanging between your thighs.",
    "Lower the bar to the floor under control."
  ],
  "Barbell reverse deadlift": [
    "Stand with the barbell on the floor just behind your heels, feet hip-width apart.",
    "Squat down and grip the bar behind you with your palms facing back.",
    "Keep your chest up and push through your feet to lift the bar.",
    "Stand tall with the bar behind your thighs.",
    "Bend your knees and lower the bar to the floor under control."
  ],
  "Barbell suitcase deadlift": [
    "Stand with the barbell on the floor at your right side, parallel to your feet.",
    "Push your hips back, bend your knees and grip the middle of the bar with your right hand.",
    "Push through your feet and stand up, keeping your shoulders level.",
    "Stand tall with the bar hanging level beside your thigh.",
    "Lower the bar to the floor under control, finish all reps, then switch sides."
  ],
  "Barbell staggered deadlift": [
    "Stand tall holding the bar in front of your thighs with an overhand grip.",
    "Step your right foot one foot-length back and rest it on its toes.",
    "Push your hips back and lower the bar along your front leg with a flat back.",
    "Lower until the bar is at mid-shin or your front hamstring is fully stretched.",
    "Drive your hips forward to stand, finish all reps, then switch sides."
  ],
  "Barbell single-leg deadlift": [
    "Stand tall holding the bar in front of your thighs with an overhand grip.",
    "Shift your weight onto your left leg and lift your right foot just off the floor.",
    "Push your hips back and tip your torso forward as your right leg rises behind you.",
    "Lower until your torso and right leg are close to parallel to the floor.",
    "Drive your hips forward to stand, finish all reps, then switch sides."
  ],
  "Barbell low-bar good morning": [
    "Set the barbell low across your rear shoulders and grip it wide.",
    "Stand with your feet hip-width apart and your knees slightly bent.",
    "Push your hips back and tip your torso forward with a flat back.",
    "Lower until your torso is close to parallel to the floor.",
    "Drive your hips forward to stand tall."
  ],
  "Barbell Zercher good morning": [
    "Hold the barbell in the crooks of your elbows, tight against your stomach.",
    "Stand with your feet hip-width apart and your knees slightly bent.",
    "Push your hips back and tip your torso forward with a flat back.",
    "Lower until your torso is close to parallel to the floor.",
    "Drive your hips forward to stand tall."
  ],
  "Barbell spinal Jefferson curl": [
    "Stand on a box or bench with your feet together at the edge, holding a light bar in front of your thighs.",
    "Tuck your chin and slowly round your upper back forward.",
    "Keep rolling down one segment at a time with your legs straight.",
    "Let the bar travel below your feet as far as your flexibility allows.",
    "Roll back up slowly from the lower back to the neck."
  ],
  "Barbell supinated Pendlay row": [
    "Stand with your feet hip-width apart and the bar over the middle of your feet.",
    "Hinge forward until your torso is parallel to the floor and grip the bar underhand, shoulder-width.",
    "Pull the bar explosively to your lower ribs.",
    "Squeeze your shoulder blades together at the top.",
    "Lower the bar to the floor and let it settle before the next rep."
  ],
  "Barbell Meadows row": [
    "Stand beside the loaded end of a landmine barbell in a staggered stance, left foot forward.",
    "Hinge forward, rest your left forearm on your left thigh and grip the end of the bar with your right hand.",
    "Pull the bar up, leading with your elbow, until your hand is beside your hip.",
    "Squeeze your back for a moment at the top.",
    "Lower until your arm is straight, finish all reps, then switch sides."
  ],
  "Barbell landmine side bend": [
    "Stand side-on to a landmine barbell and hold its free end in your right hand at your side.",
    "Stand tall with your feet hip-width apart and your left hand behind your head.",
    "Bend slowly to the right, lowering the bar beside your leg.",
    "Pull back up with your left side and bend slightly past upright.",
    "Finish all reps, then switch hands."
  ],
  "Barbell 30-degree shrug": [
    "Stand tall holding the barbell in front of your thighs with a wide overhand grip.",
    "Let your shoulders drop and keep your arms straight.",
    "Pull your shoulders up toward your ears along the line of your arms.",
    "Hold the top for a moment.",
    "Lower your shoulders slowly all the way down."
  ],
  "Barbell behind-the-back shrug": [
    "Stand with your back to a racked bar and grip it behind you, palms facing back, shoulder-width.",
    "Lift the bar off and stand tall with your arms straight.",
    "Lift your shoulders straight up toward your ears as high as you can.",
    "Hold the top for a moment.",
    "Lower your shoulders slowly all the way down."
  ],
  "Barbell behind-the-back 30-degree shrug": [
    "Stand with your back to a racked bar and grip it wide behind you, palms facing back.",
    "Lift the bar off and stand tall with your arms straight.",
    "Pull your shoulders up toward your ears along the line of your arms.",
    "Hold the top for a moment.",
    "Lower your shoulders slowly all the way down."
  ],
  "Barbell silverback shrug": [
    "Stand holding the barbell with an overhand grip just wider than your shoulders.",
    "Bend your knees slightly and lean your torso forward about 30 degrees with a flat back.",
    "Let the bar hang below your shoulders and your shoulders drop forward.",
    "Pull your shoulder blades back and up, squeezing them together.",
    "Lower slowly and let your shoulders stretch forward again."
  ],
  "Barbell shoulder extension": [
    "Stand tall holding the barbell behind your thighs, palms facing back, hands shoulder-width.",
    "Pull your shoulders back and keep your arms straight.",
    "Lift the bar straight back away from your thighs as far as you can.",
    "Hold the top for a moment.",
    "Lower the bar slowly back to your thighs."
  ],
  "Barbell front raise": [
    "Stand tall holding the barbell in front of your thighs with an overhand, shoulder-width grip.",
    "Brace your core and keep a very slight bend in your elbows.",
    "Raise the bar forward and up until your hands are at eye level.",
    "Pause for a moment at the top.",
    "Lower the bar slowly back to your thighs."
  ],
  "Barbell full front raise": [
    "Stand tall holding the barbell in front of your thighs with an overhand, shoulder-width grip.",
    "Brace your core and keep your arms straight.",
    "Raise the bar forward past shoulder height.",
    "Keep going until your arms are vertical overhead.",
    "Lower the bar slowly along the same arc to your thighs."
  ],
  "Barbell seated full front raise": [
    "Sit back on a bench set to a steep incline with your feet flat on the floor.",
    "Hold the barbell on your thighs with an overhand, shoulder-width grip.",
    "Raise the bar forward past shoulder height with your arms straight.",
    "Keep going until your arms are overhead in line with your torso.",
    "Lower the bar slowly back to your thighs."
  ],
  "Barbell behind-the-neck press": [
    "Take the barbell from a rack onto your upper back with a wide overhand grip.",
    "Stand tall with your feet shoulder-width apart and your elbows under the bar.",
    "Press the bar straight up behind your head.",
    "Lock your arms out with the bar over the back of your head.",
    "Lower the bar under control to ear level behind your head."
  ],
  "Barbell behind-the-neck seated overhead press": [
    "Sit on a bench with an upright back support, feet flat on the floor.",
    "Take the barbell onto your upper back with a wide overhand grip, elbows under the bar.",
    "Press the bar straight up behind your head.",
    "Lock your arms out with the bar over the back of your head.",
    "Lower the bar under control to ear level behind your head."
  ],
  "Barbell Bradford press": [
    "Stand tall holding the barbell at your collarbones with an overhand grip just wider than your shoulders.",
    "Press the bar up until it just clears the top of your head.",
    "Move it back over your head and lower it behind your neck.",
    "Press it up just over your head again.",
    "Lower it to your collarbones in front and repeat."
  ],
  "Barbell Z press": [
    "Sit on the floor with your legs straight out in front and your torso upright.",
    "Hold the barbell at your collarbones with an overhand grip just wider than your shoulders.",
    "Press the bar straight up past your face.",
    "Lock your arms out overhead without leaning back.",
    "Lower the bar under control to your collarbones."
  ],
  "Barbell high incline bench press": [
    "Lie back on a bench set at about 60 degrees with your feet flat on the floor.",
    "Grip the bar slightly wider than your shoulders and lift it off the rack.",
    "Lower the bar under control to your upper chest.",
    "Press the bar up until your arms are straight above your shoulders.",
    "Return the bar to the rack after the last rep."
  ],
  "Barbell guillotine incline bench press": [
    "Lie back on a bench set at about 30 degrees with your feet flat on the floor.",
    "Grip the bar wide and lift it off the rack over your collarbones.",
    "Lower the bar slowly toward your collarbones with your elbows flared out.",
    "Stop just above your collarbones.",
    "Press the bar back up until your arms are straight."
  ],
  "Barbell guillotine high incline bench press": [
    "Lie back on a bench set at about 60 degrees with your feet flat on the floor.",
    "Grip the bar wide and lift it off the rack over your collarbones.",
    "Lower the bar slowly toward your collarbones with your elbows flared out.",
    "Stop just above your collarbones.",
    "Press the bar back up until your arms are straight."
  ],
  "Barbell reverse-grip bench press": [
    "Lie on a flat bench with your feet flat on the floor.",
    "Grip the bar underhand, slightly wider than your shoulders, and lift it off the rack.",
    "Lower the bar to your lower chest with your elbows close to your ribs.",
    "Press the bar up and slightly back until your arms are straight.",
    "Return the bar to the rack after the last rep."
  ],
  "Barbell decline close-grip bench press": [
    "Lie on a decline bench with your shins hooked under the leg pads.",
    "Grip the bar at shoulder width and lift it off the rack over your lower chest.",
    "Lower the bar to your lower chest with your elbows close to your ribs.",
    "Press the bar up until your arms are straight, squeezing your triceps.",
    "Return the bar to the rack after the last rep."
  ],
  "Barbell hooklying bench press": [
    "Lie on a flat bench and place both feet flat on it with your knees bent.",
    "Grip the bar slightly wider than your shoulders and lift it off the rack over your chest.",
    "Lower the bar under control to the middle of your chest.",
    "Press the bar back up until your arms are straight.",
    "Return the bar to the rack after the last rep."
  ],
  "Barbell Larsen bench press": [
    "Lie on a flat bench and lift the bar off the rack with a grip slightly wider than your shoulders.",
    "Lift both feet off the floor and hold your legs straight out.",
    "Lower the bar under control to your lower chest.",
    "Press the bar back up until your arms are straight.",
    "Put your feet down before you return the bar to the rack."
  ],
  "Barbell JM press": [
    "Lie on a flat bench and grip the bar just inside shoulder width.",
    "Lift the bar off the rack and hold it over your upper chest with straight arms.",
    "Bend your elbows and let them move forward as you lower the bar toward your throat.",
    "Stop when your forearms meet your biceps, the bar a few centimetres above your throat.",
    "Press the bar back up along the same path by straightening your elbows."
  ],
  "Barbell overhead tricep extension": [
    "Stand tall and press the barbell overhead with a grip just inside shoulder width.",
    "Keep your upper arms vertical beside your ears.",
    "Bend your elbows and lower the bar behind your head.",
    "Stop when your forearms are just below parallel to the floor.",
    "Straighten your elbows to press the bar back overhead."
  ],
  "Barbell wrist curl": [
    "Sit on a bench and rest your forearms on your thighs with your wrists just past your knees.",
    "Hold the barbell with an underhand grip, palms up.",
    "Let your wrists bend down so the bar lowers toward the floor.",
    "Curl your wrists up as high as you can.",
    "Lower slowly and repeat."
  ],
  "Barbell wrist extension": [
    "Sit on a bench and rest your forearms on your thighs with your wrists just past your knees.",
    "Hold the barbell with an overhand grip, palms down.",
    "Let your wrists bend down so the bar lowers toward the floor.",
    "Bend your wrists back and lift the bar as high as you can.",
    "Lower slowly and repeat."
  ],
  "Barbell behind-the-back wrist curl": [
    "Stand with your back to a racked bar and grip it behind you, palms facing back, shoulder-width.",
    "Lift the bar off and stand tall with your arms straight.",
    "Open your fingers and let the bar roll down to your fingertips.",
    "Close your hands and curl your wrists up and back as far as you can.",
    "Lower slowly and repeat."
  ],
  "Barbell seated calf raise": [
    "Sit on a bench with the balls of your feet on a low block and your knees bent 90 degrees.",
    "Rest the barbell across your thighs just behind your knees and hold it in place.",
    "Lower your heels as far as you can.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top, then lower slowly."
  ],
  "Barbell toes-up calf raise": [
    "Set the barbell across your upper back and grip it just outside your shoulders.",
    "Stand with the balls of your feet on a low step and your heels hanging off the edge.",
    "Lower your heels below the step until your calves are stretched.",
    "Push through the balls of your feet and rise as high as you can.",
    "Pause at the top, then lower slowly."
  ],
  "Barbell sit-up": [
    "Lie on your back with your legs straight and the barbell on the floor behind your head.",
    "Grip it slightly wider than your shoulders, pull it over your chest and lock your arms out.",
    "Tighten your abs and sit up, keeping the bar pointing at the ceiling.",
    "Sit up until your torso is vertical and the bar is overhead.",
    "Lower your torso back to the floor under control."
  ],
  "Barbell suitcase carry": [
    "Stand with the barbell on the floor at your right side, parallel to your feet.",
    "Squat down, grip the middle of the bar with your right hand and stand up with a flat back.",
    "Brace your core and walk forward with the bar level at your side.",
    "Walk the planned distance without leaning.",
    "Set the bar down under control and switch hands."
  ],
  "Barbell thruster": [
    "Hold the barbell across the front of your shoulders with your elbows high, feet shoulder-width apart.",
    "Squat down until your thighs are at least parallel to the floor.",
    "Drive up hard out of the squat.",
    "As your legs straighten, press the bar overhead until your arms are locked out.",
    "Lower the bar to your shoulders and go straight into the next squat."
  ],
  "Barbell clean and press": [
    "Stand with your feet hip-width apart, the bar over the middle of your feet, and grip it just outside your legs.",
    "Lift the bar past your knees with a flat back, then extend your hips and knees explosively.",
    "Pull yourself under the bar and catch it on the front of your shoulders with your elbows high.",
    "Stand tall, then press the bar overhead until your arms are locked out.",
    "Lower the bar to your shoulders, then to the floor, under control."
  ],
  "Barbell hang clean and press": [
    "Stand tall holding the barbell in front of your thighs with an overhand grip just outside your legs.",
    "Push your hips back and lower the bar to just above your knees with a flat back.",
    "Extend your hips and knees explosively and catch the bar on the front of your shoulders.",
    "Press the bar overhead until your arms are locked out.",
    "Lower the bar to your shoulders, then back to the hang position."
  ],
  "Barbell clean and jerk": [
    "Stand with your feet hip-width apart, the bar over the middle of your feet, and grip it just outside your legs.",
    "Lift the bar past your knees with a flat back, then extend your hips and knees explosively.",
    "Pull yourself under the bar, catch it on the front of your shoulders and stand up.",
    "Dip your knees slightly, drive the bar up and split your feet front and back, catching it with locked arms.",
    "Bring your front foot back, then your back foot forward, and stand with your feet together."
  ],
  "Barbell split jerk": [
    "Hold the barbell across the front of your shoulders with a grip just wider than your shoulders, feet hip-width apart.",
    "Dip by bending your knees a little with your torso upright.",
    "Drive up hard through your legs to launch the bar off your shoulders.",
    "Split your feet front and back and catch the bar overhead with locked arms.",
    "Bring your front foot back, then your back foot forward, and stand with your feet together."
  ],
  "Barbell snatch": [
    "Stand with your feet hip-width apart, the bar over the middle of your feet, and grip it very wide.",
    "Lift the bar past your knees with a flat back and your chest up.",
    "Extend your hips and knees explosively and shrug, keeping the bar close.",
    "Pull yourself under the bar and catch it overhead with locked arms in a deep squat.",
    "Stand up with the bar overhead, then lower it under control."
  ],
  "Barbell power snatch": [
    "Stand with your feet hip-width apart, the bar over the middle of your feet, and grip it very wide.",
    "Lift the bar past your knees with a flat back and your chest up.",
    "Extend your hips and knees explosively and shrug, keeping the bar close.",
    "Pull yourself under the bar and catch it overhead with locked arms in a quarter squat.",
    "Stand tall with the bar overhead, then lower it under control."
  ],
  "Barbell muscle snatch": [
    "Stand with your feet hip-width apart, the bar over the middle of your feet, and grip it very wide.",
    "Lift the bar past your knees with a flat back and your chest up.",
    "Extend your hips and knees and pull the bar up to your chest with your elbows high.",
    "Turn the bar over and press it straight overhead without bending your knees again.",
    "Lock your arms out, then lower the bar under control."
  ],
  "Barbell snatch-grip high pull": [
    "Stand holding the barbell with a very wide overhand grip, feet hip-width apart.",
    "Push your hips back and lower the bar to knee height with a flat back.",
    "Extend your hips and knees explosively, rise onto your toes and shrug.",
    "Pull the bar up to your lower chest with your elbows high and out.",
    "Lower the bar under control and reset."
  ],
  "EZ bar close-grip curl": [
    "Stand tall holding the EZ bar with an underhand grip on the two inner bends, hands about a fist apart.",
    "Let your arms hang straight with your elbows close to your sides.",
    "Curl the bar up toward your shoulders.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "EZ bar Cuban press": [
    "Stand tall holding the EZ bar with an overhand grip a little wider than your shoulders.",
    "Pull the bar up until your upper arms are level with your shoulders and your forearms hang straight down.",
    "Keeping your elbows where they are, rotate your forearms up until they point at the ceiling.",
    "Press the bar straight overhead until your arms are locked out.",
    "Lower the bar by reversing each stage back to your thighs."
  ],
  "EZ bar drag curl": [
    "Stand tall holding the EZ bar with an underhand grip, hands shoulder-width apart.",
    "Start with the bar touching the front of your thighs.",
    "Drag the bar up your body by pulling your elbows back.",
    "Stop at your lower chest and squeeze your biceps.",
    "Lower the bar back down along your body."
  ],
  "EZ bar overhead press": [
    "Stand with your feet hip-width apart, holding the EZ bar at your collarbone with an overhand grip on the outer bends.",
    "Brace your core and squeeze your glutes.",
    "Press the bar straight up past your face.",
    "Lock your arms out overhead.",
    "Lower the bar under control to your collarbone."
  ],
  "EZ bar reverse preacher curl": [
    "Sit at a preacher bench with the backs of your upper arms on the pad, holding the EZ bar with an overhand grip.",
    "Start with your arms almost straight down the pad.",
    "Curl the bar up toward your shoulders with your knuckles on top, arms staying on the pad.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are almost straight."
  ],
  "EZ bar reverse spider curl": [
    "Lie face-down with your chest on a bench set at about 45 degrees, holding the EZ bar with an overhand grip.",
    "Let your arms hang straight down from your shoulders.",
    "Curl the bar up toward your shoulders with your knuckles on top, upper arms still.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "EZ bar Romanian deadlift": [
    "Stand tall holding the EZ bar in front of your thighs with an overhand grip, feet hip-width apart.",
    "Push your hips back and lower the bar along your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, around mid-shin.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "EZ bar shrug": [
    "Stand tall holding the EZ bar in front of your thighs with an overhand grip, arms straight.",
    "Let your shoulders relax and drop.",
    "Shrug your shoulders straight up as high as they go.",
    "Pause at the top.",
    "Lower slowly to a full stretch."
  ],
  "EZ bar spider curl": [
    "Lie face-down with your chest on a bench set at about 45 degrees, holding the EZ bar with an underhand grip.",
    "Let your arms hang straight down from your shoulders.",
    "Curl the bar up toward your shoulders without moving your upper arms.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "EZ bar upright row": [
    "Stand tall holding the EZ bar with an overhand grip on the inner bends, hands a little narrower than your shoulders.",
    "Start with your arms straight and the bar in front of your thighs.",
    "Pull the bar straight up along your body, elbows leading.",
    "Stop at upper-chest height with your elbows level with your shoulders.",
    "Lower the bar slowly until your arms are straight."
  ],
  "EZ bar Zercher squat": [
    "Hold the EZ bar in the crooks of your elbows, tight against your stomach, and stand with your feet shoulder-width apart.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Trap bar deficit deadlift": [
    "Stand on a low platform inside the trap bar with your feet hip-width apart.",
    "Bend your knees and hips, keep your back flat and your chest up, and grip the trap bar.",
    "Brace your core and push through your whole foot to lift the trap bar.",
    "Stand tall with your hips and knees fully extended.",
    "Lower the trap bar under control by pushing your hips back."
  ],
  "Trap bar reverse lunge": [
    "Stand tall inside the trap bar, holding the handles at your sides with straight arms.",
    "Take a long step straight back with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot forward to stand.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Trap bar Romanian deadlift": [
    "Stand tall inside the trap bar, holding the handles at your sides, feet hip-width apart.",
    "Push your hips back and lower the handles beside your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, around mid-shin.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Trap bar shrug": [
    "Stand tall inside the trap bar, holding the handles at your sides with straight arms.",
    "Let your shoulders relax and drop.",
    "Shrug your shoulders straight up as high as they go.",
    "Pause at the top.",
    "Lower slowly to a full stretch."
  ],
  "Trap bar single-leg deadlift": [
    "Stand inside the trap bar holding the handles, and shift your weight onto one leg.",
    "Hinge forward at the hip, letting your free leg rise straight behind you.",
    "Lower the trap bar until your torso is about parallel to the floor.",
    "Drive your hips forward and stand tall on the same leg.",
    "Finish all reps, then switch sides."
  ],
  "Trap bar split squat": [
    "Stand inside the trap bar holding the handles, one foot forward and the other a long step back on its toes.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Trap bar squat": [
    "Stand inside the trap bar with your feet shoulder-width apart, squat down and grip the handles with your chest up.",
    "Brace your core and push through your whole foot to stand up with the bar.",
    "Stand tall with your hips and knees fully extended.",
    "Squat straight back down, hips low and chest up, until the plates touch the floor.",
    "Touch the floor lightly and stand again."
  ],
  "Trap bar staggered Romanian deadlift": [
    "Stand inside the trap bar holding the handles, one foot flat and the other half a step back on its toes.",
    "Push your hips back and lower the trap bar with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Smith machine close-grip bench press": [
    "Lie on a flat bench in the Smith machine with the bar over your lower chest, and grip it shoulder-width apart.",
    "Twist the bar to unhook it and hold it over your chest with straight arms.",
    "Lower the bar to your lower chest with your elbows close to your sides.",
    "Press the bar back up until your arms are straight.",
    "Twist the bar back onto the hooks when the set is done."
  ],
  "Smith machine drag curl": [
    "Stand in the Smith machine facing the bar and grip it underhand, shoulder-width apart, at thigh height.",
    "Start with the bar touching the front of your thighs.",
    "Drag the bar up your body by pulling your elbows back.",
    "Stop at your lower chest and squeeze your biceps.",
    "Lower the bar back down along your body."
  ],
  "Smith machine guillotine bench press": [
    "Lie on a flat bench in the Smith machine with the bar above your neck, and grip it wide.",
    "Twist the bar to unhook it and hold it over your neck with straight arms.",
    "Lower the bar slowly toward your collarbone with your elbows flared wide.",
    "Stop just above your neck and press the bar back up.",
    "Twist the bar back onto the hooks when the set is done."
  ],
  "Smith machine narrow-stance squat": [
    "Stand in the Smith machine with the bar across your upper back, your feet close together, and unhook it.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Smith machine overhand row": [
    "Stand in the Smith machine, hinge forward about 45 degrees with a flat back and grip the bar overhand, just wider than your shoulders.",
    "Start with your arms straight and your back flat.",
    "Pull the bar toward your stomach, leading with your elbows.",
    "Squeeze your shoulder blades together at the top.",
    "Lower the bar slowly until your arms are straight."
  ],
  "Smith machine underhand row": [
    "Stand in the Smith machine, hinge forward about 45 degrees with a flat back and grip the bar underhand, shoulder-width apart.",
    "Start with your arms straight and your back flat.",
    "Pull the bar toward your stomach, leading with your elbows.",
    "Squeeze your shoulder blades together at the top.",
    "Lower the bar slowly until your arms are straight."
  ],
  "Smith machine reverse lunge": [
    "Stand in the Smith machine with the bar across your upper back, your feet together under the bar, and unhook it.",
    "Take a long step straight back with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot forward to stand.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Smith machine seated calf raise": [
    "Sit on a bench in the Smith machine with the balls of your feet on a block and the padded bar resting across your thighs just above the knees.",
    "Start with your heels low and your calves stretched.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top.",
    "Lower your heels slowly to a full stretch."
  ],
  "Smith machine single-leg hip thrust": [
    "Rest your upper back on a bench with the padded bar across your hips, one foot flat on the floor and the other leg lifted.",
    "Unhook the bar, brace your core and push through the heel of the planted foot.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Smith machine skull crusher": [
    "Lie on a flat bench in the Smith machine with your head under the bar, and grip it overhand, a little narrower than your shoulders.",
    "Unhook the bar and hold it above your forehead with straight arms.",
    "Bend your elbows and lower the bar toward your forehead.",
    "Straighten your arms to press the bar back up.",
    "Keep your upper arms still as you repeat."
  ],
  "Smith machine split squat": [
    "Stand in the Smith machine with the bar across your upper back, one foot in front of the bar and the other a long step back on its toes, and unhook it.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Plate alternating deadstop row": [
    "Hold a plate in each hand, hinge forward with a flat back until your torso is almost parallel to the floor, and rest both plates on the floor.",
    "Start with your arms straight and your back flat.",
    "Pull one plate up beside your ribs, leading with your elbow.",
    "Lower it until it rests on the floor again.",
    "Row the other plate the same way and keep alternating."
  ],
  "Plate bicep curl": [
    "Stand tall holding the plate with both hands at its sides, arms straight in front of your thighs.",
    "Let your arms hang straight with your elbows close to your sides.",
    "Curl the plate up toward your chest.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Plate car driver": [
    "Stand tall holding the plate with both hands at 3 and 9 o'clock.",
    "Raise your arms straight in front of you to shoulder height.",
    "Turn the plate to one side like a steering wheel until one hand is on top.",
    "Turn it back through the middle to the other side.",
    "Keep turning side to side, then lower the plate to your thighs."
  ],
  "Plate clean": [
    "Stand with your feet shoulder-width apart and the plate on its edge on the floor between them.",
    "Bend your knees and hips with a flat back and grip the sides of the plate.",
    "Stand up fast and pull the plate up along your body with your elbows high.",
    "Tuck your elbows under and catch the plate in front of your chest.",
    "Lower the plate back to the floor with a flat back."
  ],
  "Plate clean and press": [
    "Stand with your feet shoulder-width apart and the plate on its edge on the floor between them.",
    "Bend your knees and hips with a flat back and grip the sides of the plate.",
    "Stand up and pull the plate to your chest, elbows under it.",
    "Press the plate straight overhead until your arms are locked out.",
    "Lower it to your chest, then back to the floor."
  ],
  "Plate curl to overhead press": [
    "Stand tall holding the plate with both hands at its sides, arms straight in front of your thighs.",
    "Curl the plate up to your chest with your elbows at your sides.",
    "Press the plate straight overhead until your arms are locked out.",
    "Lower the plate back to your chest.",
    "Uncurl it slowly until your arms are straight."
  ],
  "Plate curl to overhead press to tricep extension": [
    "Stand tall holding the plate with both hands at its sides, arms straight in front of your thighs.",
    "Curl the plate up to your chest.",
    "Press it straight overhead until your arms are locked out.",
    "Bend your elbows to lower the plate behind your head, then straighten your arms again.",
    "Lower the plate to your chest and uncurl it to your thighs."
  ],
  "Plate curtsy lunge": [
    "Stand tall holding the plate against your chest with both hands.",
    "Step one foot back and across behind the other leg.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Plate deadlift": [
    "Stand with your feet hip-width apart and the plate on its edge on the floor between them.",
    "Bend your knees and hips, keep your back flat and your chest up, and grip the plate.",
    "Brace your core and push through your whole foot to lift the plate.",
    "Stand tall with your hips and knees fully extended.",
    "Lower the plate under control by pushing your hips back."
  ],
  "Plate deficit lunge": [
    "Lay a large plate flat on the floor and stand on it with both feet.",
    "Step one foot back off the plate onto the floor.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot up onto the plate again.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Plate deficit push-up": [
    "Lay a plate flat on the floor, put both hands on it and get into a push-up position on your toes.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Go down until your chest is level with your hands or a little lower.",
    "Push back up until your arms are straight."
  ],
  "Plate forward lunge": [
    "Stand tall holding the plate against your chest with both hands.",
    "Take a long step straight forward with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push off your front foot to step back to standing.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Plate front raise": [
    "Stand tall holding the plate with both hands at 3 and 9 o'clock, arms straight in front of your thighs.",
    "Start with your arms straight and the plate in front of your thighs.",
    "Raise the plate straight in front of you to shoulder height.",
    "Pause briefly at the top.",
    "Lower slowly to your thighs."
  ],
  "Plate full lateral raise": [
    "Stand tall with a small plate in each hand at your sides.",
    "Start with your arms straight at your sides.",
    "Raise both arms out to the sides and keep going until they are vertical overhead.",
    "Pause briefly at the top.",
    "Lower slowly along the same arc to your sides."
  ],
  "Plate glute bridge to chest press": [
    "Lie on your back with your knees bent and feet flat, holding the plate on your chest with both hands.",
    "Push through your heels and lift your hips until your body is straight from shoulders to knees.",
    "Holding your hips up, press the plate straight up until your arms are locked out.",
    "Lower the plate back to your chest.",
    "Lower your hips to the floor and repeat."
  ],
  "Plate glute bridge to pullover": [
    "Lie on your back with your knees bent and feet flat, holding the plate on your chest with both hands.",
    "Push through your heels and lift your hips until your body is straight from shoulders to knees.",
    "Press the plate above your chest with a slight bend in your elbows.",
    "Lower the plate back over your head until it is just above the floor.",
    "Pull it back over your chest, keeping your hips up, and repeat."
  ],
  "Plate good morning": [
    "Stand with your feet hip-width apart, holding the plate behind your head against your upper back with both hands.",
    "Brace your core and push your hips straight back.",
    "Lean forward with a flat back until your torso is close to parallel with the floor.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Plate good morning anterior": [
    "Stand with your feet hip-width apart, hugging the plate against your chest with both arms.",
    "Brace your core and push your hips straight back.",
    "Lean forward with a flat back until your torso is close to parallel with the floor.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Plate halo": [
    "Stand tall holding the plate with both hands in front of your face, elbows bent.",
    "Move the plate around one side of your head.",
    "Pass it behind your head with your elbows pointing up.",
    "Bring it around the other side and back to the front.",
    "Finish all circles, then reverse the direction."
  ],
  "Plate hollow hold": [
    "Lie on your back with your legs straight and your arms stretched overhead, holding the plate with both hands.",
    "Press your lower back into the floor.",
    "Lift your shoulders, your arms with the plate and your straight legs a little off the floor.",
    "Hold this banana shape, keeping the plate still.",
    "Lower everything to the floor when the time is up."
  ],
  "Plate internally rotated rear delt fly": [
    "Hold a small plate in each hand, bend your knees slightly and hinge forward with a flat back until your torso is almost parallel to the floor.",
    "Let your arms hang straight down with your thumbs pointing toward each other.",
    "Pull your arms out and back until they are level with your shoulders.",
    "Squeeze the back of your shoulders for a moment.",
    "Return slowly to the start."
  ],
  "Plate lateral lunge": [
    "Stand tall holding the plate against your chest with both hands.",
    "Take a wide step straight out to one side.",
    "Bend that knee and sit your hips back, keeping the other leg straight.",
    "Push off the bent leg to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Plate lateral raise": [
    "Stand tall with a small plate in each hand at your sides.",
    "Start with your arms down and a slight bend in your elbows.",
    "Raise both arms out to the sides until they are level with your shoulders.",
    "Pause briefly at the top.",
    "Lower slowly to the start."
  ],
  "Plate overhead carry": [
    "Stand tall and press the plate straight overhead with both hands until your arms are locked out.",
    "Brace your core and look straight ahead.",
    "Walk forward with short, steady steps, keeping the plate still.",
    "Turn around carefully when you run out of room.",
    "Put the plate down under control when the distance or time is up."
  ],
  "Plate overhead press to tricep extension": [
    "Stand tall holding the plate against your chest with both hands.",
    "Press the plate straight overhead until your arms are locked out.",
    "Bend your elbows and lower the plate behind your head.",
    "Straighten your arms to bring the plate back overhead.",
    "Lower the plate to your chest and repeat."
  ],
  "Plate overhead shrug": [
    "Stand tall and press the plate straight overhead with both hands until your arms are locked out.",
    "Let your shoulders relax and drop.",
    "Shrug your shoulders up toward your ears, lifting the plate a little higher.",
    "Pause at the top.",
    "Lower your shoulders slowly, arms still locked."
  ],
  "Plate overhead squat": [
    "Stand with your feet shoulder-width apart and press the plate straight overhead until your arms are locked out.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Plate overhead tricep extension": [
    "Stand tall and press the plate straight overhead with both hands until your arms are locked out.",
    "Start with your arms straight overhead.",
    "Bend your elbows and lower the plate behind your head.",
    "Straighten your arms to lift the plate back overhead.",
    "Keep your elbows pointing up as you repeat."
  ],
  "Plate overhead walking lunge": [
    "Stand tall and press the plate straight overhead with both hands until your arms are locked out.",
    "Take a long step straight forward with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and step straight into the next lunge with the other leg.",
    "Keep walking forward, alternating legs, with the plate locked out overhead."
  ],
  "Plate pinch-grip deadlift": [
    "Stand with your feet shoulder-width apart and the plate on its edge on the floor between them.",
    "Bend your knees and hips with a flat back and pinch the top edge of the plate with both hands.",
    "Brace your core and push through your whole foot to lift the plate.",
    "Stand tall with your hips and knees fully extended.",
    "Lower the plate under control by pushing your hips back."
  ],
  "Plate pinch-grip farmers carry": [
    "Stand tall with a plate pinched in each hand at your sides, arms straight.",
    "Brace your core and look straight ahead.",
    "Walk forward with short, steady steps, keeping the plates still.",
    "Turn around carefully when you run out of room.",
    "Put the plates down under control when the distance or time is up."
  ],
  "Plate pinch-grip row": [
    "Pinch a plate in one hand, hinge forward about 45 degrees with a flat back and rest your free hand on your thigh.",
    "Start with your arm hanging straight down.",
    "Pull the plate up beside your ribs, keeping your elbow close to your body.",
    "Squeeze your shoulder blade back at the top.",
    "Lower slowly, finish all reps, then switch hands."
  ],
  "Plate pinch-grip side bend": [
    "Stand tall with your feet hip-width apart, a plate pinched in one hand at your side and the other hand on your hip.",
    "Keep your hips and shoulders facing forward.",
    "Bend sideways at the waist, lowering the plate down one side.",
    "Pull back up to standing with the opposite side of your waist.",
    "Finish all reps, then switch sides."
  ],
  "Plate reach": [
    "Stand tall holding the plate against your chest with both hands.",
    "Brace your core.",
    "Push the plate straight out in front of you until your arms are straight.",
    "Hold for a moment at arm's length.",
    "Pull the plate slowly back to your chest."
  ],
  "Plate rear delt fly": [
    "Hold a small plate in each hand, bend your knees slightly and hinge forward with a flat back until your torso is almost parallel to the floor.",
    "Let your arms hang straight down with your palms facing each other.",
    "Pull your arms out and back until they are level with your shoulders.",
    "Squeeze the back of your shoulders for a moment.",
    "Return slowly to the start."
  ],
  "Plate reverse lunge": [
    "Stand tall holding the plate against your chest with both hands.",
    "Take a long step straight back with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot forward to stand.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Plate reverse lunge twist": [
    "Stand tall holding the plate in front of your chest with both hands.",
    "Take a long step straight back with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "At the bottom, twist your torso and the plate toward your front leg, then turn back.",
    "Push through your front foot to stand, then repeat on the other side."
  ],
  "Plate Russian twist": [
    "Sit on the floor with your knees bent, lean back about 45 degrees with a straight back and hold the plate in front of your stomach.",
    "Brace your core and keep your chest up.",
    "Rotate your torso to one side, moving the plate with it.",
    "Rotate back through the middle to the other side.",
    "Keep alternating sides at a steady pace."
  ],
  "Plate single-leg deadlift": [
    "Stand tall holding the plate at arm's length in front of your thighs, and shift your weight onto one leg.",
    "Hinge forward at the hip, letting your free leg rise straight behind you.",
    "Lower the plate until your torso is about parallel to the floor.",
    "Drive your hips forward and stand tall on the same leg.",
    "Finish all reps, then switch sides."
  ],
  "Plate single-leg pinch-grip deadlift": [
    "Stand tall with a plate pinched in each hand at your sides, and shift your weight onto one leg.",
    "Hinge forward at the hip, letting your free leg rise straight behind you.",
    "Lower the plates until your torso is about parallel to the floor.",
    "Drive your hips forward and stand tall on the same leg.",
    "Finish all reps, then switch sides."
  ],
  "Plate squat": [
    "Stand with your feet shoulder-width apart, holding the plate in front of your chest with both hands.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Plate squat hold": [
    "Stand with your feet shoulder-width apart, holding the plate in front of your chest with both hands.",
    "Bend your knees and hips and lower into a squat.",
    "Stop when your thighs are about parallel to the floor.",
    "Hold this position, keeping your torso upright.",
    "Stand up when the time is up."
  ],
  "Plate squat hold curl": [
    "Stand with your feet shoulder-width apart, holding the plate in front of your chest with both hands.",
    "Squat down until your thighs are about parallel to the floor and hold there.",
    "Lower the plate between your knees until your arms are straight.",
    "Curl the plate up to your chest without rising out of the squat.",
    "Repeat the curl for all reps, then stand up."
  ],
  "Plate squat hold reach": [
    "Stand with your feet shoulder-width apart, holding the plate in front of your chest with both hands.",
    "Squat down until your thighs are about parallel to the floor and hold there.",
    "Push the plate straight out in front of you until your arms are straight.",
    "Pull the plate back to your chest without rising out of the squat.",
    "Repeat the reach for all reps, then stand up."
  ],
  "Plate squat reach": [
    "Stand with your feet shoulder-width apart, holding the plate against your chest with both hands.",
    "Squat down, pushing the plate straight out in front of you as you lower.",
    "At the bottom your thighs are parallel to the floor and your arms are straight.",
    "Stand back up, pulling the plate in to your chest.",
    "Stand tall at the top before the next rep."
  ],
  "Plate staggered deadlift": [
    "Stand tall holding the plate at arm's length in front of your thighs. Place one foot half a step behind the other, resting on its toes.",
    "Push your hips back and lower the plate with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Plate staggered pinch-grip deadlift": [
    "Stand tall with a plate pinched in each hand at your sides. Place one foot half a step behind the other, resting on its toes.",
    "Push your hips back and lower the plates with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Plate standing twist": [
    "Stand with your feet shoulder-width apart, holding the plate out in front of your chest with your arms almost straight.",
    "Brace your core and sit or stand tall.",
    "Rotate your torso to one side, moving the plate with it.",
    "Rotate back through the middle to the other side.",
    "Keep alternating sides at a steady pace."
  ],
  "Plate thruster": [
    "Stand with your feet shoulder-width apart, holding the plate in front of your chest with both hands.",
    "Squat down until your thighs are parallel to the floor.",
    "Stand up fast, driving through your whole foot.",
    "Use that momentum to press the plate straight overhead.",
    "Lower the plate to your chest and go straight into the next squat."
  ],
  "Plate wood chopper": [
    "Stand with your feet shoulder-width apart, holding the plate with both hands.",
    "Bend your knees slightly, rotate to one side and hold the plate low outside that thigh.",
    "Sweep the plate diagonally across your body, turning your torso with it.",
    "Finish with the plate high above the opposite shoulder.",
    "Return along the same path, finish all reps, then switch sides."
  ],
  "Smith machine assisted pull-up": [
    "Lock the Smith machine bar at about chest height.",
    "Sit under the bar with your feet flat on the floor and grip it overhand, just wider than your shoulders, arms straight.",
    "Pull yourself up, pushing lightly with your legs, until your chin is above the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Smith machine bodyweight skull crusher": [
    "Lock the Smith machine bar at about hip height and grip it overhand, shoulder-width apart.",
    "Walk your feet back until your body leans forward in one straight line, arms straight.",
    "Bend your elbows and lower your head toward and under the bar.",
    "Stop when your forearms are fully bent and your upper arms are beside your ears.",
    "Straighten your arms to push yourself back to the start."
  ],
  "Smith machine glute kickback": [
    "Set the Smith machine bar low and get on your hands and knees under it.",
    "Place the sole of one foot against the underside of the bar and unhook it.",
    "Drive your heel toward the ceiling until your thigh is level with your back.",
    "Lower your knee slowly back under your hip.",
    "Finish all reps, then switch sides."
  ],
  "Smith machine hanging knee tuck": [
    "Lock the padded Smith machine bar at about neck height.",
    "Hook both arms over the bar so it sits under your armpits, and lift your feet off the floor.",
    "Pull your knees up toward your chest, curling your hips up.",
    "Squeeze your abs for a moment at the top.",
    "Lower your legs slowly until they hang straight."
  ],
  "Smith machine push-up": [
    "Lock the Smith machine bar at about hip height, put both hands on it shoulder-width apart and walk your feet back until your body is straight.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Stop when your chest touches the bar.",
    "Push back up until your arms are straight."
  ],
  "Smith machine side bend": [
    "Stand sideways beside the Smith machine bar and grip the middle of it with the hand nearest to it, arm straight.",
    "Unhook the bar and stand tall with your free hand on your hip.",
    "Bend sideways at the waist, lowering the bar down one side.",
    "Pull back up to standing with the opposite side of your waist.",
    "Finish all reps, then switch sides."
  ],
  "Smith machine sissy squat": [
    "Lock the Smith machine bar at about hip height, stand facing away from it and reach back to grip it with both hands.",
    "Rise onto the balls of your feet and push your knees forward.",
    "Lean your torso and thighs back together in one line as your knees bend.",
    "Lower until you feel a strong stretch in your quads.",
    "Squeeze your quads to pull yourself back up to standing."
  ],
  "Smith machine staggered deadlift": [
    "Stand in the Smith machine holding the bar overhand at thigh height, one foot flat and the other half a step back on its toes.",
    "Push your hips back and lower the bar with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Smith machine sumo Romanian deadlift": [
    "Stand in the Smith machine with a wide stance and your toes turned out, and grip the bar overhand with your hands inside your knees.",
    "Push your hips back and lower the bar along your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, around mid-shin.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Smith machine upright row": [
    "Stand in the Smith machine and grip the bar overhand, about shoulder-width apart, at thigh height.",
    "Start with your arms straight and the bar in front of your thighs.",
    "Pull the bar straight up along your body, elbows leading.",
    "Stop at upper-chest height with your elbows level with your shoulders.",
    "Lower the bar slowly until your arms are straight."
  ],
  "Landmine alternating lunge and twist": [
    "Stand facing the landmine, holding the end of the bar with both hands in front of your chest, arms almost straight.",
    "Step one foot back into a lunge.",
    "As you lower, swing the bar down to the side of your front leg, turning your torso with it.",
    "Push through your front foot to stand and bring the bar back to the middle.",
    "Repeat with the other leg, twisting to the other side."
  ],
  "Landmine alternating lunge to chest press": [
    "Stand facing the landmine, holding the end of the bar against your chest with both hands.",
    "Step one foot back and lower into a lunge.",
    "As you lower, press the bar away from your chest until your arms are straight.",
    "Push through your front foot to stand, pulling the bar back to your chest.",
    "Repeat with the other leg and keep alternating."
  ],
  "Landmine alternating single-arm press": [
    "Stand facing the landmine with your feet shoulder-width apart, holding the end of the bar in one hand at your shoulder.",
    "Brace your core.",
    "Press the bar up and forward until your arm is straight.",
    "At the top, pass the bar to your other hand.",
    "Lower it to that shoulder, then press again and keep alternating."
  ],
  "Landmine bicep curl": [
    "Stand sideways to the landmine and hold the end of the bar, palm up, in the hand farther from the anchor.",
    "Start with your arm straight and your elbow close to your side.",
    "Curl the bar up toward your opposite shoulder.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly, finish all reps, then turn around and switch arms."
  ],
  "Landmine calf raise": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Start with your heels low and your calves stretched.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top.",
    "Lower your heels slowly to a full stretch."
  ],
  "Landmine concentration curl": [
    "Kneel on one knee facing the landmine, the other foot flat in front of you.",
    "Hold the end of the bar in the hand on the side of your front leg and brace that elbow against the inside of the knee.",
    "Curl the bar up toward your shoulder.",
    "Squeeze for a moment at the top.",
    "Lower slowly, finish all reps, then switch sides."
  ],
  "Landmine cossack squat": [
    "Stand sideways to the landmine with a very wide stance, holding the end of the bar with both hands at arm's length between your thighs.",
    "Keep your chest up and your arms straight.",
    "Shift your weight to the outside leg and squat down deep over it, the other leg straight.",
    "Push back up to the middle.",
    "Finish all reps, then turn around and repeat on the other side."
  ],
  "Landmine curtsy lunge": [
    "Stand facing the landmine, holding the end of the bar at arm's length at your side in one hand.",
    "Step the foot on the bar side back and across behind the other leg.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot to return to standing.",
    "Finish all reps, then switch hands and legs."
  ],
  "Landmine glute kickback": [
    "Get on your hands and knees beside the raised end of the bar.",
    "Rest the end of the bar in the crease behind the knee closer to it.",
    "Keeping the knee bent, drive your heel toward the ceiling until your thigh is level with your back.",
    "Lower your knee slowly back under your hip.",
    "Finish all reps, then switch sides."
  ],
  "Landmine goblet cossack squat": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Step your feet out much wider than your shoulders.",
    "Shift your weight to one side and squat down deep over that leg.",
    "Push back up to the middle.",
    "Repeat to the other side."
  ],
  "Landmine goblet curtsy lunge": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Step one foot back and across behind the other leg.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Landmine goblet lateral lunge": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Take a wide step straight out to one side.",
    "Bend that knee and sit your hips back, keeping the other leg straight.",
    "Push off the bent leg to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Landmine goblet step-up": [
    "Stand facing the landmine with a knee-high box in front of you, holding the end of the bar against your upper chest with both hands.",
    "Place one whole foot on the box.",
    "Push through that foot and stand up tall on the box.",
    "Step back down slowly with the other foot first.",
    "Finish all reps, then switch sides."
  ],
  "Landmine hack squat": [
    "Stand facing away from the landmine with the end of the bar resting on one shoulder, hold it with both hands, and step your feet forward so you lean back into the bar.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Landmine half-kneeling single-arm overhead press": [
    "Kneel on one knee facing the landmine, the other foot flat in front, and hold the end of the bar at your shoulder on the side of the kneeling leg.",
    "Brace your core and squeeze the glute of the kneeling leg.",
    "Press the bar up and forward until your arm is straight.",
    "Pause briefly at the top.",
    "Lower the bar under control, finish all reps, then switch arms."
  ],
  "Landmine hip thrust": [
    "Rest your upper back on a bench with your feet flat on the floor and the padded end of the bar across the crease of your hips, held with both hands.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control."
  ],
  "Landmine hollow hold": [
    "Lie on your back with your feet toward the landmine and hold the end of the bar above your head with both hands, arms straight.",
    "Press your lower back into the floor.",
    "Lift your shoulders and your straight legs a little off the floor.",
    "Hold this banana shape, keeping the bar still.",
    "Lower everything to the floor when the time is up."
  ],
  "Landmine kneeling alternating overhead press": [
    "Kneel on both knees facing the landmine, hips straight, holding the end of the bar in one hand at your shoulder.",
    "Brace your core.",
    "Press the bar up and forward until your arm is straight.",
    "At the top, pass the bar to your other hand.",
    "Lower it to that shoulder, then press again and keep alternating."
  ],
  "Landmine kneeling overhead press": [
    "Kneel on both knees facing the landmine, hips straight, holding the end of the bar in front of your chest with both hands.",
    "Brace your core and squeeze your glutes.",
    "Press the bar up and forward until your arms are straight.",
    "Pause briefly at the top.",
    "Lower the bar under control to your chest."
  ],
  "Landmine kneeling twist": [
    "Kneel on both knees facing the landmine, hips straight, and hold the end of the bar with both hands, fingers interlaced.",
    "Raise the bar in front of your face with your arms almost straight.",
    "Lower the bar in an arc to one side until it is beside your hip.",
    "Swing it back up through the middle and down to the other side.",
    "Keep alternating sides at a steady pace."
  ],
  "Landmine lateral lunge": [
    "Stand facing the landmine with your feet shoulder-width apart, holding the end of the bar with both hands at arm's length in front of your hips.",
    "Take a wide step straight out to one side.",
    "Bend that knee and sit your hips back, keeping the other leg straight.",
    "Push off the bent leg to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Landmine lateral raise": [
    "Stand sideways to the landmine and reach across your body to hold the end of the bar with the hand farther from the anchor.",
    "Start with the bar in front of your opposite hip, arm straight.",
    "Sweep your straight arm up and out to the side until it is level with your shoulder.",
    "Pause briefly at the top.",
    "Lower slowly along the same path, finish all reps, then switch sides."
  ],
  "Landmine lunge": [
    "Stand facing the landmine, holding the end of the bar at arm's length at your side in one hand.",
    "Take a long step straight back with the foot on the bar side.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot forward to stand.",
    "Finish all reps, then switch hands and legs."
  ],
  "Landmine lunge rotate to press": [
    "Stand sideways to the landmine and drop into a lunge, holding the end of the bar just above the floor in the hand nearer the anchor.",
    "Push up out of the lunge and turn toward the landmine, pulling the bar to your shoulder.",
    "Stand tall and press the bar up and forward until your arm is straight.",
    "Lower the bar to your shoulder, turn back and sink into the lunge again.",
    "Finish all reps, then switch sides."
  ],
  "Landmine lunge to overhead press": [
    "Stand facing the landmine, holding the end of the bar in one hand at your shoulder.",
    "Step back with the leg on the bar side and lower into a lunge.",
    "Push through your front foot to stand back up.",
    "Press the bar up and forward until your arm is straight, then lower it to your shoulder.",
    "Finish all reps, then switch sides."
  ],
  "Landmine lying tricep extension": [
    "Lie on your back sideways to the landmine, knees bent.",
    "Hold the end of the bar above your shoulder with the hand nearer the bar, arm straight.",
    "Bend your elbow and lower the end of the bar toward the floor beside your head.",
    "Straighten your arm to press the bar back up.",
    "Finish all reps, then turn around and switch arms."
  ],
  "Landmine oblique twist": [
    "Stand facing the landmine with your feet shoulder-width apart and knees slightly bent, and hold the end of the bar with both hands, fingers interlaced.",
    "Raise the bar in front of your face with your arms almost straight.",
    "Lower the bar in an arc to one side until it is beside your hip.",
    "Swing it back up through the middle and down to the other side.",
    "Keep alternating sides at a steady pace."
  ],
  "Landmine rear delt row": [
    "Stand sideways to the landmine in a staggered stance and hinge forward with a flat back.",
    "Grip the end of the bar overhand with the hand farther from the anchor, arm straight.",
    "Pull your elbow out to the side until it is level with your shoulder.",
    "Squeeze the back of your shoulder for a moment.",
    "Lower slowly until your arm is straight, finish all reps, then switch sides."
  ],
  "Landmine Romanian deadlift": [
    "Stand facing the landmine with your feet hip-width apart, holding the end of the bar with both hands in front of your thighs.",
    "Push your hips back and lower the bar along your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, around mid-shin.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Landmine rotational lift to press": [
    "Stand sideways to the landmine with the end of the bar in front of your feet.",
    "Squat down with a flat back and grip the end of the bar with the hand nearer the anchor.",
    "Drive through your legs, turn toward the landmine and pull the bar up to your shoulder.",
    "Press the bar up and forward until your arm is straight.",
    "Reverse the movement to the floor, finish all reps, then switch sides."
  ],
  "Landmine Russian twist": [
    "Sit on the floor facing the landmine with your knees bent, lean back slightly and lift your feet.",
    "Hold the end of the bar with both hands above and in front of your chest.",
    "Lower the bar under control to one side of your hips.",
    "Bring it back over the middle and lower it to the other side.",
    "Keep alternating sides at a steady pace."
  ],
  "Landmine seated alternating overhead press": [
    "Sit on the floor facing the landmine with your legs straight and spread wide, holding the end of the bar in one hand at your shoulder.",
    "Brace your core.",
    "Press the bar up and forward until your arm is straight.",
    "At the top, pass the bar to your other hand.",
    "Lower it to that shoulder, then press again and keep alternating."
  ],
  "Landmine seated overhead press": [
    "Sit on the floor facing the landmine with your legs straight and spread wide, holding the end of the bar in front of your chest with both hands.",
    "Brace your core and sit tall.",
    "Press the bar up and forward until your arms are straight.",
    "Pause briefly at the top.",
    "Lower the bar under control to your chest."
  ],
  "Landmine seated single-arm overhead press": [
    "Sit on the floor facing the landmine with your legs straight and spread wide, holding the end of the bar in one hand at your shoulder.",
    "Brace your core and sit tall.",
    "Press the bar up and forward until your arm is straight.",
    "Pause briefly at the top.",
    "Lower the bar under control, finish all reps, then switch arms."
  ],
  "Landmine shrug": [
    "Stand sideways to the landmine, holding the end of the bar at arm's length at your side in the hand nearer to it.",
    "Let that shoulder relax and drop.",
    "Shrug the shoulder straight up toward your ear.",
    "Pause at the top.",
    "Lower slowly, finish all reps, then turn around and switch sides."
  ],
  "Landmine single-arm chest press": [
    "Lie on your back sideways to the landmine with your knees bent and feet flat.",
    "Hold the end of the bar in the hand farther from the anchor, elbow on the floor and forearm vertical.",
    "Press the bar up until your arm is straight above your shoulder.",
    "Lower slowly until your elbow touches the floor.",
    "Finish all reps, then turn around and switch arms."
  ],
  "Landmine single-arm overhead press": [
    "Stand facing the landmine with your feet shoulder-width apart and knees slightly bent, holding the end of the bar in one hand at your shoulder.",
    "Brace your core and squeeze your glutes.",
    "Press the bar up and forward until your arm is straight.",
    "Pause briefly at the top.",
    "Lower the bar under control, finish all reps, then switch arms."
  ],
  "Landmine single-arm push press": [
    "Stand facing the landmine with your feet shoulder-width apart, holding the end of the bar in one hand at your shoulder.",
    "Dip by bending your knees slightly with your torso upright.",
    "Drive up hard through your legs and press the bar up and forward until your arm is straight.",
    "Catch the top with your knees soft.",
    "Lower the bar under control, finish all reps, then switch arms."
  ],
  "Landmine single-arm staggered overhead press": [
    "Stand facing the landmine in a split stance, one leg forward and bent, the other back and straight, holding the end of the bar at the shoulder on the side of the back leg.",
    "Brace your core and squeeze your glutes.",
    "Press the bar up and forward until your arm is straight.",
    "Pause briefly at the top.",
    "Lower the bar under control, finish all reps, then switch your stance and arm."
  ],
  "Landmine single-leg hip thrust": [
    "Rest your upper back on a bench with the padded end of the bar across your hips, one foot flat on the floor and the other leg lifted.",
    "Brace your core and push through the heel of the planted foot.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Landmine single-leg Romanian deadlift": [
    "Stand sideways to the landmine, hold the end of the bar in the hand nearer to it and stand on the leg farther from it.",
    "Hinge forward at the hip, letting your free leg rise straight behind you.",
    "Lower the bar until your torso is about parallel to the floor.",
    "Drive your hips forward and stand tall on the same leg.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Landmine sit-up": [
    "Lie on your back with your feet toward the landmine, knees bent, holding the end of the bar above your chest with straight arms.",
    "Brace your core and tuck your chin slightly.",
    "Curl your torso up until you are sitting upright.",
    "Pause briefly at the top.",
    "Lower your back to the floor slowly."
  ],
  "Landmine snatch": [
    "Stand sideways to the landmine with your feet shoulder-width apart and the end of the bar between them.",
    "Push your hips back with a flat back and grip the end of the bar in one hand.",
    "Extend your hips and knees explosively and pull your elbow high.",
    "Turn your hand under the bar and lock your arm out overhead.",
    "Lower the bar under control, finish all reps, then switch sides."
  ],
  "Landmine split jerk": [
    "Stand facing the landmine with your feet shoulder-width apart, holding the end of the bar in one hand at your shoulder.",
    "Dip by bending your knees slightly with your torso upright.",
    "Drive up hard and press the bar up and forward.",
    "As the bar rises, split your feet front and back and lock your arm out.",
    "Bring your feet back together, lower the bar to your shoulder and repeat."
  ],
  "Landmine split squat": [
    "Stand facing the landmine in a split stance, one foot forward and the other a long step back on its toes, holding the end of the bar at your shoulder with both hands.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Landmine squat": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Landmine staggered Romanian deadlift": [
    "Stand facing the landmine holding the end of the bar with both hands in front of your thighs, one foot flat and the other half a step back on its toes.",
    "Push your hips back and lower the bar with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Landmine sumo deadlift": [
    "Straddle the bar facing away from the landmine with a wide stance, toes turned out, and the end of the bar between your feet.",
    "Bend your knees and hips with a flat back and grip the end of the bar with both hands.",
    "Brace your core and push through your whole foot to lift the bar.",
    "Stand tall with your hips and knees fully extended.",
    "Lower the bar under control by pushing your hips back."
  ],
  "Landmine thruster": [
    "Stand facing the landmine, holding the end of the bar against your upper chest with both hands, elbows tucked in.",
    "Squat down until your thighs are parallel to the floor.",
    "Stand up fast, driving through your whole foot.",
    "Use that momentum to press the bar up and forward until your arms are straight.",
    "Lower the bar to your chest and go straight into the next squat."
  ],
  "Plate goblet deficit reverse lunge": [
    "Stand on a low platform holding the plate against your chest with both hands, feet hip-width apart.",
    "Step one foot back off the platform onto the floor.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot up onto the platform again.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Machine 45-degree calf raise": [
    "Adjust the machine to your body and choose a weight.",
    "Sit in the 45-degree leg press and place the balls of your feet on the bottom edge of the platform, legs almost straight.",
    "Push the platform away by pointing your toes as far as you can.",
    "Pause briefly at the end of the movement.",
    "Let your heels sink slowly toward you for a full stretch."
  ],
  "Machine assisted chin-up": [
    "Set the assistance weight and step onto the machine.",
    "Kneel on the pad and hold the handles underhand, shoulder-width apart, arms straight.",
    "Pull yourself up until your chin is above the handles.",
    "Pause briefly at the end of the movement.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Machine assisted narrow pull-up": [
    "Set the assistance weight and step onto the machine.",
    "Kneel on the pad and hold the handles overhand, hands close together, arms straight.",
    "Pull yourself up until your chin is above the handles.",
    "Pause briefly at the end of the movement.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Machine assisted neutral chin-up": [
    "Set the assistance weight and step onto the machine.",
    "Kneel on the pad and hold the handles with your palms facing each other, arms straight.",
    "Pull yourself up until your chin is above the handles.",
    "Pause briefly at the end of the movement.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Machine bent-arm pec fly": [
    "Adjust the machine to your body and choose a weight.",
    "Sit against the back pad with your elbows bent 90 degrees and your forearms against the two arm pads.",
    "Squeeze the pads together in front of your chest.",
    "Pause briefly at the end of the movement.",
    "Open your arms slowly until you feel a stretch across your chest."
  ],
  "Machine cable V-bar pushdown": [
    "Attach a V-bar to the high pulley and choose a weight.",
    "Stand facing the machine and grip the V-bar overhand with your elbows at your sides.",
    "Push the bar down until your arms are straight.",
    "Squeeze your triceps for a moment.",
    "Let the bar rise slowly to chest height."
  ],
  "Machine chest-supported T-bar row": [
    "Adjust the machine to your body and choose a weight.",
    "Lie with your chest on the angled pad and your feet on the foot plates, grip the handles and lift the bar off its hook.",
    "Pull the handles toward your chest, leading with your elbows.",
    "Squeeze your shoulder blades together at the top.",
    "Lower slowly until your arms are fully straight."
  ],
  "Machine dips": [
    "Adjust the machine to your body and choose a weight.",
    "Sit upright against the back pad, fasten the belt or thigh pad, and grip the handles beside your hips with your elbows pointing back.",
    "Press the handles down until your arms are almost straight.",
    "Pause briefly at the end of the movement.",
    "Let the handles rise slowly until your elbows are bent about 90 degrees."
  ],
  "Machine goblet sissy squat": [
    "Adjust the pads of the sissy squat bench to your leg length.",
    "Stand in the sissy squat bench with the pad behind your lower calves and the roller over your ankles, holding a dumbbell against your chest.",
    "Sit straight back as if onto a chair until your thighs are parallel to the floor.",
    "Pause briefly at the bottom.",
    "Press your calves into the pad and straighten your knees to stand."
  ],
  "Machine hip and glute abduction": [
    "Adjust the machine to your body and choose a weight.",
    "Stand on the platform holding the handles, with the pad against the outside of your working thigh.",
    "Push your leg out to the side as far as you can without leaning.",
    "Pause briefly at the end of the movement.",
    "Bring your leg back slowly beside the other one, finish all reps, then switch legs."
  ],
  "Machine hip and glute adduction": [
    "Adjust the machine to your body and choose a weight.",
    "Stand on the platform holding the handles, with the pad against the inside of your working thigh, that leg held out to the side.",
    "Pull your leg in toward and slightly across the standing leg.",
    "Pause briefly at the end of the movement.",
    "Let your leg move slowly back out to the side, finish all reps, then switch legs."
  ],
  "Machine hip and glute kickback": [
    "Adjust the machine to your body and choose a weight.",
    "Stand on the platform holding the handles, with the pad against the back of your working thigh, that leg lifted in front of you.",
    "Push your leg down and back behind you, squeezing your glute.",
    "Pause briefly at the end of the movement.",
    "Let your leg come slowly forward again, finish all reps, then switch legs."
  ],
  "Machine horizontal leg press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your back against the pad and place both feet flat on the foot plate, shoulder-width apart, knees bent about 90 degrees.",
    "Push through your whole foot until your legs are almost straight.",
    "Pause briefly at the end of the movement.",
    "Bend your knees slowly back to about 90 degrees."
  ],
  "Machine horizontal sissy leg press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your back against the pad and place the balls of your feet low on the foot plate, heels lifted.",
    "Push through the balls of your feet until your legs are almost straight, heels still lifted.",
    "Pause briefly at the end of the movement.",
    "Bend your knees slowly, letting them travel forward past your toes."
  ],
  "Machine neutral overhead press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your back against the pad and grip the handles with your palms facing each other, hands beside your ears.",
    "Press the handles up until your arms are almost straight.",
    "Pause briefly at the end of the movement.",
    "Lower slowly until your hands are beside your ears again."
  ],
  "Machine overhead tricep extension": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with the backs of your upper arms on the pad beside your head and grip the handle behind your head.",
    "Straighten your arms to push the handle up and forward.",
    "Pause briefly at the end of the movement.",
    "Bend your elbows slowly until you feel a stretch in your triceps."
  ],
  "Machine plate-loaded decline chest press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your back against the pad and grip the handles beside your lower chest.",
    "Press the handles forward and down until your arms are almost straight.",
    "Pause briefly at the end of the movement.",
    "Return slowly until your hands are beside your chest."
  ],
  "Machine plate-loaded incline chest press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit back against the reclined pad and grip the handles beside your upper chest.",
    "Press the handles forward and up until your arms are almost straight.",
    "Pause briefly at the end of the movement.",
    "Return slowly until your hands are beside your chest."
  ],
  "Machine plate-loaded kneeling hamstring curl": [
    "Adjust the machine to your body and choose a weight.",
    "Lean your forearms on the front pad, rest one knee on the knee pad and place the back of your other ankle under the roller.",
    "Curl your heel up toward your glute.",
    "Pause briefly at the end of the movement.",
    "Lower slowly until your leg is almost straight, finish all reps, then switch legs."
  ],
  "Machine plate-loaded low row": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your chest against the pad and grip the horizontal handles overhand, arms straight.",
    "Pull the handles toward your lower chest with your elbows flared out.",
    "Squeeze your shoulder blades together.",
    "Return slowly until your arms are straight and your shoulders reach forward."
  ],
  "Machine plate-loaded pulldown": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your thighs under the pads and grip the two handles overhead with your palms facing forward.",
    "Pull the handles down until your upper arms are beside your torso.",
    "Squeeze your lats for a moment at the bottom.",
    "Let the handles rise slowly until your arms are fully straight."
  ],
  "Machine plate-loaded row": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your chest against the pad and your feet flat, and grip the handles with your arms straight.",
    "Pull the handles toward your lower stomach with your elbows close to your body.",
    "Squeeze your shoulder blades together.",
    "Return slowly until your arms are straight."
  ],
  "Machine plate-loaded seal row": [
    "Set the bar hooks to your arm length and load the bar.",
    "Lie face-down on the high bench with your legs straight and grip the bar under it overhand, then lift it off the hooks.",
    "Pull the bar straight up toward the underside of the bench.",
    "Squeeze your shoulder blades together.",
    "Lower slowly until your arms are fully straight."
  ],
  "Machine rear deltoid row": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your chest against the pad and grip the handles overhand with your arms straight out at shoulder height.",
    "Pull your elbows straight back and out, keeping them at shoulder height.",
    "Squeeze the back of your shoulders for a moment.",
    "Return slowly until your arms are straight."
  ],
  "Machine reverse hyperextension": [
    "Adjust the machine to your body and choose a weight.",
    "Lie face-down with your hips at the edge of the pad, grip the handles and hook your ankles under the roller or strap.",
    "Lift your straight legs back and up until they are level with your torso.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your legs slowly under the pad."
  ],
  "Machine seated shrug": [
    "Adjust the machine to your body and choose a weight.",
    "Sit upright and grip the handles at your sides with your arms straight.",
    "Shrug your shoulders straight up toward your ears.",
    "Pause for a second at the top.",
    "Lower your shoulders slowly to a full stretch."
  ],
  "Machine single-leg leg press": [
    "Adjust the machine to your body and choose a weight.",
    "Sit in the leg press and place one foot in the middle of the platform; rest the other foot on the floor.",
    "Push through your whole foot until your leg is almost straight.",
    "Pause briefly without locking your knee.",
    "Lower slowly, stopping before your lower back rounds; finish all reps, then switch legs."
  ],
  "Machine sissy squat": [
    "Adjust the pads of the sissy squat bench to your leg length.",
    "Stand in the sissy squat bench with the pad behind your lower calves and the roller over your ankles, arms crossed over your chest.",
    "Sit straight back as if onto a chair until your thighs are parallel to the floor.",
    "Pause briefly at the bottom.",
    "Press your calves into the pad and straighten your knees to stand."
  ],
  "Machine standing plate-loaded preacher curl": [
    "Adjust the machine to your body and choose a weight.",
    "Stand behind the slanted pad, rest the backs of your upper arms on it and grip the handles underhand.",
    "Curl the handles up until your elbows are fully bent.",
    "Squeeze your biceps for a moment at the top.",
    "Lower slowly, stopping just before the weight rests."
  ],
  "Machine underhand row": [
    "Adjust the machine to your body and choose a weight.",
    "Sit with your chest against the pad and grip the handles with your palms facing up, arms straight.",
    "Pull the handles toward your lower stomach with your elbows close to your body.",
    "Squeeze your shoulder blades together.",
    "Return slowly until your arms are straight."
  ],
  "Cable calf raise": [
    "Attach a straight bar to the low pulley, stand up with it, step back and hold it in front of your thighs with straight arms.",
    "Start with your heels low and your calves stretched.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top.",
    "Lower your heels slowly to a full stretch."
  ],
  "Cable belt squat": [
    "Put on a dip belt, clip it to the low pulley and step back; stand with your feet shoulder-width apart.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Cable belt split squat": [
    "Put on a dip belt, clip it to the low pulley and step back; take a split stance, one foot forward and the other a long step back on its toes.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Cable belt calf raise": [
    "Put on a dip belt, clip it to the low pulley and step back; stand tall with your feet hip-width apart.",
    "Start with your heels low and your calves stretched.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top.",
    "Lower your heels slowly to a full stretch."
  ],
  "Cable bar Romanian deadlift": [
    "Attach a straight bar to the low pulley, stand up with it and step back, holding it overhand in front of your thighs.",
    "Push your hips back and lower the bar along your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, around mid-shin.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Cable bar staggered Romanian deadlift": [
    "Attach a straight bar to the low pulley, stand up with it and step back; place one foot flat and the other half a step back on its toes.",
    "Push your hips back and lower the bar with a flat back.",
    "Stop when you feel a strong stretch in the hamstring of your front leg.",
    "Drive your hips forward and stand tall.",
    "Finish all reps, then switch sides."
  ],
  "Cable goblet squat": [
    "Attach a straight bar to the low pulley, hold it at your upper chest with your palms up and your elbows directly under it, then step back.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Cable Zercher squat": [
    "Attach a straight bar to the low pulley, rest it in the crooks of your elbows against your stomach, then step back.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Cable Zercher good morning": [
    "Attach a straight bar to the low pulley, rest it in the crooks of your elbows against your stomach, then step back with your feet hip-width apart.",
    "Brace your core and push your hips straight back.",
    "Lean forward with a flat back until your torso is close to parallel with the floor.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Cable split squat": [
    "Attach a straight bar to the low pulley, step back holding it at arm's length, and take a split stance with one foot forward and the other on its toes behind.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Cable single-leg deadlift": [
    "Attach a straight bar to the low pulley, stand up with it, step back and shift your weight onto one leg.",
    "Hinge forward at the hip, letting your free leg rise straight behind you.",
    "Lower the bar until your torso is about parallel to the floor.",
    "Drive your hips forward and stand tall on the same leg.",
    "Finish all reps, then switch sides."
  ],
  "Cable elevated deadlift": [
    "Stand on a low box facing the low pulley, holding a handle in each hand, and stand up tall.",
    "Push your hips back and lower the handles along your legs with a flat back.",
    "Stop when you feel a strong stretch in your hamstrings, your hands below the top of the box.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Cable thruster": [
    "Stand between two low pulleys with your feet shoulder-width apart, holding a handle in each hand at your shoulders.",
    "Squat down until your thighs are parallel to the floor.",
    "Stand up fast, driving through your whole foot.",
    "Use that momentum to press the handles straight overhead.",
    "Lower the handles to your shoulders and go straight into the next squat."
  ],
  "Cable hamstring curl": [
    "Strap your ankle to the low pulley and stand facing the machine, holding it for balance.",
    "Stand on the other leg with both thighs vertical.",
    "Bend your knee and pull your heel up toward your glute.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable single-leg laying leg curl": [
    "Place a bench in front of the low pulley, strap your ankle to it and lie face-down with your feet toward the machine.",
    "Hold the bench and start with your legs straight.",
    "Bend your knee and pull your heel toward your glute.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable seated leg curl": [
    "Set the pulley at about head height when seated, strap your ankle to it and sit on a bench facing the machine.",
    "Hold the bench and start with your working leg straight out in front of you.",
    "Bend your knee and pull your foot down and back under the bench.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable seated leg extension": [
    "Sit on the end of a bench facing away from the low pulley, with the cable running under the bench to a strap on your ankle.",
    "Hold the bench and start with your knee bent 90 degrees.",
    "Straighten your knee until your leg is level.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable standing leg extension": [
    "Set the pulley at hip height, strap your ankle to it and stand facing away from the machine.",
    "Lift your working thigh forward and bend that knee fully.",
    "Straighten your knee, kicking your foot forward.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable standing mid kickback": [
    "Set the pulley about halfway between the floor and your hips, strap your ankle to it and stand facing the machine, holding it.",
    "Lean forward slightly and start with your working knee bent in front of you.",
    "Push your foot straight back, extending your hip.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable bench straight-leg kickback": [
    "Set the pulley at hip height, strap your ankle to it and place both hands and your other knee on a bench in front of the machine.",
    "Keep your back flat and let your working leg hang straight down.",
    "Lift your straight leg back until it is level with your back.",
    "Squeeze for a moment.",
    "Return slowly, finish all reps, then switch legs."
  ],
  "Cable bench chest fly": [
    "Place a flat bench between two low pulleys, lie back on it and hold a handle in each hand.",
    "Start with your arms out to the sides and a slight bend in your elbows.",
    "Sweep both arms in a wide arc until your hands meet in front of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arms slowly until you feel a stretch across your chest."
  ],
  "Cable bench press": [
    "Place a flat bench between two low pulleys, lie back on it and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles straight up until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable decline bench chest fly": [
    "Place a decline bench between two low pulleys, lie back on it and hold a handle in each hand.",
    "Start with your arms out to the sides and a slight bend in your elbows.",
    "Sweep both arms in a wide arc until your hands meet in front of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arms slowly until you feel a stretch across your chest."
  ],
  "Cable decline bench press": [
    "Place a decline bench between two low pulleys, lie back on it and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles straight up until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable incline bench press": [
    "Place an incline bench between two low pulleys, lie back on it and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles straight up until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable single-arm bench chest fly": [
    "Place a flat bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with your arm out to the side and a slight bend in your elbow.",
    "Sweep your arm in a wide arc until your hand is in front of the middle of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arm slowly until you feel a stretch across your chest, finish all reps, then switch arms."
  ],
  "Cable single-arm bench press": [
    "Place a flat bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle straight up until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable single-arm decline bench chest fly": [
    "Place a decline bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with your arm out to the side and a slight bend in your elbow.",
    "Sweep your arm in a wide arc until your hand is in front of the middle of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arm slowly until you feel a stretch across your chest, finish all reps, then switch arms."
  ],
  "Cable decline single-arm bench press": [
    "Place a decline bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle straight up until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable single-arm incline bench press": [
    "Place an incline bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle straight up until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable single-arm incline chest fly": [
    "Place an incline bench between two low pulleys, lie back on it and hold one handle; rest your other hand on your stomach.",
    "Start with your arm out to the side and a slight bend in your elbow.",
    "Sweep your arm in a wide arc until your hand is in front of the middle of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arm slowly until you feel a stretch across your chest, finish all reps, then switch arms."
  ],
  "Cable chest press": [
    "Set both pulleys at chest height, stand between them facing away in a staggered stance and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles straight forward until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable standing decline chest press": [
    "Set both pulleys at the top, stand between them facing away in a staggered stance and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles forward and down until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable standing incline chest press": [
    "Set both pulleys at the bottom, stand between them facing away in a staggered stance and hold a handle in each hand.",
    "Start with the handles beside your chest and your elbows bent.",
    "Press both handles forward and up until your arms are almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handles back slowly beside your chest."
  ],
  "Cable standing single-arm chest press": [
    "Set the pulley at chest height, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle straight forward until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable standing single-arm incline chest fly": [
    "Set the pulley at the bottom, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with your arm out to the side and a slight bend in your elbow.",
    "Sweep your arm in a wide arc until your hand is in front of the middle of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arm slowly until you feel a stretch across your chest, finish all reps, then switch arms."
  ],
  "Cable standing single-arm incline chest press": [
    "Set the pulley at the bottom, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle forward and up until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable braced single-arm chest fly": [
    "Set the pulley at shoulder height, stand sideways to it, hinge forward slightly and hold a stable support with your far hand; hold the handle in the hand nearer the machine.",
    "Start with your arm out to the side and a slight bend in your elbow.",
    "Sweep your arm in a wide arc until your hand is in front of the middle of your chest.",
    "Squeeze your chest for a moment.",
    "Open your arm slowly until you feel a stretch across your chest, finish all reps, then switch arms."
  ],
  "Cable braced single-arm chest press": [
    "Set the pulley at chest height, stand sideways to it, hinge forward slightly and hold a stable support with your far hand; hold the handle in the hand nearer the machine.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle across your body until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable decline press around": [
    "Set the pulley slightly above shoulder height, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle forward and down in an arc, finishing across your body until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable incline press around": [
    "Set the pulley at hip height, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with the handle beside your chest and your elbow bent.",
    "Press the handle forward and up in an arc, finishing across your body until your arm is almost straight.",
    "Squeeze your chest for a moment.",
    "Bring the handle back slowly beside your chest, finish all reps, then switch arms."
  ],
  "Cable incline fly around": [
    "Set the pulley at hip height, stand facing away from it in a staggered stance and hold the handle in one hand.",
    "Start with your arm down and out to the side, elbow slightly bent.",
    "Sweep your arm forward and up in an arc until your hand is in front of the opposite shoulder.",
    "Squeeze your chest for a moment.",
    "Return slowly along the same arc, finish all reps, then switch arms."
  ],
  "Cable standing Svend press": [
    "Set both pulleys at the bottom, stand between them facing away and press the two handles together in front of your chest.",
    "Brace your core and keep squeezing the handles together.",
    "Push your hands straight forward until your arms are straight.",
    "Pause briefly at arm's length.",
    "Bring your hands slowly back to your chest, still squeezing."
  ],
  "Cable push pull": [
    "Set both pulleys at chest height and stand between them sideways, so one is in front of you and one behind, in a staggered stance.",
    "Hold the front handle with one arm straight and the rear handle beside your chest with the other.",
    "Pull the front handle to your ribs while you press the rear handle straight forward.",
    "Reverse both arms slowly to the start.",
    "Finish all reps, then turn around and switch arms."
  ],
  "Cable quadruped hip abduction": [
    "Strap your ankle to the low pulley and get on your hands and knees sideways to the machine, the strapped leg on the far side.",
    "Brace your core with your back flat.",
    "Lift your bent knee out to the side until your thigh is level with your hip.",
    "Pause briefly at the top.",
    "Lower slowly, finish all reps, then turn around and switch legs."
  ],
  "Cable archer row": [
    "Set the pulley at shoulder height and hold the handle in one hand, facing the machine.",
    "Step back with the foot on the working side and turn your body slightly open.",
    "Pull your elbow straight back at shoulder height, flaring it out.",
    "Squeeze your shoulder blade back for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable kayak row": [
    "Attach a straight bar to the high pulley, grip it overhand and step back.",
    "Push your hips back and lean forward with your arms reaching up toward the pulley.",
    "Sweep the bar down to one side until that hand is beside your hip.",
    "Let the bar rise slowly back to the top.",
    "Sweep it down to the other side and keep alternating."
  ],
  "Cable pull in": [
    "Set the pulley at the top, stand sideways to the machine a few steps away and hold the handle in the nearer hand, palm up.",
    "Start with your arm reaching up and out toward the pulley.",
    "Pull your elbow down and in until it touches your ribs.",
    "Squeeze your lat for a moment.",
    "Let your arm rise slowly to a full stretch, finish all reps, then switch arms."
  ],
  "Cable pull around": [
    "Set the pulley at or near the top and kneel on one knee sideways to the machine.",
    "Reach across your body with the far hand and grip the handle.",
    "Pull your elbow down and around toward your hip on that side.",
    "Squeeze your lat for a moment.",
    "Let your arm reach slowly back across your body, finish all reps, then switch arms."
  ],
  "Cable kneeling bilateral pull in": [
    "Set both pulleys at the top and kneel between them with a handle in each hand, palms up.",
    "Start with your arms reaching up and out in a wide Y.",
    "Pull both elbows down and in until they touch your ribs.",
    "Squeeze your lats for a moment.",
    "Let your arms rise slowly to a full stretch."
  ],
  "Cable kneeling straight-arm pull in": [
    "Set the pulley at the top, kneel on both knees sideways to the machine a few steps away and hold the handle in the nearer hand.",
    "Start with your arm reaching up and out toward the pulley, palm facing down.",
    "Sweep your straight arm down in an arc until your hand is beside your hip.",
    "Squeeze your lat for a moment.",
    "Let your arm rise slowly to a full stretch, finish all reps, then switch arms."
  ],
  "Cable standing bilateral pull in": [
    "Set both pulleys at the top and stand between them with a handle in each hand, palms up.",
    "Start with your arms reaching up and out in a wide Y.",
    "Pull both elbows down and in until they touch your ribs.",
    "Squeeze your lats for a moment.",
    "Let your arms rise slowly to a full stretch."
  ],
  "Cable standing bilateral straight-arm pull in": [
    "Set both pulleys at the top and stand between them with a handle in each hand, palms down.",
    "Start with your arms reaching up and out in a wide Y.",
    "Sweep both straight arms down in an arc until your hands are beside your hips.",
    "Squeeze your lats for a moment.",
    "Let your arms rise slowly to a full stretch."
  ],
  "Cable straight-arm pull in": [
    "Set the pulley at the top, stand sideways to the machine a few steps away and hold the handle in the nearer hand.",
    "Start with your arm reaching up and out toward the pulley, palm facing forward.",
    "Sweep your straight arm down in an arc until your hand is beside your hip.",
    "Squeeze your lat for a moment.",
    "Let your arm rise slowly to a full stretch, finish all reps, then switch arms."
  ],
  "Cable single-arm lat prayer": [
    "Set the pulley at the top, hold the handle in one hand and take a few steps back.",
    "Push your hips back and lean forward until your arm is in line with your ear.",
    "Sweep your straight arm down to your hip while you bring your hips forward and stand up.",
    "Squeeze your lat for a moment.",
    "Let your arm rise slowly as you lean forward again, finish all reps, then switch arms."
  ],
  "Cable bent-over bar pullover": [
    "Attach a straight bar to the high pulley, grip it overhand and take a few steps back.",
    "Push your hips back and lean forward until your arms are in line with your ears.",
    "Sweep the bar down in an arc to your thighs with straight arms.",
    "Squeeze your lats for a moment.",
    "Let the bar rise slowly until your lats are fully stretched."
  ],
  "Cable row bar standing row": [
    "Set the pulley at chest height and attach a close-grip row handle.",
    "Grip it with both hands, step back and stand with your knees slightly bent and your arms straight.",
    "Pull the handle to your stomach, driving your elbows back close to your sides.",
    "Squeeze your back for a moment.",
    "Return slowly until your arms are straight."
  ],
  "Cable single-arm neutral-grip row": [
    "Set the pulley at chest height, hold the handle in one hand with your palm facing in and step back into a staggered stance.",
    "Start with your arm straight and your chest up.",
    "Pull the handle to the side of your stomach, driving your elbow back.",
    "Squeeze your back for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable single-arm underhand-grip row": [
    "Set the pulley at chest height, hold the handle in one hand with your palm facing up and step back into a staggered stance.",
    "Start with your arm straight and your chest up.",
    "Pull the handle to the side of your stomach, driving your elbow back.",
    "Squeeze your back for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable supinating row": [
    "Set the pulley at chest height, hold the handle in one hand with your palm facing down and step back into a staggered stance.",
    "Start with your arm straight and your chest up.",
    "Pull the handle to the side of your stomach, turning your palm up as your elbow travels back.",
    "Squeeze your back for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable single-arm rear delt row": [
    "Set the pulley at chest height and hold the handle overhand in one hand, facing the machine.",
    "Step back and a little to the working side, so the cable crosses slightly in front of you.",
    "Pull your elbow back and out at shoulder height until your upper arm is in line with your shoulders.",
    "Squeeze the back of your shoulder for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable standing single-arm cross rear delt row": [
    "Set the pulley at chest height and stand sideways to the machine.",
    "Reach across your chest with the far hand and hold the handle.",
    "Pull the handle outward and back across your chest, leading with your elbow.",
    "Squeeze the back of your shoulder for a moment.",
    "Return slowly across your chest, finish all reps, then switch arms."
  ],
  "Cable silverback shrug": [
    "Attach a straight bar to the low pulley, grip it overhand and stand up.",
    "Take a couple of steps back and stand upright with your arms straight.",
    "Let the cable pull your shoulders forward so your shoulder blades spread apart.",
    "Squeeze your shoulder blades back together and push your chest out.",
    "Hold for a moment, then let your shoulders round forward slowly."
  ],
  "Cable single-arm 30-degree shrug": [
    "Set the pulley at the bottom and stand sideways to the machine, a step away, with the nearer hand holding the handle.",
    "Let your arm hang straight, angled about 30 degrees out from your body.",
    "Shrug your shoulder up and in toward your ear.",
    "Pause briefly at the top.",
    "Lower your shoulder slowly all the way down, finish all reps, then switch arms."
  ],
  "Cable leaning single-arm skullover": [
    "Set the pulley at head height, hold the handle in one hand and face away from the machine in a staggered stance.",
    "Lean your torso slightly forward and straighten your arm overhead.",
    "Bend your elbow until your forearm touches your biceps, then let your upper arm move back beside your head.",
    "Bring your elbow forward again, then straighten your arm.",
    "Finish all reps, then switch sides."
  ],
  "Cable behind-the-back lateral raise": [
    "Set the pulley at the bottom and stand sideways to the machine with the cable running behind your body.",
    "Hold the handle in the far hand behind your hip and hold the machine with the other hand.",
    "Raise your arm out to the side until it is level with your shoulder.",
    "Pause briefly at the top.",
    "Lower slowly behind your hip, finish all reps, then switch arms."
  ],
  "Cable low bilateral lateral raise": [
    "Set both pulleys at the bottom and stand between them.",
    "Take the left handle in your right hand and the right handle in your left, so the cables cross in front of you.",
    "Raise both arms out to the sides until they are level with your shoulders.",
    "Pause briefly at the top.",
    "Lower slowly until your hands are in front of your hips."
  ],
  "Cable rope front raise": [
    "Attach a rope to the low pulley and stand facing away from the machine with the cable between your legs.",
    "Hold one end of the rope in each hand in front of your thighs.",
    "Raise your straight arms forward until your fists are at eye level.",
    "Pause briefly at the top.",
    "Lower slowly to your thighs."
  ],
  "Cable rope mid lateral raise": [
    "Set the pulley at the height of your fist when your arm hangs at your side, and attach a rope.",
    "Stand sideways to the machine and hold the rope in the far hand, the cable crossing in front of you.",
    "Raise your arm out to the side until it is level with your shoulder.",
    "Pause briefly at the top.",
    "Lower slowly across your body, finish all reps, then switch arms."
  ],
  "Cable overhead press": [
    "Set both pulleys at the bottom and stand between them with a handle in each hand.",
    "Bring the handles to shoulder height with your palms facing forward.",
    "Press both handles straight overhead until your arms are straight.",
    "Pause briefly at the top.",
    "Lower the handles slowly to your shoulders."
  ],
  "Cable upright row": [
    "Attach a straight bar to the low pulley, grip it overhand with your hands a little narrower than your shoulders and stand tall.",
    "Start with your arms straight and the bar in front of your thighs.",
    "Pull your elbows straight up until the bar is just below your chin.",
    "Pause briefly at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Cable bilateral cross upright row": [
    "Set both pulleys at the bottom and stand between them.",
    "Take the left handle in your right hand and the right handle in your left, so the cables cross in front of you.",
    "Pull both handles up, leading with your elbows, until your hands reach chest height.",
    "Pause briefly at the top.",
    "Lower the handles slowly until your arms are straight."
  ],
  "Cable high single-arm rear delt fly": [
    "Set the pulley at the top and stand sideways to the machine, a step away.",
    "Reach across your body with the far hand and grip the handle or the end of the cable.",
    "Sweep your arm out to the side until it is in line with your shoulders.",
    "Squeeze the back of your shoulder for a moment.",
    "Return slowly across your body, finish all reps, then switch arms."
  ],
  "Cable rope kneeling face pull": [
    "Attach a rope to the high pulley, hold one end in each hand and step back.",
    "Drop to a half-kneeling position with your arms straight toward the pulley.",
    "Pull the middle of the rope toward the bridge of your nose, spreading the ends apart.",
    "Squeeze the back of your shoulders for a moment.",
    "Return slowly until your arms are straight."
  ],
  "Cable seated rope face pull": [
    "Attach a rope to a pulley set at head height when you are seated, and place a bench in front of it.",
    "Sit facing the machine and hold the rope with your palms facing each other and your arms straight.",
    "Pull the rope toward your upper face, flaring your elbows out.",
    "Squeeze the back of your shoulders for a moment.",
    "Return slowly until your arms are straight."
  ],
  "Cable single-arm face pull": [
    "Set the pulley at shoulder height and hold the handle in one hand, facing the machine.",
    "Step back into a staggered stance with your arm straight.",
    "Pull the handle toward the side of your face, driving your elbow out and back.",
    "Squeeze the back of your shoulder for a moment.",
    "Return slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable bar reverse-grip curl": [
    "Attach a straight bar to the low pulley, grip it overhand at shoulder width and stand tall facing the machine.",
    "Start with your arms straight and your elbows at your sides.",
    "Curl the bar up to chest height, knuckles leading.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Cable bilateral Bayesian curl": [
    "Clip two handles to the low pulley, take one in each hand and face away from the machine.",
    "Step forward into a staggered stance until both arms are pulled back behind your body, palms forward.",
    "Curl both handles up toward your shoulders without moving your upper arms.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Cable single-arm Bayesian curl": [
    "Set the pulley at the bottom, hold the handle in one hand and face away from the machine.",
    "Step forward into a staggered stance until your arm is pulled back behind your body, palm forward.",
    "Curl the handle up toward your shoulder without moving your upper arm.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable high Bayesian curl": [
    "Set the pulley at about elbow height, hold the handle in one hand and face away from the machine.",
    "Step forward into a staggered stance until your arm is pulled straight back behind you, palm up.",
    "Curl the handle up toward your shoulder without moving your upper arm.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable seated Bayesian curl": [
    "Place a bench in front of the low pulley, hold the handle in one hand and sit facing away from the machine.",
    "Sit tall with your arm pulled back behind your body, palm forward.",
    "Curl the handle up toward your shoulder without moving your upper arm.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable high single-arm rolling curl": [
    "Set the pulley at about elbow height, hold the handle underhand in one hand and face away from the machine.",
    "Step forward into a staggered stance with your arm straight behind you.",
    "Curl the handle to your shoulder while you hinge forward at the hips.",
    "Straighten your elbow slowly while you stand back up.",
    "Finish all reps, then switch sides."
  ],
  "Cable bilateral cross curl": [
    "Set both pulleys at the bottom and stand between them with a handle in each hand, palms forward.",
    "Start with your arms straight and slightly out from your sides.",
    "Curl both hands up and inward so your forearms cross in front of your chest.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arms are straight."
  ],
  "Cable bilateral high curl": [
    "Set both pulleys at the top and stand between them with a handle in each hand, palms up.",
    "Start with your arms straight out to the sides at shoulder height.",
    "Curl both handles toward your head without dropping your elbows.",
    "Squeeze for a moment at the top.",
    "Straighten your arms slowly back out to the sides."
  ],
  "Cable single-arm hammer curl": [
    "Set the pulley at the bottom and hold the handle in one hand with your thumb on top, facing the machine.",
    "Stand tall with your arm straight and your elbow at your side.",
    "Curl the handle up to the front of your shoulder, thumb leading.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable single-arm reverse curl": [
    "Set the pulley at the bottom and hold the handle in one hand with your palm facing down, facing the machine.",
    "Stand tall with your arm straight and your elbow at your side.",
    "Curl the handle up to the front of your shoulder, knuckles leading.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable twisting curl": [
    "Set the pulley at the bottom and hold the handle in one hand with your thumb on top, facing the machine.",
    "Stand tall with your arm straight and your elbow at your side.",
    "Curl the handle up to your shoulder, turning your palm up on the way.",
    "Squeeze for a moment at the top.",
    "Lower slowly until your arm is straight, finish all reps, then switch arms."
  ],
  "Cable bar reverse-grip pushdown": [
    "Attach a straight bar to the high pulley and grip it underhand at shoulder width.",
    "Stand close, lean slightly forward and pin your elbows to your sides.",
    "Push the bar down until your arms are straight.",
    "Squeeze your triceps for a moment.",
    "Let the bar rise slowly to chest height."
  ],
  "Cable bar rolling pushdown": [
    "Attach a straight bar to the high pulley and grip it overhand at shoulder width.",
    "Start with your elbows bent and lifted forward, the bar in front of your forehead.",
    "Pull your elbows down to your sides, like a pullover.",
    "Then straighten your arms and push the bar down to your thighs.",
    "Return slowly in reverse: bend your elbows, then let them rise forward."
  ],
  "Cable bar skull crusher": [
    "Attach a straight bar to the high pulley, grip it overhand and turn to face away from the machine.",
    "Step into a staggered stance, lean slightly forward and raise your elbows so the bar is just behind your head.",
    "Straighten your elbows until your arms are straight.",
    "Squeeze your triceps for a moment.",
    "Bend your elbows slowly until the bar is behind your head again."
  ],
  "Cable bent-over single-arm overhead tricep extension": [
    "Set the pulley at hip height, hold the handle in one hand and face away from the machine.",
    "Step into a staggered stance and hinge at your hips until your torso is nearly level, hand behind your head.",
    "Straighten your elbow until your arm reaches forward in line with your torso.",
    "Squeeze your triceps for a moment.",
    "Bend your elbow slowly back to the start, finish all reps, then switch arms."
  ],
  "Cable bilateral cross skull crusher": [
    "Set both pulleys at the top and stand between them.",
    "Take the left handle in your right hand and the right handle in your left, and raise your elbows so your hands are beside your ears.",
    "Straighten both elbows until your arms are straight above your head.",
    "Squeeze your triceps for a moment.",
    "Bend your elbows slowly back to the start."
  ],
  "Cable cross pushdown": [
    "Set both pulleys at the top and stand between them.",
    "Take the left cable in your right hand and the right cable in your left, with or without handles, so they cross in front of your chest.",
    "Straighten both elbows, pushing your hands down and out to your thighs.",
    "Squeeze your triceps for a moment.",
    "Let your hands rise slowly until they cross in front of your chest."
  ],
  "Cable overhead tricep press": [
    "Set the pulley at mid-back height, attach a bar and grip it overhand facing away from the machine.",
    "Step into a staggered stance with the bar behind your neck and your elbows pointing forward.",
    "Press the bar up toward the ceiling until your arms are straight.",
    "Squeeze your triceps for a moment.",
    "Lower slowly, pushing your elbows forward as the bar comes down behind your neck."
  ],
  "Cable single-arm cross pushdown": [
    "Set the pulley at the top and stand sideways to the machine, a step away.",
    "Reach across your chest with the far hand and grip the handle or the end of the cable.",
    "Straighten your elbow, pushing your hand down and out to your thigh.",
    "Squeeze your triceps for a moment.",
    "Let your hand rise slowly back across your chest, finish all reps, then switch arms."
  ],
  "Cable single-arm overhead tricep extension": [
    "Set the pulley at mid-back height, hold the handle in one hand and face away from the machine.",
    "Step into a staggered stance and raise your elbow beside your ear, hand behind your neck.",
    "Straighten your elbow until your fist points at the ceiling.",
    "Squeeze your triceps for a moment.",
    "Bend your elbow slowly back to the start, finish all reps, then switch arms."
  ],
  "Cable single-arm pushdown": [
    "Set the pulley at the top and hold the handle overhand in one hand, facing the machine.",
    "Stand close and pin your elbow to your side, hand at chest height.",
    "Push the handle down until your arm is straight.",
    "Squeeze your triceps for a moment.",
    "Let the handle rise slowly to chest height, finish all reps, then switch arms."
  ],
  "Cable single-arm skull crusher": [
    "Set the pulley at the top, hold the handle in one hand and face away from the machine.",
    "Step into a staggered stance, lean slightly forward and raise your elbow so your hand is just behind your head.",
    "Straighten your elbow until your arm is straight.",
    "Squeeze your triceps for a moment.",
    "Bend your elbow slowly back to the start, finish all reps, then switch arms."
  ],
  "Cable standing crunch": [
    "Attach a rope to the high pulley, hold one end in each hand beside your ears and face away from the machine.",
    "Walk a few steps forward and stand with your knees slightly bent.",
    "Push your hips back a little and crunch your chest down toward your hips.",
    "Squeeze your abs for a moment.",
    "Return slowly to standing."
  ],
  "Cable kneeling oblique crunch": [
    "Attach a rope to the high pulley and kneel sideways to the machine.",
    "Hold the rope behind your head with your elbows pointing out.",
    "Crunch your torso sideways, bringing your elbow toward your hip on the machine side.",
    "Squeeze your side for a moment.",
    "Return slowly to upright, finish all reps, then turn around and switch sides."
  ],
  "Cable oblique pushdown": [
    "Set the pulley just above head height and stand sideways to the machine, holding the handle in the nearer hand.",
    "Push the handle down beside your thigh until your arm is straight.",
    "Keeping your arm straight, crunch sideways and reach the handle toward your knee.",
    "Return slowly to upright and let your elbow bend again.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable side bend": [
    "Set the pulley at the bottom and stand sideways to the machine, holding the handle in the nearer hand.",
    "Stand tall with your arm straight and your other hand on your hip.",
    "Let the handle pull your torso sideways toward the machine.",
    "Bend back up and a little past upright, away from the machine.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable Pallof press": [
    "Set the pulley at chest height, hold the handle with both hands and stand sideways to the machine, a step away.",
    "Hold your fists against the middle of your chest and brace your core.",
    "Press the handle straight forward until your arms are straight, without letting your torso turn.",
    "Hold for a moment, then bring the handle slowly back to your chest.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable kneeling Pallof press": [
    "Set the pulley at chest height, hold the handle with both hands and kneel on both knees sideways to the machine, a step away.",
    "Hold your fists against the middle of your chest and brace your core.",
    "Press the handle straight forward until your arms are straight, without letting your torso turn.",
    "Hold for a moment, then bring the handle slowly back to your chest.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable Pallof press rotation": [
    "Set the pulley at chest height, hold the handle with both hands and stand sideways to the machine, a step away.",
    "Hold your fists against the middle of your chest and brace your core.",
    "Press the handle straight forward until your arms are straight.",
    "Rotate your shoulders and arms away from the machine, then come back to the centre.",
    "Bring the handle back to your chest, finish all reps, then turn around and switch sides."
  ],
  "Cable kneeling Pallof press to wood chopper": [
    "Set the pulley at chest height, hold the handle with both hands and kneel on both knees sideways to the machine, a step away.",
    "Hold your fists against the middle of your chest and brace your core.",
    "Press the handle straight forward until your arms are straight.",
    "Rotate your torso and pull the handle diagonally down to the outside of your far hip.",
    "Return to the centre, bring the handle to your chest, finish all reps, then switch sides."
  ],
  "Cable standing low-to-high wood chopper": [
    "Set the pulley at the bottom, hold the handle with both hands and stand sideways to the machine with your feet wide.",
    "Start with your hands low beside the hip nearer the machine and your torso turned toward it.",
    "Rotate your torso and lift the handle diagonally up above your far shoulder.",
    "Return slowly along the same path.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable half-kneeling high-to-low wood chopper": [
    "Set the pulley just above head height, hold the handle with both hands and kneel sideways to the machine on the knee farther from it, the other foot flat in front.",
    "Start with your arms reaching up toward the pulley and your torso turned toward it.",
    "Rotate your torso and pull the handle diagonally down to the outside of your far hip.",
    "Return slowly along the same path.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable half-kneeling low-to-high wood chopper": [
    "Set the pulley at the bottom, hold the handle with both hands and kneel sideways to the machine on the knee farther from it, the other foot flat in front.",
    "Start with your hands low beside the hip nearer the machine and your torso turned toward it.",
    "Rotate your torso and lift the handle diagonally up above your far shoulder.",
    "Return slowly along the same path.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable half-kneeling wood chopper": [
    "Set the pulley at chest height, hold the handle with both hands and kneel sideways to the machine on the knee farther from it, the other foot flat in front.",
    "Start with your arms straight out toward the machine at chest height.",
    "Rotate your torso and sweep the handle level across your body to the far side.",
    "Return slowly along the same path.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Cable kneeling wood chopper": [
    "Set the pulley at chest height, hold the handle with both hands and kneel on both knees sideways to the machine.",
    "Start with your arms straight out toward the machine at chest height.",
    "Rotate your torso and sweep the handle level across your body to the far side.",
    "Return slowly along the same path.",
    "Finish all reps, then turn around and switch sides."
  ],
  "Bodyweight lateral lunge": [
    "Stand tall with your feet together and your hands clasped in front of your chest.",
    "Take a wide step straight out to one side.",
    "Bend that knee and sit your hips back, keeping the other leg straight.",
    "Push off the bent leg to return to standing.",
    "Do the same number of reps on each side."
  ],
  "Bodyweight reverse lunge": [
    "Stand tall with your feet hip-width apart and your hands on your hips.",
    "Take a long step straight back with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through your front foot and bring the back foot forward to stand.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Bodyweight forward lunge": [
    "Stand tall with your feet hip-width apart and your hands on your hips.",
    "Take a long step straight forward with one foot.",
    "Bend both knees until the back knee is just above the floor.",
    "Push off your front foot to step back to standing.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Bodyweight deficit reverse lunge": [
    "Stand tall on a low platform with your feet together and your hands on your hips.",
    "Step one foot back and down onto the floor behind the platform.",
    "Bend both knees until the back knee is just above the floor.",
    "Push through the front foot and bring the back foot up onto the platform.",
    "Repeat on the same leg, or alternate, for the same number of reps each side."
  ],
  "Bodyweight step-down": [
    "Stand on one foot at the edge of a box with the other foot hanging off the side.",
    "Bend the standing knee slowly and lower the hanging heel toward the floor.",
    "Touch the floor lightly with your heel without putting weight on it.",
    "Push through the foot on the box and stand tall again.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight reverse step-up": [
    "Stand facing away from a low box and place the ball of one foot on it behind you.",
    "Shift your weight back onto that foot.",
    "Straighten that knee until you are standing tall on top of the box.",
    "Lower the other foot slowly back to the floor in front of the box.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight kickstand squat": [
    "Stand with one foot flat and the toes of the other foot beside its heel, heel raised, hands clasped in front of your chest.",
    "Brace your core and bend your knees and hips together.",
    "Lower until your thighs are about parallel to the floor.",
    "Push through your whole foot to stand back up.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight single-leg squat": [
    "Stand on one leg with the other leg held straight out in front, arms reaching forward.",
    "Bend the standing knee and sit your hips down and back.",
    "Go as low as you can while the front leg stays off the floor.",
    "Push through your whole foot to stand back up.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight skater squat": [
    "Stand on one leg with the other knee bent and its foot lifted behind you.",
    "Bend the standing knee, lean forward and reach both arms out in front.",
    "Lower until the back knee is just above the floor behind your heel.",
    "Push through the standing foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight assisted sissy squat": [
    "Stand tall beside a post with your feet hip-width apart and hold it with one hand at hip height.",
    "Rise onto your toes and let your knees travel forward.",
    "Lean your straight body back as your knees sink forward and down.",
    "Stop when you can no longer keep the straight line.",
    "Push through the balls of your feet and straighten your knees to stand."
  ],
  "Bodyweight split squat": [
    "Stand in a long split stance with your front foot flat, your back foot on its toes and your hands on your hips.",
    "Bend both knees and lower straight down.",
    "Stop when your back knee is just above the floor.",
    "Push through your front foot to rise.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight heels-up squat": [
    "Stand with your heels raised on a wedge or plate, feet hip-width apart, arms reaching forward.",
    "Brace your core and bend your knees and hips together.",
    "Lower as deep as you can with an upright torso.",
    "Push through your whole foot to stand back up.",
    "Stand tall at the top before the next rep."
  ],
  "Bodyweight donkey calf raise": [
    "Stand with the balls of your feet on the edge of a platform, hinge forward at the hips and rest your straight arms on a bench.",
    "Start with your heels low and your calves stretched.",
    "Push through the balls of your feet and raise your heels as high as you can.",
    "Pause at the top.",
    "Lower your heels slowly to a full stretch."
  ],
  "Standing tibialis raise": [
    "Lean your hips and upper back against a wall with your feet about 50 cm in front of it, legs straight.",
    "Keep your heels on the floor and pull your toes up toward your shins.",
    "Lift the fronts of your feet as high as they go.",
    "Pause at the top.",
    "Lower your feet slowly until they are flat."
  ],
  "Nordic hamstring curl": [
    "Kneel on a pad with your ankles hooked under a roller and your hands in front of your chest.",
    "Squeeze your glutes and lean your straight body forward from the knees.",
    "Fight the fall with your hamstrings for as long as you can.",
    "Catch the floor with both hands under your chest.",
    "Push off lightly and pull yourself back up to kneeling with your hamstrings."
  ],
  "Glute-ham raise": [
    "Lock your ankles between the rollers with your thighs on the pad and cross your arms over your chest.",
    "Start with your body straight and parallel to the floor.",
    "Bend your knees and pull your straight torso up with your hamstrings.",
    "Finish kneeling upright on the pad.",
    "Lower slowly back to level."
  ],
  "Bodyweight single-leg deadlift": [
    "Stand on one leg with that knee slightly bent and your arms hanging in front of you.",
    "Push your hips back and lean forward as the free leg lifts straight behind you.",
    "Stop when your torso and back leg are about parallel to the floor.",
    "Squeeze the glute of the standing leg and return to standing tall.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight good morning": [
    "Stand tall with your feet hip-width apart and your fingertips behind your head, elbows wide.",
    "Brace your core and push your hips straight back.",
    "Lean forward with a flat back until your torso is close to parallel with the floor.",
    "Drive your hips forward and stand tall.",
    "Squeeze your glutes at the top without leaning back."
  ],
  "Adductor leg raise side lying": [
    "Lie on your side propped on your forearm, with your top foot flat on the floor in front of your bottom knee.",
    "Straighten the bottom leg and flex its foot.",
    "Lift the bottom leg as high as it goes without bending it.",
    "Lower it slowly until it almost touches the mat.",
    "Finish all reps, then switch sides."
  ],
  "Bodyweight feet-elevated glute bridge": [
    "Lie on your back on the floor with your arms at your sides and both heels on a bench, knees bent about 90 degrees.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control."
  ],
  "Bodyweight feet-elevated single-leg glute bridge": [
    "Lie on your back on the floor with your arms at your sides and one heel on a bench and the other leg lifted straight up.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Bodyweight feet-elevated staggered glute bridge": [
    "Lie on your back on the floor with your arms at your sides and one whole foot on a bench and the other heel a foot-length farther away.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Bodyweight feet-elevated figure-four glute bridge": [
    "Lie on your back on the floor with your arms at your sides and one heel on a bench and the other ankle crossed over that thigh.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Bodyweight heels-elevated hip thrust": [
    "Rest your upper back against a bench with your hands on your hips and both heels on a low platform, toes lifted.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control."
  ],
  "Bodyweight single-leg heels-elevated hip thrust": [
    "Rest your upper back against a bench with your hands on your hips and one heel on a low platform and the other knee pulled toward your chest.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Bodyweight figure-four heels-elevated hip thrust": [
    "Rest your upper back against a bench with your hands on your hips and one heel on a low platform and the other ankle crossed over that thigh.",
    "Brace your core and push through your heels.",
    "Lift your hips until your body is straight from shoulders to knees.",
    "Squeeze your glutes for a moment at the top.",
    "Lower your hips under control, finish all reps, then switch legs."
  ],
  "Knee push-ups": [
    "Kneel on a mat with your hands under your shoulders, walk your hands forward and lift your feet so your body is straight from knees to head.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Stop just before your chest touches down.",
    "Push back up until your arms are straight."
  ],
  "Incline push-up": [
    "Place your hands on the edge of a bench a little wider than your shoulders and step your feet back until your body is straight.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Stop just before your chest touches the bench.",
    "Push back up until your arms are straight."
  ],
  "Hand-release push-ups": [
    "Start in a push-up position with your hands under your shoulders and your body straight.",
    "Lower your chest all the way to the floor under control.",
    "Lift both hands a few centimetres off the floor for a moment.",
    "Put your hands back down under your shoulders and brace again.",
    "Push your whole body up in one piece until your arms are straight."
  ],
  "Leg-raised push-up": [
    "Start in a push-up position and lift one leg straight behind you, about 30 cm off the floor.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Stop just before your chest touches down.",
    "Push back up, finish your reps, then switch the lifted leg."
  ],
  "Weighted push-ups": [
    "Get into a push-up position with your hands under your shoulders and a weight plate flat on your upper back.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows and lower your chest under control.",
    "Stop just before your chest touches down.",
    "Push back up until your arms are straight."
  ],
  "Bodyweight tricep extension": [
    "Start in a push-up position with your hands a little in front of your shoulders.",
    "Brace your core and squeeze your glutes.",
    "Bend your elbows straight down until your forearms rest on the floor.",
    "Press through your palms and straighten your elbows.",
    "Finish with your arms straight and your body still in one line."
  ],
  "Underhand inverted row": [
    "Set a bar at about waist height, lie under it and grip it underhand, shoulder-width, heels on the floor.",
    "Hang with straight arms and your body in one straight line.",
    "Pull your lower chest up to the bar.",
    "Pause briefly with your chest at the bar.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Inverted curl": [
    "Set a bar at about waist height, lie under it and grip it underhand, shoulder-width, heels on the floor.",
    "Hang with straight arms and your body in one straight line.",
    "Curl your body up by bending only your elbows until your forehead reaches the bar.",
    "Squeeze your biceps for a moment at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Gironda chin-up": [
    "Hang from the bar with an underhand shoulder-width grip, knees bent and ankles crossed behind you.",
    "Pull your shoulders down and start pulling while you lean back.",
    "Arch your chest up and pull until your lower chest touches the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly to a straight-arm hang."
  ],
  "L-sit chin-up": [
    "Hang from the bar with an underhand shoulder-width grip and lift both legs straight out in front until they are level.",
    "Pull your shoulders down, then bend your elbows and pull yourself up.",
    "Pull until your chin is above the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "L-sit pull-up": [
    "Hang from the bar with an overhand grip a little wider than your shoulders and lift both legs straight out in front until they are level.",
    "Pull your shoulders down, then bend your elbows and pull yourself up.",
    "Pull until your chin is above the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Weighted chin-ups": [
    "Put on a dip belt with the weight attached and hang from the bar with an underhand shoulder-width grip.",
    "Pull your shoulders down, then bend your elbows and pull yourself up.",
    "Pull until your chin is above the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Weighted pull-ups": [
    "Put on a dip belt with the weight attached and hang from the bar with an overhand grip a little wider than your shoulders.",
    "Pull your shoulders down, then bend your elbows and pull yourself up.",
    "Pull until your chin is above the bar.",
    "Pause briefly at the top.",
    "Lower yourself slowly until your arms are straight."
  ],
  "Elevated pike press": [
    "Put your hands on the floor shoulder-width apart and your toes on a bench, then walk your hands back until your hips are high above your shoulders.",
    "Brace your core and keep your legs straight.",
    "Bend your elbows and lower the top of your head toward the floor.",
    "Stop just above the floor.",
    "Press the floor away until your arms are straight."
  ],
  "Superman pull": [
    "Lie face-down on a mat with your arms straight overhead and your legs straight.",
    "Lift your arms, chest and legs a little off the floor together.",
    "Pull your elbows down and back to your ribs, as in a pulldown.",
    "Reach your arms straight overhead again.",
    "Lower everything to the floor, or stay lifted for the next rep."
  ],
  "Crunch": [
    "Lie on your back on a mat with your knees bent, feet flat and fingertips at your temples.",
    "Brace your core and tuck your chin slightly.",
    "Curl your head and shoulders up until your shoulder blades leave the mat.",
    "Pause and squeeze your abs.",
    "Lower your shoulders slowly to the mat."
  ],
  "Reverse crunch": [
    "Lie on your back on a mat with your arms at your sides, thighs vertical and knees bent 90 degrees.",
    "Brace your core and pull your knees toward your chest.",
    "Roll your hips and lower back up off the mat.",
    "Pause briefly at the top.",
    "Roll back down slowly until your thighs are vertical again."
  ],
  "Oblique crunch": [
    "Lie on your back, drop both bent knees to one side and put the hand of the top side behind your head.",
    "Brace your core and lift your head and shoulders.",
    "Crunch up toward your top hip as far as you can.",
    "Lower your shoulders slowly to the mat.",
    "Finish all reps, then switch sides."
  ],
  "Sit-up": [
    "Lie on your back on a mat with your knees bent, feet flat and arms crossed over your chest.",
    "Brace your core and tuck your chin slightly.",
    "Curl your torso up until you are sitting upright.",
    "Pause briefly at the top.",
    "Lower your back to the floor slowly."
  ],
  "Dead bug": [
    "Lie on your back with your arms pointing at the ceiling and your knees bent 90 degrees above your hips.",
    "Press your lower back into the mat and brace your core.",
    "Lower one arm overhead and straighten the opposite leg until both are just above the floor.",
    "Bring them back to the start.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Bird dog": [
    "Get on your hands and knees with your hands under your shoulders and your knees under your hips.",
    "Brace your core so your back stays flat.",
    "Reach one arm forward and the opposite leg back until both are level with your back.",
    "Return your hand and knee to the mat under control.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Hand plank": [
    "Get on your hands and knees with your hands under your shoulders.",
    "Step both feet back until your legs are straight and your toes are on the floor.",
    "Brace your core and squeeze your glutes so your body is one straight line.",
    "Hold for the planned time, breathing steadily.",
    "Lower your knees to the mat to finish."
  ],
  "Hand side plank": [
    "Sit on one hip with your legs straight and stacked and that side's hand on the floor under your shoulder.",
    "Lift your hips until your body is one straight line from head to heels.",
    "Reach your top arm straight up toward the ceiling.",
    "Hold for the planned time, breathing steadily.",
    "Lower your hips, then repeat on the other side."
  ],
  "Long-lever forearm plank": [
    "Get into a forearm plank with your elbows under your shoulders and your toes on the floor.",
    "Walk your elbows forward until they are well in front of your shoulders.",
    "Brace your core and squeeze your glutes so your body is one straight line.",
    "Hold for the planned time, breathing steadily.",
    "Lower your knees to the mat to finish."
  ],
  "Plank up-down": [
    "Get into a forearm plank with your elbows under your shoulders and your toes on the floor.",
    "Plant one hand under your shoulder and press up onto that arm.",
    "Plant the other hand and straighten both arms into a hand plank.",
    "Lower back down to your forearms one arm at a time.",
    "Go straight into the next rep."
  ],
  "Weighted forearm plank": [
    "Kneel with your forearms on the floor, elbows under your shoulders, and have a plate placed flat on your upper back.",
    "Step your feet back one at a time until your legs are straight.",
    "Brace your core and squeeze your glutes so your body is one straight line.",
    "Hold for the planned time, breathing steadily.",
    "Lower your knees and have the plate taken off."
  ],
  "Hanging knee raises": [
    "Hang from a bar with an overhand shoulder-width grip and your arms straight.",
    "Brace your core and keep your torso still.",
    "Bend your knees and pull them up to chest height.",
    "Pause briefly at the top.",
    "Lower your legs slowly until they hang straight."
  ],
  "Hanging L-sit": [
    "Hang from a bar with an overhand shoulder-width grip and your arms straight.",
    "Pull your shoulders down and brace your core.",
    "Lift both straight legs in front until they are level.",
    "Hold for the planned time, breathing steadily.",
    "Lower your legs slowly to finish."
  ],
  "Laying bent leg raise": [
    "Lie on your back on a mat with your arms at your sides, knees bent and feet just above the floor.",
    "Press your lower back into the mat and brace your core.",
    "Pull your knees up until they are above your hips.",
    "Pause briefly at the top.",
    "Lower your feet slowly until they are just above the mat."
  ],
  "Scissor kick": [
    "Lie on your back with your hands under your hips and both straight legs just above the floor.",
    "Press your lower back into the mat and brace your core.",
    "Raise one leg to about 45 degrees while the other stays low.",
    "Switch legs in one smooth scissor motion.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Windshield wiper": [
    "Lie on your back with your arms out to the sides, palms down, and both legs straight up above your hips.",
    "Brace your core and press your arms into the floor.",
    "Lower both legs together to one side until they are just above the floor.",
    "Bring them back up over your hips.",
    "Lower to the other side and keep alternating."
  ],
  "Oblique jackknife": [
    "Lie on your side with your legs straight and stacked, your bottom arm on the floor in front of you and your top hand behind your head.",
    "Brace your core.",
    "Lift both legs and crunch your upper body sideways so your top elbow moves toward your legs.",
    "Lower your legs and upper body slowly.",
    "Finish all reps, then switch sides."
  ],
  "Alternating heel touch": [
    "Lie on your back on a mat with your knees bent, feet flat and arms straight at your sides.",
    "Lift your head and shoulders slightly off the mat.",
    "Bend to one side and touch that heel with your hand.",
    "Come back through the middle and touch the other heel.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Eccentric dragon flag": [
    "Lie on your back on a bench and grip its edge beside your ears with both hands.",
    "Tuck your knees and roll up until your body points straight up, resting on your upper back.",
    "Brace your core and glutes so your body is one straight line.",
    "Lower your straight body slowly until it is just above the bench.",
    "Rest on the bench, then tuck and roll back up for the next rep."
  ],
  "Box jump": [
    "Stand a short step in front of a sturdy box with your feet hip-width apart.",
    "Dip into a quarter squat and swing your arms back.",
    "Swing your arms forward and jump onto the box.",
    "Land softly on both feet with your knees bent.",
    "Stand tall, then step down one foot at a time."
  ],
  "Seated box jump": [
    "Sit upright on a low box facing a taller box, feet flat on the floor.",
    "Swing your arms back.",
    "Drive through your feet, swing your arms forward and jump onto the taller box.",
    "Land softly on both feet with your knees bent.",
    "Stand tall, then step down one foot at a time."
  ],
  "Single-leg box jump": [
    "Stand on one leg a short step in front of a low box.",
    "Dip into a quarter squat on that leg and swing your arms back.",
    "Swing your arms forward and jump onto the box off that one leg.",
    "Land softly on the same foot and find your balance.",
    "Step down, finish your reps, then switch legs."
  ],
  "Depth jump": [
    "Stand tall at the front edge of a low box.",
    "Step off with one foot and drop to the floor.",
    "Land on both feet in a quarter squat with your arms back.",
    "Jump straight up right away, reaching your arms overhead.",
    "Land softly, then step back onto the box for the next rep."
  ],
  "Burpee": [
    "Stand with your feet hip-width apart.",
    "Crouch and put both hands on the floor in front of your feet.",
    "Jump both feet back into the top of a push-up.",
    "Jump both feet back in toward your hands.",
    "Jump straight up with your arms reaching overhead, then land softly."
  ],
  "Jump rope": [
    "Hold one handle in each hand with the rope behind your heels.",
    "Swing the rope over your head with your wrists.",
    "Hop a few centimetres off the floor as the rope reaches your feet.",
    "Land softly on the balls of your feet.",
    "Keep a steady rhythm for the planned time."
  ],
  "Butt kick": [
    "Stand tall with your feet hip-width apart and your arms bent at your sides.",
    "Kick one heel up toward your buttock.",
    "Switch quickly and kick the other heel up as the first foot lands.",
    "Pump your arms as if you were running.",
    "Keep a steady rhythm for the planned time."
  ],
  "Pop squat": [
    "Stand tall with your feet together and your arms bent at your sides.",
    "Jump your feet out wider than your shoulders, toes turned out.",
    "Sink into a deep squat and tap the floor between your feet with one hand.",
    "Jump up and bring your feet back together.",
    "Go straight into the next rep."
  ],
  "Alternating jump lunge": [
    "Step into a lunge with one foot forward and both knees bent.",
    "Lower until your back knee is just above the floor.",
    "Jump straight up and switch your legs in the air.",
    "Land softly in a lunge with the other foot forward.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Lateral lunge jump": [
    "Stand tall with your feet hip-width apart.",
    "Step out into a deep side lunge and tap the floor with the opposite hand.",
    "Push off the bent leg and jump sideways.",
    "Land softly in a side lunge on the other leg and tap the floor with the other hand.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Plank jack": [
    "Start in a forearm plank with your elbows under your shoulders and your feet together.",
    "Brace your core so your hips stay level.",
    "Jump both feet out wide.",
    "Jump them back together.",
    "Go straight into the next rep."
  ],
  "Hand plank jack": [
    "Start in a hand plank with your hands under your shoulders and your feet together.",
    "Brace your core so your hips stay level.",
    "Hop both hands out wide at the same time.",
    "Hop them back under your shoulders.",
    "Go straight into the next rep."
  ],
  "Elbow plank mountain climber": [
    "Start in a forearm plank with your elbows under your shoulders and your legs straight.",
    "Brace your core so your hips stay level.",
    "Drive one knee forward under your body toward your elbow.",
    "Send that leg back and drive the other knee forward.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Slalom mountain climber": [
    "Start in a hand plank with your hands under your shoulders and your feet together.",
    "Brace your core so your hips stay level.",
    "Jump both feet forward to one side, knees tucked toward that elbow.",
    "Jump both feet across to the other side.",
    "Keep alternating sides for the planned number of reps."
  ],
  "Jumping mountain climber": [
    "Start in a hand plank with your hands under your shoulders and your feet together.",
    "Brace your core so your hips stay level.",
    "Jump both feet forward and land them just outside your hands in a deep squat.",
    "Jump both feet back to the plank.",
    "Go straight into the next rep."
  ],
  "In-and-out jump squat": [
    "Stand with your feet shoulder-width apart and lower into a squat.",
    "Jump straight up and bring your feet together in the air.",
    "Land softly in a narrow squat with your feet and knees together.",
    "Jump up again and land back in the shoulder-width squat.",
    "Go straight into the next rep."
  ],
  "Clapping push-up": [
    "Start in a push-up position with your hands under your shoulders and your body straight.",
    "Lower your chest until it is just above the floor.",
    "Push up explosively so both hands leave the floor.",
    "Clap your hands once under your chest.",
    "Land on both hands with soft elbows and go into the next rep."
  ],
  "Explosive push-up": [
    "Start in a push-up position with your hands under your shoulders and your body straight.",
    "Lower your chest until it is just above the floor.",
    "Push up explosively so both hands leave the floor.",
    "Keep your hands shoulder-width apart in the air.",
    "Land on both hands with soft elbows and go into the next rep."
  ],
  "Step-up knee drive": [
    "Stand facing a box and place one whole foot on top of it.",
    "Push through that foot and stand up on the box.",
    "Drive the other knee up until that thigh is parallel to the floor.",
    "Lower that foot slowly back to the floor.",
    "Finish all reps, then switch sides."
  ],
  "Inchworm": [
    "Stand tall with your feet together.",
    "Fold forward at the hips and put both hands on the floor in front of your toes.",
    "Walk your hands forward until you are in a hand plank.",
    "Pause for a moment with your body in one straight line.",
    "Walk your hands back to your feet and stand up."
  ]
};
function instructionsFor(name){if(CFG.lang==='ja'&&EX_INSTRUCTIONS_JA[name]&&EX_INSTRUCTIONS_JA[name].length)return EX_INSTRUCTIONS_JA[name];if(CFG.lang==='ko'&&EX_INSTRUCTIONS_KO[name]&&EX_INSTRUCTIONS_KO[name].length)return EX_INSTRUCTIONS_KO[name];return EX_INSTRUCTIONS[name];}
function showExInstructions(name){const steps=instructionsFor(name);gid('exinfo-name').textContent=exDisplayName(name);gid('exinfo-list').innerHTML=steps&&steps.length?steps.map((t,i)=>'<li style="font-size:15px;color:var(--txt);line-height:1.6;margin-bottom:2px">'+t+'</li>').join(''):'<li style="font-size:15px;color:var(--txt2)">'+t('instructions_coming_soon')+'</li>';gid('exinfo-overlay').style.display='block';gid('exinfo-sheet').style.display='block';document.body.style.overflow='hidden';modalOpen('exinfo-sheet',closeExInfo,{keep:['exinfo-overlay']});}
function closeExInfo(){gid('exinfo-overlay').style.display='none';gid('exinfo-sheet').style.display='none';document.body.style.overflow='';modalClose('exinfo-sheet');}

