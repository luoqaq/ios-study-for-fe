import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

// Home
import Home from "@/pages/Home";

// Guide
import GuideIndex from "@/pages/guide/GuideIndex";
import BeforeStart from "@/pages/guide/BeforeStart";
import UIKitIndex from "@/pages/UIKitIndex";
import AdvancedIndex from "@/pages/AdvancedIndex";
import ViewControllerLifecycle from "@/pages/uikit/ViewControllerLifecycle";
import UIKitNavigation from "@/pages/uikit/Navigation";
import NavigationAdvanced from "@/pages/uikit/NavigationAdvanced";
import AutoLayout from "@/pages/uikit/AutoLayout";
import AutoLayoutAdvanced from "@/pages/uikit/AutoLayoutAdvanced";
import CollectionViewIntro from "@/pages/uikit/CollectionView";
import CollectionViewPractical from "@/pages/uikit/CollectionViewPractical";
import CompositionalLayoutIntro from "@/pages/uikit/CompositionalLayout";
import FormInputIntro from "@/pages/uikit/FormInput";
import AnimationIntro from "@/pages/uikit/Animation";
import FormValidationIntro from "@/pages/uikit/FormValidation";
import FormApp from "@/pages/uikit/practice/FormApp";
import TableViewOptimization from "@/pages/uikit/TableViewOptimization";

// ObjC
import ObjcIndex from "@/pages/objc/ObjcIndex";
import ObjcIntro from "@/pages/objc/basics/Intro";
import DataTypes from "@/pages/objc/basics/DataTypes";
import ObjcStrings from "@/pages/objc/basics/Strings";
import ObjcArrays from "@/pages/objc/basics/Arrays";
import ObjcControlFlow from "@/pages/objc/basics/ControlFlow";
import ObjcFunctions from "@/pages/objc/basics/Functions";
import ObjcClassObject from "@/pages/objc/oop/ClassObject";
import ObjcInheritance from "@/pages/objc/oop/Inheritance";
import ObjcProtocol from "@/pages/objc/oop/Protocol";
import ObjcCategory from "@/pages/objc/oop/Category";
import ObjcProperty from "@/pages/objc/oop/Property";
import ObjcArc from "@/pages/objc/memory/Arc";
import ObjcRetainCycle from "@/pages/objc/memory/RetainCycle";
import ObjcKvo from "@/pages/objc/advanced/Kvo";
import ObjcKvc from "@/pages/objc/advanced/Kvc";
import ObjcDelegate from "@/pages/objc/advanced/Delegate";
import ObjcGcd from "@/pages/objc/advanced/Gcd";
import ObjcMixedProject from "@/pages/objc/advanced/MixedProject";
import ObjcNotification from "@/pages/objc/advanced/Notification";
import ObjcRuntimeIntro from "@/pages/objc/advanced/Runtime";
import RuntimeDeep from "@/pages/objc/advanced/RuntimeDeep";
import Forwarding from "@/pages/objc/advanced/Forwarding";
import ObjcMemoryDebug from "@/pages/objc/practice/MemoryDebug";
import RuntimeTechniquesIntro from "@/pages/objc/advanced/RuntimeTechniques";
import ObjcCocoaPods from "@/pages/objc/advanced/CocoaPods";
import SpmVsCocoaPodsIntro from "@/pages/objc/advanced/SpmVsCocoaPods";
import ObjcBridging from "@/pages/objc/advanced/Bridging";
import Refactoring from "@/pages/objc/advanced/Refactoring";

// Swift
import SwiftIndex from "@/pages/swift/SwiftIndex";
import SwiftBasicsIntro from "@/pages/swift/basics/Intro";
import SwiftDataTypes from "@/pages/swift/basics/DataTypes";
import SwiftOptionals from "@/pages/swift/basics/Optionals";
import SwiftStrings from "@/pages/swift/basics/Strings";
import SwiftCollections from "@/pages/swift/basics/Collections";
import SwiftControlFlow from "@/pages/swift/basics/ControlFlow";
import SwiftClassStruct from "@/pages/swift/oop/ClassStruct";
import SwiftValueReferenceDeep from "@/pages/swift/oop/ValueReferenceDeep";
import SwiftEnum from "@/pages/swift/oop/Enum";
import SwiftProtocol from "@/pages/swift/oop/Protocol";
import SwiftExtension from "@/pages/swift/oop/Extension";
import SwiftPropertiesDeep from "@/pages/swift/oop/PropertiesDeep";
import SwiftGenerics from "@/pages/swift/oop/Generics";
import SwiftGenericsAdvanced from "@/pages/swift/oop/GenericsAdvanced";
import SwiftClosure from "@/pages/swift/advanced/Closure";
import SwiftClosureMemory from "@/pages/swift/advanced/ClosureMemory";
import SwiftConcurrency from "@/pages/swift/advanced/Concurrency";
import SwiftConcurrencyPractical from "@/pages/swift/advanced/ConcurrencyPractical";
import SwiftErrorHandling from "@/pages/swift/advanced/ErrorHandling";
import SwiftErrorHandlingDeep from "@/pages/swift/advanced/ErrorHandlingDeep";
import SwiftPropertyWrapper from "@/pages/swift/advanced/PropertyWrapper";
import SwiftCombineIntro from "@/pages/swift/advanced/CombineIntro";
import SwiftUIIntro from "@/pages/swift/swiftui/Intro";
import SwiftUIStateBinding from "@/pages/swift/swiftui/StateBinding";
import SwiftUINavigation from "@/pages/swift/swiftui/Navigation";
import SwiftUIKitMixed from "@/pages/swift/swiftui/MixedUI";
import SwiftDataFlow from "@/pages/swift/swiftui/DataFlow";
import SwiftDataIntro from "@/pages/swift/swiftdata/Intro";

// Xcode
import XcodeIndex from "@/pages/xcode/XcodeIndex";
import XcodeSetup from "@/pages/xcode/Setup";
import XcodeInterface from "@/pages/xcode/Interface";
import XcodeProject from "@/pages/xcode/Project";
import XcodeSimulator from "@/pages/xcode/Simulator";
import XcodeDebugging from "@/pages/xcode/Debugging";
import DebuggingAdvanced from "@/pages/starter/DebuggingAdvanced";
import XcodeStoryboard from "@/pages/xcode/Storyboard";
import XcodeBuildRun from "@/pages/xcode/BuildRun";
import ProjectConfigIntro from "@/pages/xcode/ProjectConfig";
import BuildConfigurationsIntro from "@/pages/xcode/BuildConfigurations";

// Advanced
import Persistence from "@/pages/advanced/Persistence";
import NetworkLayer from "@/pages/advanced/NetworkLayer";
import Instruments from "@/pages/advanced/Instruments";
import LaunchOptimization from "@/pages/advanced/LaunchOptimization";
import InstrumentsCase from "@/pages/advanced/InstrumentsCase";
import CrashSymbolication from "@/pages/advanced/CrashSymbolication";
import Architecture from "@/pages/advanced/Architecture";
import Testing from "@/pages/advanced/Testing";
import Distribution from "@/pages/advanced/Distribution";
import GcdPractical from "@/pages/advanced/GcdPractical";
import CoreAnimation from "@/pages/advanced/CoreAnimation";
import Security from "@/pages/advanced/Security";
import WebView from "@/pages/advanced/WebView";
import Notifications from "@/pages/advanced/Notifications";
import PhotosCamera from "@/pages/advanced/PhotosCamera";
import MapKit from "@/pages/advanced/MapKit";
import Widget from "@/pages/advanced/Widget";
import HealthKit from "@/pages/advanced/HealthKit";
import ARKit from "@/pages/advanced/ARKit";
import SiriKit from "@/pages/advanced/SiriKit";
import IPadMultitasking from "@/pages/advanced/IPadMultitasking";
import WatchKit from "@/pages/advanced/WatchKit";
import AppClip from "@/pages/advanced/AppClip";
import AppStoreReview from "@/pages/advanced/AppStoreReview";
import IOS18Adaptation from "@/pages/advanced/IOS18Adaptation";
import PublishEndToEnd from "@/pages/advanced/PublishEndToEnd";

// Practice
import TodoApp from "@/pages/practice/TodoApp";
import NetworkApp from "@/pages/practice/NetworkApp";
import TableViewApp from "@/pages/practice/TableViewApp";
import MiniSwiftUI from "@/pages/practice/MiniSwiftUI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        {/* Guide */}
        <Route path="/roadmap" element={<GuideIndex />} />
        <Route path="/roadmap/before-start" element={<BeforeStart />} />
        <Route path="/guide" element={<Navigate to="/roadmap" replace />} />
        <Route
          path="/guide/before-start"
          element={<Navigate to="/roadmap/before-start" replace />}
        />

        {/* Starter */}
        <Route path="/starter" element={<XcodeIndex />} />
        <Route path="/starter/setup" element={<XcodeSetup />} />
        <Route path="/starter/interface" element={<XcodeInterface />} />
        <Route path="/starter/project" element={<XcodeProject />} />
        <Route path="/starter/simulator" element={<XcodeSimulator />} />
        <Route path="/starter/debugging" element={<XcodeDebugging />} />
        <Route
          path="/starter/debugging-advanced"
          element={<DebuggingAdvanced />}
        />
        <Route path="/starter/storyboard" element={<XcodeStoryboard />} />
        <Route path="/starter/build-run" element={<XcodeBuildRun />} />
        <Route path="/starter/project-config" element={<ProjectConfigIntro />} />
        <Route
          path="/starter/build-configurations"
          element={<BuildConfigurationsIntro />}
        />

        {/* UIKit */}
        <Route path="/uikit" element={<UIKitIndex />} />
        <Route
          path="/uikit/view-controller-lifecycle"
          element={<ViewControllerLifecycle />}
        />
        <Route path="/uikit/navigation" element={<UIKitNavigation />} />
        <Route
          path="/uikit/navigation-advanced"
          element={<NavigationAdvanced />}
        />
        <Route path="/uikit/auto-layout" element={<AutoLayout />} />
        <Route
          path="/uikit/auto-layout-advanced"
          element={<AutoLayoutAdvanced />}
        />
        <Route path="/uikit/collection-view" element={<CollectionViewIntro />} />
        <Route
          path="/uikit/collection-view-practical"
          element={<CollectionViewPractical />}
        />
        <Route
          path="/uikit/compositional-layout"
          element={<CompositionalLayoutIntro />}
        />
        <Route path="/uikit/form-input" element={<FormInputIntro />} />
        <Route
          path="/uikit/form-validation"
          element={<FormValidationIntro />}
        />
        <Route path="/uikit/practice/form-app" element={<FormApp />} />
        <Route path="/uikit/animation" element={<AnimationIntro />} />
        <Route
          path="/uikit/tableview-optimization"
          element={<TableViewOptimization />}
        />
        <Route path="/uikit/practice/todo-app" element={<TodoApp />} />
        <Route
          path="/uikit/practice/tableview-app"
          element={<TableViewApp />}
        />

        {/* ObjC */}
        <Route path="/objc-maintenance" element={<ObjcIndex />} />
        <Route
          path="/objc"
          element={<Navigate to="/objc-maintenance" replace />}
        />
        <Route path="/objc-maintenance/basics/intro" element={<ObjcIntro />} />
        <Route
          path="/objc-maintenance/basics/functions"
          element={<ObjcFunctions />}
        />
        <Route
          path="/objc-maintenance/basics/datatypes"
          element={<DataTypes />}
        />
        <Route
          path="/objc-maintenance/basics/strings"
          element={<ObjcStrings />}
        />
        <Route
          path="/objc-maintenance/basics/arrays"
          element={<ObjcArrays />}
        />
        <Route
          path="/objc-maintenance/basics/control-flow"
          element={<ObjcControlFlow />}
        />
        <Route
          path="/objc/basics/intro"
          element={<Navigate to="/objc-maintenance/basics/intro" replace />}
        />
        <Route
          path="/objc/basics/functions"
          element={<Navigate to="/objc-maintenance/basics/functions" replace />}
        />
        <Route
          path="/objc/basics/datatypes"
          element={<Navigate to="/objc-maintenance/basics/datatypes" replace />}
        />
        <Route
          path="/objc/basics/strings"
          element={<Navigate to="/objc-maintenance/basics/strings" replace />}
        />
        <Route
          path="/objc/basics/arrays"
          element={<Navigate to="/objc-maintenance/basics/arrays" replace />}
        />
        <Route
          path="/objc/basics/control-flow"
          element={<Navigate to="/objc-maintenance/basics/control-flow" replace />}
        />

        <Route
          path="/objc-maintenance/oop/class-object"
          element={<ObjcClassObject />}
        />
        <Route
          path="/objc-maintenance/oop/inheritance"
          element={<ObjcInheritance />}
        />
        <Route
          path="/objc-maintenance/oop/protocol"
          element={<ObjcProtocol />}
        />
        <Route
          path="/objc-maintenance/oop/category"
          element={<ObjcCategory />}
        />
        <Route
          path="/objc-maintenance/oop/property"
          element={<ObjcProperty />}
        />
        <Route
          path="/objc/oop/class-object"
          element={<Navigate to="/objc-maintenance/oop/class-object" replace />}
        />
        <Route
          path="/objc/oop/inheritance"
          element={<Navigate to="/objc-maintenance/oop/inheritance" replace />}
        />
        <Route
          path="/objc/oop/protocol"
          element={<Navigate to="/objc-maintenance/oop/protocol" replace />}
        />
        <Route
          path="/objc/oop/category"
          element={<Navigate to="/objc-maintenance/oop/category" replace />}
        />
        <Route
          path="/objc/oop/property"
          element={<Navigate to="/objc-maintenance/oop/property" replace />}
        />

        <Route
          path="/objc-maintenance/memory/arc"
          element={<ObjcArc />}
        />
        <Route
          path="/objc-maintenance/memory/retain-cycle"
          element={<ObjcRetainCycle />}
        />
        <Route
          path="/objc/memory/arc"
          element={<Navigate to="/objc-maintenance/memory/arc" replace />}
        />
        <Route
          path="/objc/memory/retain-cycle"
          element={<Navigate to="/objc-maintenance/memory/retain-cycle" replace />}
        />

        <Route
          path="/objc-maintenance/advanced/kvc"
          element={<ObjcKvc />}
        />
        <Route
          path="/objc-maintenance/advanced/kvo"
          element={<ObjcKvo />}
        />
        <Route
          path="/objc-maintenance/advanced/delegate"
          element={<ObjcDelegate />}
        />
        <Route
          path="/objc-maintenance/advanced/notification"
          element={<ObjcNotification />}
        />
        <Route
          path="/objc-maintenance/advanced/gcd"
          element={<ObjcGcd />}
        />
        <Route
          path="/objc-maintenance/advanced/mixed-project"
          element={<ObjcMixedProject />}
        />
        <Route
          path="/objc-maintenance/advanced/runtime"
          element={<ObjcRuntimeIntro />}
        />
        <Route
          path="/objc-maintenance/advanced/runtime-deep"
          element={<RuntimeDeep />}
        />
        <Route
          path="/objc-maintenance/advanced/forwarding"
          element={<Forwarding />}
        />
        <Route
          path="/objc-maintenance/practice/memory-debug"
          element={<ObjcMemoryDebug />}
        />
        <Route
          path="/objc-maintenance/advanced/runtime-techniques"
          element={<RuntimeTechniquesIntro />}
        />
        <Route
          path="/objc-maintenance/advanced/cocoapods"
          element={<ObjcCocoaPods />}
        />
        <Route
          path="/objc-maintenance/advanced/spm-vs-cocoapods"
          element={<SpmVsCocoaPodsIntro />}
        />
        <Route
          path="/objc-maintenance/advanced/bridging"
          element={<ObjcBridging />}
        />
        <Route
          path="/objc-maintenance/advanced/refactoring"
          element={<Refactoring />}
        />
        <Route
          path="/objc/advanced/kvo"
          element={<Navigate to="/objc-maintenance/advanced/kvo" replace />}
        />
        <Route
          path="/objc/advanced/delegate"
          element={<Navigate to="/objc-maintenance/advanced/delegate" replace />}
        />
        <Route
          path="/objc/advanced/notification"
          element={<Navigate to="/objc-maintenance/advanced/notification" replace />}
        />

        {/* Swift */}
        <Route path="/swift" element={<SwiftIndex />} />
        <Route path="/swift/basics/intro" element={<SwiftBasicsIntro />} />
        <Route path="/swift/basics/datatypes" element={<SwiftDataTypes />} />
        <Route path="/swift/basics/optionals" element={<SwiftOptionals />} />
        <Route path="/swift/basics/strings" element={<SwiftStrings />} />
        <Route
          path="/swift/basics/collections"
          element={<SwiftCollections />}
        />
        <Route
          path="/swift/basics/control-flow"
          element={<SwiftControlFlow />}
        />

        <Route path="/swift/oop/class-struct" element={<SwiftClassStruct />} />
        <Route
          path="/swift/oop/value-reference-deep"
          element={<SwiftValueReferenceDeep />}
        />
        <Route path="/swift/oop/enum" element={<SwiftEnum />} />
        <Route path="/swift/oop/protocol" element={<SwiftProtocol />} />
        <Route path="/swift/oop/extension" element={<SwiftExtension />} />
        <Route
          path="/swift/oop/properties-deep"
          element={<SwiftPropertiesDeep />}
        />
        <Route path="/swift/oop/generics" element={<SwiftGenerics />} />
        <Route
          path="/swift/oop/generics-advanced"
          element={<SwiftGenericsAdvanced />}
        />

        <Route path="/swift/advanced/closure" element={<SwiftClosure />} />
        <Route
          path="/swift/advanced/closure-memory"
          element={<SwiftClosureMemory />}
        />
        <Route
          path="/swift/advanced/concurrency"
          element={<SwiftConcurrency />}
        />
        <Route
          path="/swift/advanced/concurrency-practical"
          element={<SwiftConcurrencyPractical />}
        />
        <Route
          path="/swift/advanced/error-handling"
          element={<SwiftErrorHandling />}
        />
        <Route
          path="/swift/advanced/error-handling-deep"
          element={<SwiftErrorHandlingDeep />}
        />
        <Route
          path="/swift/advanced/property-wrapper"
          element={<SwiftPropertyWrapper />}
        />
        <Route
          path="/swift/advanced/combine"
          element={<SwiftCombineIntro />}
        />

        <Route
          path="/swift/swiftui/intro"
          element={<SwiftUIIntro />}
        />
        <Route
          path="/swift/swiftui/state-binding"
          element={<SwiftUIStateBinding />}
        />
        <Route
          path="/swift/swiftui/navigation"
          element={<SwiftUINavigation />}
        />
        <Route
          path="/swift/swiftui/mixed-ui"
          element={<SwiftUIKitMixed />}
        />
        <Route
          path="/swift/swiftui/data-flow"
          element={<SwiftDataFlow />}
        />
        <Route
          path="/swift/swiftdata/intro"
          element={<SwiftDataIntro />}
        />

        {/* Xcode */}
        <Route path="/xcode" element={<Navigate to="/starter" replace />} />
        <Route path="/xcode/setup" element={<Navigate to="/starter/setup" replace />} />
        <Route
          path="/xcode/interface"
          element={<Navigate to="/starter/interface" replace />}
        />
        <Route path="/xcode/project" element={<Navigate to="/starter/project" replace />} />
        <Route
          path="/xcode/simulator"
          element={<Navigate to="/starter/simulator" replace />}
        />
        <Route
          path="/xcode/debugging"
          element={<Navigate to="/starter/debugging" replace />}
        />
        <Route
          path="/xcode/storyboard"
          element={<Navigate to="/starter/storyboard" replace />}
        />
        <Route
          path="/xcode/build-run"
          element={<Navigate to="/starter/build-run" replace />}
        />
        <Route
          path="/xcode/project-config"
          element={<Navigate to="/starter/project-config" replace />}
        />
        <Route
          path="/xcode/build-configurations"
          element={<Navigate to="/starter/build-configurations" replace />}
        />

        {/* Practice */}
        <Route path="/practice" element={<Navigate to="/uikit" replace />} />
        <Route
          path="/practice/todo-app/intro"
          element={<Navigate to="/uikit/practice/todo-app" replace />}
        />
        <Route
          path="/practice/network-app/intro"
          element={<Navigate to="/advanced/practice/network-app" replace />}
        />
        <Route
          path="/advanced/practice/network-app"
          element={<NetworkApp />}
        />
        <Route
          path="/practice/tableview-app/intro"
          element={<Navigate to="/uikit/practice/tableview-app" replace />}
        />
        <Route
          path="/practice/mini-swiftui/intro"
          element={<Navigate to="/swift/practice/mini-swiftui" replace />}
        />
        <Route
          path="/swift/practice/mini-swiftui"
          element={<MiniSwiftUI />}
        />

        {/* Advanced */}
        <Route path="/advanced" element={<AdvancedIndex />} />
        <Route path="/advanced/persistence" element={<Persistence />} />
        <Route path="/advanced/network-layer" element={<NetworkLayer />} />
        <Route path="/advanced/instruments" element={<Instruments />} />
        <Route
          path="/advanced/launch-optimization"
          element={<LaunchOptimization />}
        />
        <Route
          path="/advanced/instruments-case"
          element={<InstrumentsCase />}
        />
        <Route
          path="/advanced/crash-symbolication"
          element={<CrashSymbolication />}
        />
        <Route path="/advanced/architecture" element={<Architecture />} />
        <Route path="/advanced/testing" element={<Testing />} />
        <Route path="/advanced/distribution" element={<Distribution />} />
        <Route path="/advanced/gcd-practical" element={<GcdPractical />} />
        <Route path="/advanced/core-animation" element={<CoreAnimation />} />
        <Route path="/advanced/security" element={<Security />} />
        <Route path="/advanced/webview" element={<WebView />} />
        <Route path="/advanced/notifications" element={<Notifications />} />
        <Route path="/advanced/photos-camera" element={<PhotosCamera />} />
        <Route path="/advanced/mapkit" element={<MapKit />} />
        <Route path="/advanced/widget" element={<Widget />} />
        <Route path="/advanced/healthkit" element={<HealthKit />} />
        <Route path="/advanced/arkit" element={<ARKit />} />
        <Route path="/advanced/sirikit" element={<SiriKit />} />
        <Route path="/advanced/ipad-multitasking" element={<IPadMultitasking />} />
        <Route path="/advanced/watchkit" element={<WatchKit />} />
        <Route path="/advanced/app-clip" element={<AppClip />} />
        <Route path="/advanced/appstore-review" element={<AppStoreReview />} />
        <Route path="/advanced/ios18-adaptation" element={<IOS18Adaptation />} />
        <Route path="/advanced/publish-end-to-end" element={<PublishEndToEnd />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
